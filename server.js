// Open Course Builder - Express + JSON file DB
const express = require('express');
const { v4: uuid } = require('uuid');
const fs = require('fs');
const path = require('path');
// dotenv loads .env into process.env before we read GROQ_API_KEY below.
require('dotenv').config();
// Groq SDK is CommonJS-compatible (type=commonjs in its package.json), so
// `require()` works alongside the rest of this file. The client is only
// constructed when GROQ_API_KEY is set; routes surface a clear 503 if not.
const Groq = require('groq-sdk');

const ROOT = __dirname;
const DB_DIR = path.join(ROOT, 'db');
const PORT = process.env.PORT || 3000;
const GROQ_MODEL = process.env.GROQ_MODEL || 'llama-3.3-70b-versatile';

// Lazily-built singleton. We only construct once and only when the key is
// present, so a misconfigured env does not crash server startup.
let _groq = null;
function getGroq() {
  const key = (process.env.GROQ_API_KEY || '').trim();
  if (!key) return null;
  if (!_groq) _groq = new Groq({ apiKey: key });
  return _groq;
}

// --- Ensure folders / db exist ---------------------------------------------
if (!fs.existsSync(DB_DIR)) fs.mkdirSync(DB_DIR, { recursive: true });

// --- Storage layer ---------------------------------------------------------
// Each course lives in its own file at db/<courseId>.json. The full course
// object (id, title, description, createdAt, updatedAt, lessons) is stored
// verbatim. This makes individual courses trivially copy-pasteable / shareable
// and avoids rewriting the whole DB for every lesson change.

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function coursePath(id) {
  // Defence-in-depth: refuse to build a path that escapes db/.
  if (typeof id !== 'string' || !UUID_RE.test(id)) {
    const err = new Error('Invalid course id');
    err.status = 400;
    throw err;
  }
  return path.join(DB_DIR, `${id}.json`);
}

function readCourse(id) {
  const file = coursePath(id);
  try {
    const raw = fs.readFileSync(file, 'utf8');
    const course = JSON.parse(raw);
    if (!course || typeof course !== 'object' || !course.id) {
      const err = new Error('Corrupt course file');
      err.status = 500;
      throw err;
    }
    // Backwards-compat: courses created before the tasks feature don't have
    // a `tasks` field. Always hand callers a valid array so the rest of the
    // code (and the frontend) can iterate without null checks.
    if (!Array.isArray(course.tasks)) course.tasks = [];
    // Same idea for the new metadata fields: authors / tags / courseLanguage
    // were added later, so old course files won't have them. We materialise
    // them as empty arrays on every read so the UI can render them
    // unconditionally and `JSON.stringify` of a round-trip is stable.
    if (!Array.isArray(course.authors)) course.authors = [];
    if (!Array.isArray(course.tags)) course.tags = [];
    if (!Array.isArray(course.courseLanguage)) course.courseLanguage = [];
    return course;
  } catch (err) {
    if (err.code === 'ENOENT') {
      const e = new Error('Course not found');
      e.status = 404;
      throw e;
    }
    throw err;
  }
}

function writeCourse(course) {
  if (!course || !course.id) {
    const err = new Error('Course must have an id');
    err.status = 400;
    throw err;
  }
  const file = coursePath(course.id);
  const tmp = `${file}.tmp-${process.pid}-${Date.now()}`;
  fs.writeFileSync(tmp, JSON.stringify(course, null, 2));
  fs.renameSync(tmp, file);
  return course;
}

function deleteCourseFile(id) {
  const file = coursePath(id);
  try {
    fs.unlinkSync(file);
  } catch (err) {
    if (err.code !== 'ENOENT') throw err;
  }
}

function listAllCourses() {
  const entries = fs.readdirSync(DB_DIR, { withFileTypes: true });
  const courses = [];
  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith('.json')) continue;
    // Skip stray temp files from interrupted writes
    if (entry.name.includes('.tmp-')) continue;
    const id = entry.name.replace(/\.json$/, '');
    if (!UUID_RE.test(id)) continue;
    try {
      courses.push(readCourse(id));
    } catch (err) {
      console.error(`Skipping unreadable course file ${entry.name}:`, err.message);
    }
  }
  // Newest-updated first, so the UI's default ordering is intuitive.
  courses.sort((a, b) => (b.updatedAt || '').localeCompare(a.updatedAt || ''));
  return courses;
}

function findLesson(course, lessonId) {
  return course.lessons.find((l) => l.id === lessonId);
}

// Detect resource type. Only three resource types are supported: `link` (any
// web URL), `text` (plain text resource body), and `markdown` (markdown
// resource body). Local file uploads are intentionally not supported.

// --- Course metadata normalisers ------------------------------------------
// `authors` is an array of { authorName, authorLink }. We accept whatever the
// client sends and clamp it to that shape:
//   - drop entries without a non-empty authorName (the link alone is useless)
//   - trim the name
//   - if authorLink is empty, the entry is kept as name-only (no icon shown)
//   - if authorLink is present, it must be a safe http(s) URL or we drop the
//     link (we still keep the author name) so a bad input can't open javascript:
//     or file:// URIs in a new tab
// `tags` and `courseLanguage` are flat string arrays. We trim, drop empties,
// de-dupe (case-insensitive for tags, case-sensitive for languages — "en" and
// "EN" are different languages but the same tag), and cap the total length of
// a single item so a pathological paste can't bloat the file.
function normalizeAuthors(input) {
  if (!Array.isArray(input)) return [];
  const out = [];
  const seen = new Set();
  for (const raw of input) {
    if (!raw || typeof raw !== 'object') continue;
    const name = String(raw.authorName || '').trim();
    if (!name) continue;
    if (name.length > 120) continue;
    let link = String(raw.authorLink || '').trim();
    if (link) {
      if (!isSafeHttpUrl(link)) {
        // Bad URL — keep the name but discard the link rather than rejecting
        // the whole author, so a typo in one field doesn't lose the rest.
        link = '';
      } else if (link.length > 500) {
        link = '';
      }
    }
    const key = `${name.toLowerCase()}|${link.toLowerCase()}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push({ authorName: name, authorLink: link });
    if (out.length >= 20) break; // hard cap
  }
  return out;
}

function isSafeHttpUrl(value) {
  if (typeof value !== 'string') return false;
  let url;
  try { url = new URL(value); } catch (_) { return false; }
  return url.protocol === 'http:' || url.protocol === 'https:';
}

function normalizeTagList(input) {
  if (!Array.isArray(input)) return [];
  const out = [];
  const seen = new Set();
  for (const raw of input) {
    if (raw == null) continue;
    const tag = String(raw).trim();
    if (!tag) continue;
    if (tag.length > 40) continue;
    const key = tag.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(tag);
    if (out.length >= 30) break;
  }
  return out;
}

function normalizeLanguageList(input) {
  if (!Array.isArray(input)) return [];
  const out = [];
  const seen = new Set();
  for (const raw of input) {
    if (raw == null) continue;
    const lang = String(raw).trim();
    if (!lang) continue;
    if (lang.length > 40) continue;
    if (seen.has(lang)) continue;
    seen.add(lang);
    out.push(lang);
    if (out.length >= 20) break;
  }
  return out;
}
function detectType(input) {
  if (!input) return 'text';
  const value = String(input).trim();
  const lower = value.toLowerCase();

  // Markdown file extension
  if (lower.endsWith('.md') || lower.endsWith('.markdown')) return 'markdown';

  // Plain-text file extension
  if (lower.endsWith('.txt')) return 'text';

  // Any http(s) URL is a `link`
  if (/^https?:\/\//.test(lower)) return 'link';

  // Anything else that looks like a path/identifier is also a `link` so the
  // user can still save it (e.g. a domain without scheme: "example.com/foo").
  return 'link';
}

// --- App -------------------------------------------------------------------
const app = express();
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true, limit: '5mb' }));
app.use(express.static(path.join(ROOT, 'public')));

// --- Courses ---------------------------------------------------------------
app.get('/api/courses', (_req, res) => {
  res.json(listAllCourses());
});

app.get('/api/courses/:id', (req, res) => {
  try {
    res.json(readCourse(req.params.id));
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
});

app.post('/api/courses', (req, res) => {
  const {
    title = 'Untitled Course',
    description = '',
    lessons = [],
    authors,
    tags,
    courseLanguage,
  } = req.body || {};
  if (!title.trim()) return res.status(400).json({ error: 'Title is required' });

  const now = new Date().toISOString();
  const course = {
    id: uuid(),
    title: title.trim(),
    description: description.trim(),
    createdAt: now,
    updatedAt: now,
    lessons: (Array.isArray(lessons) ? lessons : []).map((l) => normalizeLesson(l)),
    authors: normalizeAuthors(authors),
    tags: normalizeTagList(tags),
    courseLanguage: normalizeLanguageList(courseLanguage),
    tasks: [],
  };

  writeCourse(course);
  res.status(201).json(course);
});

app.put('/api/courses/:id', (req, res) => {
  let course;
  try { course = readCourse(req.params.id); }
  catch (err) { return res.status(err.status || 500).json({ error: err.message }); }

  const { title, description, authors, tags, courseLanguage } = req.body || {};
  if (typeof title === 'string') course.title = title.trim() || course.title;
  if (typeof description === 'string') course.description = description.trim();
  // Only overwrite the metadata arrays when the client actually sends them,
  // so an edit that only changes the title/description doesn't wipe the
  // authors/tags/languages that were already stored.
  if (Array.isArray(authors)) course.authors = normalizeAuthors(authors);
  if (Array.isArray(tags)) course.tags = normalizeTagList(tags);
  if (Array.isArray(courseLanguage)) course.courseLanguage = normalizeLanguageList(courseLanguage);
  course.updatedAt = new Date().toISOString();
  writeCourse(course);
  res.json(course);
});

app.delete('/api/courses/:id', (req, res) => {
  try {
    // readCourse validates the id; if it doesn't exist we still treat that
    // as a 404 even though the file is gone.
    readCourse(req.params.id);
    deleteCourseFile(req.params.id);
    res.json({ ok: true });
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
});

// --- Lessons ---------------------------------------------------------------
function normalizeLesson(input) {
  const title = (input.title || 'Untitled lesson').toString().trim() || 'Untitled lesson';
  const notes = (input.notes || '').toString();
  // User-authored learning note (markdown). Distinct from `notes` which is the
  // resource's own text content for text/markdown lessons.
  const lessonNote = (input.lessonNote || '').toString();
  // resource can be a string URL/path OR an object {type, value, name}
  let resource = input.resource ?? '';
  let type = (input.type || '').toString().toLowerCase();

  if (typeof resource === 'string') {
    if (!type) type = detectType(resource);
  } else if (resource && typeof resource === 'object') {
    type = (resource.type || type || 'text').toString().toLowerCase();
    resource = resource.value || resource.url || resource.path || '';
  }

  // Clamp the type to one of the three supported resource types. Legacy data
  // (e.g. `youtube`, `video`, `pdf`, `image`, `audio`, `website`, `article`)
  // is mapped to the closest equivalent so old lessons keep rendering.
  const allowed = new Set(['link', 'text', 'markdown']);
  const legacyMap = {
    youtube: 'link',
    website: 'link',
    article: 'link',
    image: 'link',
    video: 'link',
    audio: 'link',
    pdf: 'link',
  };
  let normalisedType = (legacyMap[type] || type || 'text').toString().toLowerCase();
  if (!allowed.has(normalisedType)) normalisedType = 'text';

  return {
    id: input.id || uuid(),
    title,
    type: normalisedType,
    resource: typeof resource === 'string' ? resource : '',
    notes,
    lessonNote,
    isCompleted: Boolean(input.isCompleted),
    completeDate: input.isCompleted ? (input.completeDate || new Date().toISOString()) : null,
    createdAt: input.createdAt || new Date().toISOString(),
    phaseId: input.phaseId || '',
    phaseTitle: input.phaseTitle || '',
    topicId: input.topicId || '',
    topicTitle: input.topicTitle || '',
    kind: input.kind || 'concept',
    estimatedMinutes: typeof input.estimatedMinutes === 'number' ? input.estimatedMinutes : 30,
    order: typeof input.order === 'number' ? input.order : 0,
  };
}

app.post('/api/courses/:id/lessons', (req, res) => {
  let course;
  try { course = readCourse(req.params.id); }
  catch (err) { return res.status(err.status || 500).json({ error: err.message }); }

  const lesson = normalizeLesson(req.body || {});
  course.lessons.push(lesson);
  course.updatedAt = new Date().toISOString();
  writeCourse(course);
  res.status(201).json(lesson);
});

app.put('/api/courses/:id/lessons/:lessonId', (req, res) => {
  let course;
  try { course = readCourse(req.params.id); }
  catch (err) { return res.status(err.status || 500).json({ error: err.message }); }

  const lesson = findLesson(course, req.params.lessonId);
  if (!lesson) return res.status(404).json({ error: 'Lesson not found' });

  const { title, type, resource, notes, isCompleted } = req.body || {};
  if (typeof title === 'string' && title.trim()) lesson.title = title.trim();
  if (typeof notes === 'string') lesson.notes = notes;
  if (req.body && typeof req.body.lessonNote === 'string') lesson.lessonNote = req.body.lessonNote;
  if (typeof isCompleted === 'boolean') {
    const was = lesson.isCompleted;
    lesson.isCompleted = isCompleted;
    // Only set a completeDate the first time the lesson flips true. Clearing
    // isCompleted wipes completeDate so the heatmap reflects the new state.
    if (isCompleted && !was) lesson.completeDate = new Date().toISOString();
    else if (!isCompleted) lesson.completeDate = null;
  }

  if (resource !== undefined) {
    if (resource && typeof resource === 'object') {
      lesson.type = (resource.type || lesson.type || 'text').toString().toLowerCase();
      lesson.resource = resource.value || resource.url || resource.path || '';
    } else {
      lesson.resource = String(resource);
      if (type) lesson.type = String(type).toLowerCase();
      else if (!lesson.resource) lesson.type = 'text';
      else lesson.type = detectType(lesson.resource);
    }
  } else if (type) {
    lesson.type = String(type).toLowerCase();
  }

  course.updatedAt = new Date().toISOString();
  writeCourse(course);
  res.json(lesson);
});

app.patch('/api/courses/:id/lessons/:lessonId/toggle', (req, res) => {
  let course;
  try { course = readCourse(req.params.id); }
  catch (err) { return res.status(err.status || 500).json({ error: err.message }); }

  const lesson = findLesson(course, req.params.lessonId);
  if (!lesson) return res.status(404).json({ error: 'Lesson not found' });
  lesson.isCompleted = !lesson.isCompleted;
  // Stamp completeDate when flipping on, clear it when flipping off.
  if (lesson.isCompleted) lesson.completeDate = new Date().toISOString();
  else lesson.completeDate = null;
  course.updatedAt = new Date().toISOString();
  writeCourse(course);
  res.json(lesson);
});

// Real-time save for the lesson's own learning note (markdown). Called on
// every keystroke (debounced client-side). Only updates the `lessonNote`
// field so we don't have to read/rewrite the whole course to persist typing.
app.put('/api/courses/:id/lessons/:lessonId/note', (req, res) => {
  let course;
  try { course = readCourse(req.params.id); }
  catch (err) { return res.status(err.status || 500).json({ error: err.message }); }

  const lesson = findLesson(course, req.params.lessonId);
  if (!lesson) return res.status(404).json({ error: 'Lesson not found' });

  const note = (req.body && typeof req.body.lessonNote === 'string') ? req.body.lessonNote : null;
  if (note === null) return res.status(400).json({ error: 'lessonNote must be a string' });

  // Cap to a generous size to keep individual course files small + sane.
  if (note.length > 500 * 1024) {
    return res.status(413).json({ error: 'lessonNote too large (>500KB)' });
  }

  lesson.lessonNote = note;
  course.updatedAt = new Date().toISOString();
  writeCourse(course);
  res.json({ ok: true, lessonNote: lesson.lessonNote, updatedAt: course.updatedAt });
});

// Reorder the lessons within a course. The client sends the full new order
// as `{ order: [lessonId, lessonId, ...] }`. Any lessons not mentioned are
// appended at the end in their previous relative order, so a missing id is
// never silently dropped. Unknown ids are ignored.
app.patch('/api/courses/:id/lessons/reorder', (req, res) => {
  let course;
  try { course = readCourse(req.params.id); }
  catch (err) { return res.status(err.status || 500).json({ error: err.message }); }

  const order = Array.isArray(req.body && req.body.order) ? req.body.order : null;
  if (!order) return res.status(400).json({ error: 'order must be an array of lesson ids' });

  const byId = new Map(course.lessons.map((l) => [l.id, l]));
  const seen = new Set();
  const next = [];
  for (const id of order) {
    if (typeof id !== 'string') continue;
    const lesson = byId.get(id);
    if (lesson && !seen.has(id)) {
      next.push(lesson);
      seen.add(id);
    }
  }
  // Append anything the client didn't mention, preserving existing order.
  for (const lesson of course.lessons) {
    if (!seen.has(lesson.id)) next.push(lesson);
  }
  course.lessons = next;
  course.updatedAt = new Date().toISOString();
  writeCourse(course);
  res.json(course);
});

app.delete('/api/courses/:id/lessons/:lessonId', (req, res) => {
  let course;
  try { course = readCourse(req.params.id); }
  catch (err) { return res.status(err.status || 500).json({ error: err.message }); }

  const before = course.lessons.length;
  course.lessons = course.lessons.filter((l) => l.id !== req.params.lessonId);
  if (course.lessons.length === before) return res.status(404).json({ error: 'Lesson not found' });
  course.updatedAt = new Date().toISOString();
  writeCourse(course);
  res.json({ ok: true });
});

// --- Tasks -----------------------------------------------------------------
// A task is an LLM-graded exercise: an instructor writes a Markdown question
// and a hidden "LLM instruction" (system prompt). A learner submits a free-
// text answer, the server asks Groq to evaluate it, and the resulting feedback
// is stored on the task so the learner can review it later. Submissions are
// kept (with timestamps) so the learner sees history, not just the latest try.

function ensureTasksArray(course) {
  // Defensive: courses imported from older exports may not have a `tasks`
  // field. We always read/write through this helper so the rest of the
  // route handlers can assume `course.tasks` is an array.
  if (!Array.isArray(course.tasks)) course.tasks = [];
  return course.tasks;
}

function findTask(course, taskId) {
  return ensureTasksArray(course).find((t) => t.id === taskId);
}

function normalizeTask(input) {
  const title = (input.title || 'Untitled task').toString().trim() || 'Untitled task';
  const question = (input.question || '').toString();
  const instruction = (input.instruction || '').toString();
  return {
    id: input.id || uuid(),
    title,
    question,
    instruction,
    phaseId: input.phaseId || '',
    phaseTitle: input.phaseTitle || '',
    topicId: input.topicId || '',
    topicTitle: input.topicTitle || '',
    status: input.status || 'NOT STARTED',
    createdAt: input.createdAt || new Date().toISOString(),
    submissions: Array.isArray(input.submissions) ? input.submissions : [],
  };
}

function normalizeSubmission(input) {
  let answer = (input && typeof input.answer === 'string') ? input.answer : '';
  if (answer.length > 200 * 1024) answer = answer.slice(0, 200 * 1024);
  return {
    id: uuid(),
    answer,
    createdAt: new Date().toISOString(),
  };
}

// Built-in Senior SRE Mentor Evaluation Engine (used when GROQ_API_KEY is not configured or as fallback)
function evaluateSRESubmission(task, submission) {
  const answer = (submission.answer || '').trim();
  const lowerAnswer = answer.toLowerCase();
  const topicId = task.topicId || '';
  
  if (answer.length < 40) {
    return {
      status: 'NEEDS REVISION',
      feedback: `## Evaluation: NEEDS REVISION ⚠️

### 🎯 Executive Summary
Your answer is too brief or incomplete. As a Site Reliability Engineer, detailed explanations and verifiable implementations are required to ensure production safety.

### 🔍 What is Missing
- The implementation / script or detailed steps were not provided.
- Core technical reasoning explaining system internals was omitted.

### 💡 Socratic Hint & Question
What happens to your service during a real production incident if error handling, timeouts, or recovery steps are omitted? How does defensive engineering protect availability?

### 🚀 Next Steps
Review the problem statement and practical lab instructions. Draft your complete solution and resubmit for evaluation.`
    };
  }

  let passCount = 0;
  const strengths = [];
  const gaps = [];
  let socraticHint = '';

  // Topic-specific evaluation rules for all 15 SRE Roadmap Topics
  if (topicId === 'p1-t1') {
    // Linux Fundamentals
    if (lowerAnswer.includes('df') || lowerAnswer.includes('awk') || lowerAnswer.includes('bash') || lowerAnswer.includes('#!/bin/bash') || lowerAnswer.includes('ps') || lowerAnswer.includes('chmod')) {
      passCount++; strengths.push('Included practical command-line implementation or script logic.');
    } else gaps.push('No concrete command implementation or script provided (e.g. using `df -Ph`, `awk`, or system utilities).');

    if (lowerAnswer.includes('threshold') || lowerAnswer.includes('80') || lowerAnswer.includes('-gt') || lowerAnswer.includes('>') || lowerAnswer.includes('alert')) {
      passCount++; strengths.push('Identified capacity/threshold metrics and alert trigger logic.');
    } else gaps.push('Did not demonstrate explicit threshold comparison against capacity limits.');

    if (lowerAnswer.includes('/proc') || lowerAnswer.includes('inode') || lowerAnswer.includes('fd') || lowerAnswer.includes('deleted') || lowerAnswer.includes('lsof')) {
      passCount++; strengths.push('Demonstrated deep understanding of Linux virtual filesystems (/proc) and unlinked open file descriptors.');
    } else gaps.push('Explain how to locate deleted open files consuming disk space using /proc/<PID>/fd or lsof.');

    if (lowerAnswer.includes('sigterm') || lowerAnswer.includes('sigkill') || lowerAnswer.includes('kill -9') || lowerAnswer.includes('systemd') || lowerAnswer.includes('timer')) {
      passCount++; strengths.push('Correctly articulated process signal handling (SIGTERM vs SIGKILL) and systemd timer advantages.');
    } else gaps.push('Address the critical difference between SIGTERM and SIGKILL, and the benefits of systemd timers over cron.');

    socraticHint = passCount >= 3 
      ? 'In an incident where a deleted file is still consuming disk space because a process holds the open file descriptor, how would you safely truncate that file without restarting the service (`> /proc/<PID>/fd/<FD>`)?'
      : 'In production, `kill -9` (`SIGKILL`) should never be your first choice. Why can a process not catch or handle `SIGKILL`, and what happens to in-flight data?';

  } else if (topicId === 'p1-t2') {
    // Networking Basics
    if (lowerAnswer.includes('ping') || lowerAnswer.includes('traceroute') || lowerAnswer.includes('mtr') || lowerAnswer.includes('curl') || lowerAnswer.includes('tcpdump') || lowerAnswer.includes('ss')) {
      passCount++; strengths.push('Provided structured network diagnostic command pipeline across layers 3, 4, and 7.');
    } else gaps.push('List explicit diagnostic commands across network layers (e.g. ping, traceroute, dig, ss, curl -v, tcpdump).');

    if (lowerAnswer.includes('syn') || lowerAnswer.includes('syn-ack') || lowerAnswer.includes('etimedout') || lowerAnswer.includes('firewall') || lowerAnswer.includes('security group')) {
      passCount++; strengths.push('Accurately analyzed TCP handshake packet drop / firewall filtering behavior.');
    } else gaps.push('Explain what SYN without SYN-ACK indicates in a TCP trace (packet drop / firewall filtering vs connection refused RST).');

    if (lowerAnswer.includes('resolv.conf') || lowerAnswer.includes('servfail') || lowerAnswer.includes('dig +trace') || lowerAnswer.includes('dns') || lowerAnswer.includes('nameserver')) {
      passCount++; strengths.push('Clear DNS failure resolution methodology tracing from /etc/resolv.conf to upstream resolvers.');
    } else gaps.push('Detail the step-by-step diagnostic workflow when encountering DNS SERVFAIL errors.');

    socraticHint = 'When curl fails with Connection Refused vs Connection Timed Out, which one received an explicit TCP RST packet from the server?';

  } else if (topicId === 'p1-t3') {
    // Bash Scripting
    if (lowerAnswer.includes('set -e') || lowerAnswer.includes('pipefail') || lowerAnswer.includes('#!/bin/bash') || lowerAnswer.includes('#!/usr/bin/env bash')) {
      passCount++; strengths.push('Utilized defensive Bash programming boilerplate (set -euo pipefail).');
    } else gaps.push('Include standard defensive Bash settings: set -euo pipefail and quote safety.');

    if (lowerAnswer.includes('tar') || lowerAnswer.includes('backup') || lowerAnswer.includes('mtime') || lowerAnswer.includes('delete') || lowerAnswer.includes('retention')) {
      passCount++; strengths.push('Implemented automated backup archiving with timestamping and retention pruning.');
    } else gaps.push('Specify backup archiving, compression verification, and older file pruning.');

    if (lowerAnswer.includes('sighup') || lowerAnswer.includes('trap') || lowerAnswer.includes('rotate') || lowerAnswer.includes('logger')) {
      passCount++; strengths.push('Demonstrated production-safe log rotation using SIGHUP or trap exit handlers.');
    } else gaps.push('Explain how to signal a daemon to reopen its log file handles without dropping active connections (e.g. via SIGHUP).');

    socraticHint = 'Why is `find ... -delete` safer than piping find output into `xargs rm` when dealing with spaces or strange characters in filenames?';

  } else if (topicId === 'p2-t4') {
    // Version Control (Git)
    if (lowerAnswer.includes('filter-repo') || lowerAnswer.includes('bfg') || lowerAnswer.includes('history') || lowerAnswer.includes('force-push') || lowerAnswer.includes('revoke')) {
      passCount++; strengths.push('Correctly articulated permanent secret remediation using history-rewriting tools and credential revocation.');
    } else gaps.push('Explain why `git rm` is insufficient for committed secrets, and detail the usage of git-filter-repo or BFG plus credential revocation.');

    if (lowerAnswer.includes('rebase -i') || lowerAnswer.includes('squash') || lowerAnswer.includes('fixup')) {
      passCount++; strengths.push('Outlined interactive rebase workflow for squashing commits into clean conventional PRs.');
    } else gaps.push('Explain the git rebase -i squashing procedure.');

    if (lowerAnswer.includes('merge') || lowerAnswer.includes('linear') || lowerAnswer.includes('conflict') || lowerAnswer.includes('gitops')) {
      passCount++; strengths.push('Discussed architectural trade-offs between merge commits and linear rebase histories in GitOps repositories.');
    } else gaps.push('Compare merge commits vs rebasing in an infrastructure-as-code repository.');

    socraticHint = 'When a secret is committed to a public or shared git repository, why must credential revocation happen BEFORE history rewriting?';

  } else if (topicId === 'p2-t5') {
    // Python Programming
    if (lowerAnswer.includes('requests') || lowerAnswer.includes('urllib') || lowerAnswer.includes('socket') || lowerAnswer.includes('import')) {
      passCount++; strengths.push('Clean Python implementation with proper library usage.');
    } else gaps.push('Provide complete Python code structure with standard libraries.');

    if (lowerAnswer.includes('timeout=') || lowerAnswer.includes('timeout') || lowerAnswer.includes('requestexception')) {
      passCount++; strengths.push('Applied defensive SRE networking standards with explicit outbound request timeouts.');
    } else gaps.push('Every outbound network call MUST specify an explicit timeout parameter.');

    if (lowerAnswer.includes('ssl') || lowerAnswer.includes('cert') || lowerAnswer.includes('notafter') || lowerAnswer.includes('expiry') || lowerAnswer.includes('json')) {
      passCount++; strengths.push('Implemented TLS certificate inspection and structured JSON CLI output.');
    } else gaps.push('Extract TLS certificate expiration timestamp and support structured JSON output.');

    socraticHint = 'What happens to a Python HTTP worker pool if outbound requests do not have timeouts and an upstream endpoint stalls indefinitely?';

  } else if (topicId === 'p2-t6') {
    // Databases Basics
    if (lowerAnswer.includes('pg_stat_activity') || lowerAnswer.includes('processlist') || lowerAnswer.includes('cancel') || lowerAnswer.includes('terminate')) {
      passCount++; strengths.push('Identified database diagnostic views and safe query termination mechanics.');
    } else gaps.push('Use pg_stat_activity to find slow queries and explain pg_cancel_backend vs pg_terminate_backend.');

    if (lowerAnswer.includes('index') || lowerAnswer.includes('seq scan') || lowerAnswer.includes('explain') || lowerAnswer.includes('b-tree')) {
      passCount++; strengths.push('Demonstrated clear understanding of query execution plans and index performance.');
    } else gaps.push('Explain the performance difference between Sequential Scan and Index Scan in EXPLAIN ANALYZE.');

    if (lowerAnswer.includes('pg_dump') || lowerAnswer.includes('backup') || lowerAnswer.includes('restore') || lowerAnswer.includes('wal')) {
      passCount++; strengths.push('Provided automated database backup and disaster recovery restoration validation procedures.');
    } else gaps.push('Include automated database backup commands and recovery verification steps.');

    socraticHint = 'Why is an untested database backup not considered a real backup in Site Reliability Engineering?';

  } else if (topicId === 'p2-t7') {
    // Containerization (Docker)
    if (lowerAnswer.includes('dockerfile') || lowerAnswer.includes('multi-stage') || lowerAnswer.includes('as builder') || lowerAnswer.includes('alpine') || lowerAnswer.includes('slim')) {
      passCount++; strengths.push('Employed multi-stage Docker build pattern for minimal image footprint.');
    } else gaps.push('Use multi-stage Dockerfile builds to separate compile-time tools from runtime image.');

    if (lowerAnswer.includes('user ') || lowerAnswer.includes('nonroot') || lowerAnswer.includes('appuser') || lowerAnswer.includes('healthcheck')) {
      passCount++; strengths.push('Implemented non-root container execution and explicit health checks.');
    } else gaps.push('Specify a non-root USER and an explicit HEALTHCHECK instruction in the Dockerfile.');

    if (lowerAnswer.includes('compose') || lowerAnswer.includes('cgroups') || lowerAnswer.includes('namespaces') || lowerAnswer.includes('limits') || lowerAnswer.includes('depends_on')) {
      passCount++; strengths.push('Configured multi-container compose architecture with resource limits and kernel isolation awareness.');
    } else gaps.push('Include resource constraints (CPU/memory limits) in Docker Compose and explain namespace/cgroup isolation.');

    socraticHint = 'If a container running as root suffers a remote code execution exploit, what prevents or allows the attacker from accessing host kernel resources?';

  } else if (topicId === 'p3-t8') {
    // Cloud Platforms (AWS)
    if (lowerAnswer.includes('vpc') && (lowerAnswer.includes('subnet') || lowerAnswer.includes('cidr'))) {
      passCount++; strengths.push('Designed multi-AZ VPC network topology with public and private subnet segregation.');
    } else gaps.push('Detail VPC subnet layout with CIDR blocks across at least 2 Availability Zones.');

    if (lowerAnswer.includes('nat') || lowerAnswer.includes('igw') || lowerAnswer.includes('route table') || lowerAnswer.includes('alb')) {
      passCount++; strengths.push('Correctly placed Internet Gateways, NAT Gateways, and Application Load Balancers.');
    } else gaps.push('Explain internet ingress/egress using Internet Gateways and NAT Gateways.');

    if (lowerAnswer.includes('security group') || lowerAnswer.includes('iam') || lowerAnswer.includes('asg') || lowerAnswer.includes('auto scaling')) {
      passCount++; strengths.push('Configured least-privilege security groups and auto-scaling resilience.');
    } else gaps.push('Address security group isolation between application and database tiers.');

    socraticHint = 'Why are Security Groups considered stateful while Network ACLs are stateless, and how does this affect return traffic?';

  } else if (topicId === 'p3-t9') {
    // Configuration Management (Ansible)
    if (lowerAnswer.includes('playbook') || lowerAnswer.includes('role') || lowerAnswer.includes('tasks:') || lowerAnswer.includes('main.yml')) {
      passCount++; strengths.push('Structured Ansible automation into modular tasks and roles.');
    } else gaps.push('Provide a structured Ansible playbook or role (tasks, templates, handlers).');

    if (lowerAnswer.includes('idempotent') || lowerAnswer.includes('state:') || lowerAnswer.includes('changed=0')) {
      passCount++; strengths.push('Ensured idempotency so repeated executions produce consistent desired state.');
    } else gaps.push('Explain how your Ansible automation ensures idempotency.');

    if (lowerAnswer.includes('handler') || lowerAnswer.includes('notify:') || lowerAnswer.includes('template') || lowerAnswer.includes('systemd')) {
      passCount++; strengths.push('Used handlers for conditional service restarts upon template modifications.');
    } else gaps.push('Use Ansible handlers to trigger service reloads only when configuration files actually change.');

    socraticHint = 'What is the operational difference between executing `ansible-playbook --check` (dry-run) and executing against production nodes?';

  } else if (topicId === 'p4-t10') {
    // Monitoring & Observability
    if (lowerAnswer.includes('sli') && lowerAnswer.includes('slo') && (lowerAnswer.includes('error budget') || lowerAnswer.includes('budget'))) {
      passCount++; strengths.push('Mathematically defined SLIs, SLOs, and Error Budgets for production availability.');
    } else gaps.push('Clearly specify the Service Level Indicator (SLI), Service Level Objective (SLO), and Error Budget calculation.');

    if (lowerAnswer.includes('rate(') || lowerAnswer.includes('histogram_quantile') || lowerAnswer.includes('promql') || lowerAnswer.includes('prometheus')) {
      passCount++; strengths.push('Formulated accurate PromQL queries for error rates and percentile latencies.');
    } else gaps.push('Provide valid PromQL queries for 5xx error percentage and P99 latency.');

    if (lowerAnswer.includes('burn rate') || lowerAnswer.includes('policy') || lowerAnswer.includes('alertmanager') || lowerAnswer.includes('golden signals')) {
      passCount++; strengths.push('Implemented multi-window burn rate alerting and an actionable Error Budget policy.');
    } else gaps.push('Define multi-window burn rate alerts and the engineering actions triggered when error budgets are exhausted.');

    socraticHint = 'Why is alerting on a single 5-minute spike in error rate more prone to false alarms than a multi-window burn rate alert?';

  } else if (topicId === 'p4-t11') {
    // CI/CD Pipelines
    if (lowerAnswer.includes('pipeline') || lowerAnswer.includes('workflow') || lowerAnswer.includes('actions') || lowerAnswer.includes('.github/workflows')) {
      passCount++; strengths.push('Created end-to-end Pipeline as Code configuration.');
    } else gaps.push('Provide declarative CI/CD pipeline workflow configuration.');

    if (lowerAnswer.includes('test') || lowerAnswer.includes('trivy') || lowerAnswer.includes('scan') || lowerAnswer.includes('lint')) {
      passCount++; strengths.push('Included automated testing and container security vulnerability gating.');
    } else gaps.push('Include automated testing and container vulnerability scanning stages.');

    if (lowerAnswer.includes('canary') || lowerAnswer.includes('rollback') || lowerAnswer.includes('blue/green') || lowerAnswer.includes('promote')) {
      passCount++; strengths.push('Engineered progressive canary delivery with automated rollback upon metric regression.');
    } else gaps.push('Explain automated rollback mechanics when canary error rates exceed thresholds.');

    socraticHint = 'How does an automated canary analysis tool like Flagger or Argo Rollouts decide whether to promote or abort a deployment?';

  } else if (topicId === 'p4-t12') {
    // Kubernetes
    if (lowerAnswer.includes('deployment') && (lowerAnswer.includes('readinessprobe') || lowerAnswer.includes('livenessprobe'))) {
      passCount++; strengths.push('Configured Kubernetes health probes with startup/readiness/liveness parameters.');
    } else gaps.push('Include both readinessProbe and livenessProbe in your pod specification.');

    if (lowerAnswer.includes('requests') && lowerAnswer.includes('limits') && (lowerAnswer.includes('cpu') || lowerAnswer.includes('memory'))) {
      passCount++; strengths.push('Defined explicit resource requests and limits preventing noisy neighbor issues.');
    } else gaps.push('Specify CPU and memory resource requests and limits.');

    if (lowerAnswer.includes('hpa') || lowerAnswer.includes('pdb') || lowerAnswer.includes('rollingupdate') || lowerAnswer.includes('maxunavailable')) {
      passCount++; strengths.push('Configured Horizontal Pod Autoscaling and Pod Disruption Budgets for zero downtime.');
    } else gaps.push('Include Horizontal Pod Autoscaler (HPA) and Pod Disruption Budget (PDB) configurations.');

    socraticHint = 'If a pod fails its readinessProbe, does Kubernetes restart the container? How does that differ from livenessProbe failure?';

  } else if (topicId === 'p4-t13') {
    // Incident Management & On-Call
    if (lowerAnswer.includes('runbook') && (lowerAnswer.includes('triage') || lowerAnswer.includes('mitigation') || lowerAnswer.includes('commands'))) {
      passCount++; strengths.push('Authored actionable production runbook with concrete diagnostic commands.');
    } else gaps.push('Provide an actionable runbook with trigger conditions, triage commands, and mitigation steps.');

    if (lowerAnswer.includes('post-mortem') || lowerAnswer.includes('postmortem') || lowerAnswer.includes('timeline') || lowerAnswer.includes('utc')) {
      passCount++; strengths.push('Structured blameless post-mortem with high-resolution timestamped timeline.');
    } else gaps.push('Include a timestamped timeline of events in your post-mortem.');

    if (lowerAnswer.includes('5 whys') || lowerAnswer.includes('root cause') || lowerAnswer.includes('action items') || lowerAnswer.includes('blameless')) {
      passCount++; strengths.push('Conducted rigorous 5 Whys analysis identifying systemic vulnerabilities and assigned action items.');
    } else gaps.push('Apply the 5 Whys methodology and outline preventative engineering action items.');

    socraticHint = 'Why do Google and leading SRE organizations strictly prohibit naming individuals in incident post-mortem documents?';

  } else if (topicId === 'p5-t14') {
    // Focus Areas
    if (lowerAnswer.includes('mesh') || lowerAnswer.includes('istio') || lowerAnswer.includes('tracing') || lowerAnswer.includes('opentelemetry') || lowerAnswer.includes('vault') || lowerAnswer.includes('chaos')) {
      passCount++; strengths.push('Detailed technical architecture for chosen specialization domain.');
    } else gaps.push('Select a focus area (Service Mesh, Distributed Tracing, or Vault/Security) and outline the architecture.');

    if (lowerAnswer.includes('architecture') || lowerAnswer.includes('config') || lowerAnswer.includes('manifest') || lowerAnswer.includes('code')) {
      passCount++; strengths.push('Provided concrete implementation manifests and technical configurations.');
    } else gaps.push('Provide sample configuration manifests or code snippets.');

    if (lowerAnswer.includes('overhead') || lowerAnswer.includes('rollback') || lowerAnswer.includes('failure') || lowerAnswer.includes('latency')) {
      passCount++; strengths.push('Evaluated performance overhead, latency impact, and failure modes.');
    } else gaps.push('Analyze operational readiness, latency impact, and rollback strategies.');

    socraticHint = 'What is the CPU and latency penalty introduced by sidecar proxies in a service mesh, and how do you decide if the security/observability benefits outweigh it?';

  } else if (topicId === 'p5-t15') {
    // Soft Skills Development
    if (lowerAnswer.includes('rfc') || lowerAnswer.includes('adr') || lowerAnswer.includes('proposal') || lowerAnswer.includes('context')) {
      passCount++; strengths.push('Structured formal Architecture Decision Record (ADR) / RFC following industry standards.');
    } else gaps.push('Structure your proposal as a formal RFC or ADR with Context, Decision, and Status.');

    if (lowerAnswer.includes('alternatives') || lowerAnswer.includes('trade-off') || lowerAnswer.includes('pros') || lowerAnswer.includes('cons')) {
      passCount++; strengths.push('Deliberated architectural alternatives and trade-offs objectively.');
    } else gaps.push('Include alternative solutions evaluated and articulate the technical trade-offs.');

    if (lowerAnswer.includes('rollout') || lowerAnswer.includes('migration') || lowerAnswer.includes('teams') || lowerAnswer.includes('adoption')) {
      passCount++; strengths.push('Formulated practical cross-team migration and adoption roadmap.');
    } else gaps.push('Explain the cross-team adoption plan and developer enablement.');

    socraticHint = 'When introducing a new reliability standard across 20 dev teams, why is creating automated linting and templates more effective than writing mandatory policy documents?';

  } else {
    // Generic fallback for any other SRE task
    if (lowerAnswer.length > 150) passCount += 2;
    if (lowerAnswer.includes('sre') || lowerAnswer.includes('reliability') || lowerAnswer.includes('production')) passCount++;
    strengths.push('Demonstrated foundational engineering reasoning.');
    socraticHint = 'How does this solution ensure zero downtime and resilience during unexpected system failures?';
  }

  const isPass = passCount >= 2;
  const status = isPass ? 'PASS' : 'NEEDS REVISION';

  return {
    status: status,
    feedback: `## Evaluation: ${status === 'PASS' ? 'PASS ✅' : 'NEEDS REVISION ⚠️'}

### 🎯 Executive Summary
${isPass
  ? 'Strong work! Your submission demonstrates good technical understanding of SRE principles, system utilities, and error-resilient engineering.'
  : 'Good initial attempt, but critical production considerations and system explanations are missing before this can be approved for production.'}

### 🔍 Technical Strengths
${strengths.map(s => `- ${s}`).join('\n')}

### ⚠️ Gaps & Edge Cases
${gaps.length > 0 ? gaps.map(g => `- ${g}`).join('\n') : '- No critical gaps detected. Clean production-oriented mindset.'}

### 💡 Socratic Hint & Question
${socraticHint}

### 🚀 Next Steps
${isPass
  ? 'Congratulations! You have met the requirements for this topic. Mark this topic complete and advance to the next topic in your SRE roadmap.'
  : 'Refine your submission with the points highlighted above, then re-submit to receive updated mentor feedback.'}

---
*Evaluated by Senior SRE Mentor.*`
  };
}

app.post('/api/courses/:id/tasks', (req, res) => {
  let course;
  try { course = readCourse(req.params.id); }
  catch (err) { return res.status(err.status || 500).json({ error: err.message }); }

  const task = normalizeTask(req.body || {});
  ensureTasksArray(course).push(task);
  course.updatedAt = new Date().toISOString();
  writeCourse(course);
  res.status(201).json(task);
});

app.put('/api/courses/:id/tasks/:taskId', (req, res) => {
  let course;
  try { course = readCourse(req.params.id); }
  catch (err) { return res.status(err.status || 500).json({ error: err.message }); }

  const task = findTask(course, req.params.taskId);
  if (!task) return res.status(404).json({ error: 'Task not found' });

  const { title, question, instruction, status, topicId, phaseId } = req.body || {};
  if (typeof title === 'string' && title.trim()) task.title = title.trim();
  if (typeof question === 'string') task.question = question;
  if (typeof instruction === 'string') task.instruction = instruction;
  if (typeof status === 'string') task.status = status;
  if (typeof topicId === 'string') task.topicId = topicId;
  if (typeof phaseId === 'string') task.phaseId = phaseId;

  course.updatedAt = new Date().toISOString();
  writeCourse(course);
  res.json(task);
});

app.patch('/api/courses/:id/tasks/:taskId/status', (req, res) => {
  let course;
  try { course = readCourse(req.params.id); }
  catch (err) { return res.status(err.status || 500).json({ error: err.message }); }

  const task = findTask(course, req.params.taskId);
  if (!task) return res.status(404).json({ error: 'Task not found' });

  const { status } = req.body || {};
  if (status) task.status = String(status);

  course.updatedAt = new Date().toISOString();
  writeCourse(course);
  res.json(task);
});

app.delete('/api/courses/:id/tasks/:taskId', (req, res) => {
  let course;
  try { course = readCourse(req.params.id); }
  catch (err) { return res.status(err.status || 500).json({ error: err.message }); }

  const tasks = ensureTasksArray(course);
  const before = tasks.length;
  course.tasks = tasks.filter((t) => t.id !== req.params.taskId);
  if (course.tasks.length === before) return res.status(404).json({ error: 'Task not found' });
  course.updatedAt = new Date().toISOString();
  writeCourse(course);
  res.json({ ok: true });
});

app.post('/api/courses/:id/tasks/:taskId/submit', async (req, res) => {
  let course;
  try { course = readCourse(req.params.id); }
  catch (err) { return res.status(err.status || 500).json({ error: err.message }); }

  const task = findTask(course, req.params.taskId);
  if (!task) return res.status(404).json({ error: 'Task not found' });

  const submission = normalizeSubmission(req.body || {});
  if (!submission.answer.trim()) {
    return res.status(400).json({ error: 'Answer cannot be empty' });
  }

  const groq = getGroq();
  let feedback = '';

  const systemMsg = (task.instruction && task.instruction.trim())
    ? task.instruction.trim()
    : 'You are a Senior SRE Mentor evaluating a learner\'s technical work. Give detailed, constructive, and accurate feedback with high production standards.';
  const userMsg =
    `Question:\n${task.question || '(no question provided)'}\n\n` +
    `Learner's answer:\n${submission.answer}\n\n` +
    `Reply with feedback only.`;

  if (groq) {
    try {
      const completion = await groq.chat.completions.create({
        model: GROQ_MODEL,
        messages: [
          { role: 'system', content: systemMsg },
          { role: 'user', content: userMsg },
        ],
        temperature: 0.4,
      });
      feedback = (completion.choices && completion.choices[0] && completion.choices[0].message
        && typeof completion.choices[0].message.content === 'string')
        ? completion.choices[0].message.content.trim()
        : '';
    } catch (err) {
      console.warn('Groq completion failed, using built-in SRE mentor engine:', err.message);
    }
  }

  // Fallback to built-in SRE Mentor engine if Groq is not configured or failed
  if (!feedback) {
    const evalResult = evaluateSRESubmission(task, submission);
    feedback = evalResult.feedback;
  }

  // Update status based on evaluation
  const isPass = /evaluation:\s*pass|result:\s*pass|\[pass\]|pass\s*✅/i.test(feedback);
  task.status = isPass ? 'COMPLETED' : 'NEEDS REVISION';

  // If passed, mark corresponding lesson as completed if one exists
  if (isPass && task.topicId) {
    (course.lessons || []).forEach((l) => {
      if (l.topicId === task.topicId && (l.kind === 'assignment' || l.title.toLowerCase().includes('assignment'))) {
        l.isCompleted = true;
        l.completeDate = new Date().toISOString();
      }
    });
  }

  submission.feedback = feedback;
  if (!Array.isArray(task.submissions)) task.submissions = [];
  task.submissions.push(submission);
  course.updatedAt = new Date().toISOString();
  writeCourse(course);
  res.status(201).json({ submission, taskId: task.id, status: task.status });
});

// --- Sync the db/ folder to the remote (git add/commit/push) ---------------
// Runs `git add db/ && git commit -m "synced" && git push origin main` from
// the server's cwd. Returns a small JSON report so the UI can toast the result.
// If there's nothing to commit, the commit step is skipped (no error). If the
// push fails (e.g. no network), the commit is kept locally and the error is
// reported back to the caller.
app.post('/api/sync', (_req, res) => {
  const { execFile } = require('child_process');

  function run(cmd, args) {
    return new Promise((resolve) => {
      execFile(cmd, args, { cwd: ROOT, windowsHide: true, maxBuffer: 4 * 1024 * 1024 }, (err, stdout, stderr) => {
        resolve({ err, stdout: String(stdout || ''), stderr: String(stderr || '') });
      });
    });
  }

  (async () => {
    try {
      // Make sure git sees a change worth committing.
      const status = await run('git', ['status', '--porcelain', '--', 'db/']);
      if (status.err) {
        return res.status(500).json({ ok: false, error: 'git status failed: ' + status.stderr.trim() });
      }
      const dirty = status.stdout.trim().length > 0;

      if (dirty) {
        const add = await run('git', ['add', 'db/']);
        if (add.err) return res.status(500).json({ ok: false, error: 'git add failed: ' + add.stderr.trim() });

        const commit = await run('git', ['commit', '-m', 'synced']);
        // Non-zero exit from commit is usually "nothing to commit" (race) — treat as skip.
        if (commit.err && !/nothing to commit/i.test(commit.stderr + commit.stdout)) {
          return res.status(500).json({ ok: false, error: 'git commit failed: ' + (commit.stderr || commit.stdout).trim() });
        }
      }

      const push = await run('git', ['push', 'origin', 'main']);
      if (push.err) {
        return res.json({
          ok: false,
          committed: dirty,
          pushed: false,
          pushSkipped: false,
          error: 'git push failed: ' + (push.stderr || push.stdout).trim(),
        });
      }

      return res.json({
        ok: true,
        committed: dirty,
        commitSkipped: !dirty,
        pushed: true,
        pushSkipped: false,
      });
    } catch (err) {
      res.status(500).json({ ok: false, error: err.message });
    }
  })();
});

// --- Export / import individual course JSON files -------------------------
// GET /api/courses/:id/export
//   Sends the course object back as a downloadable .json file. Filename is
//   derived from the title (sanitised) so it lands sensibly in the user's
//   downloads folder.
// POST /api/courses/import
//   Accepts a course JSON in the body, mints a fresh id / lesson ids so the
//   imported course never collides with the recipient's existing data, and
//   writes it into db/. Returns the new course.

function safeFilenameBase(title) {
  return (title || 'course')
    .toString()
    .trim()
    .replace(/[^a-zA-Z0-9._-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60) || 'course';
}

app.get('/api/courses/:id/export', (req, res) => {
  let course;
  try { course = readCourse(req.params.id); }
  catch (err) { return res.status(err.status || 500).json({ error: err.message }); }

  const filename = `${safeFilenameBase(course.title)}-${course.id.slice(0, 8)}.json`;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
  res.send(JSON.stringify(course, null, 2));
});

app.post('/api/courses/import', (req, res) => {
  const body = req.body;
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return res.status(400).json({ error: 'A course JSON object is required in the request body' });
  }
  if (typeof body.title !== 'string' || !body.title.trim()) {
    return res.status(400).json({ error: 'Imported course is missing a title' });
  }

  const now = new Date().toISOString();
  const lessons = Array.isArray(body.lessons) ? body.lessons : [];
  // Re-normalise so every lesson gets a fresh id and any missing fields are
  // filled in. This keeps the imported course consistent with courses created
  // through the normal UI.
  const normalisedLessons = lessons.map((l) => normalizeLesson(l));

  const course = {
    id: uuid(),
    title: body.title.trim(),
    description: typeof body.description === 'string' ? body.description.trim() : '',
    createdAt: now,
    updatedAt: now,
    lessons: normalisedLessons,
    authors: normalizeAuthors(body.authors),
    tags: normalizeTagList(body.tags),
    courseLanguage: normalizeLanguageList(body.courseLanguage),
    tasks: [],
  };

  writeCourse(course);
  res.status(201).json(course);
});

// --- Fallback to index.html for client routes ------------------------------
app.get(/^\/(?!api).*/, (_req, res) => {
  res.sendFile(path.join(ROOT, 'public', 'index.html'));
});

const server = app.listen(PORT, () => {
  console.log(`Open Course Builder running at http://localhost:${PORT}`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(
      `\nPort ${PORT} is already in use.\n` +
        `  - Find the process:  netstat -ano | findstr :${PORT}\n` +
        `  - Kill it:           taskkill /PID <pid> /F\n` +
        `  - Or use a different port:  set PORT=3001  (cmd)  /  $env:PORT=3001  (powershell), then npm start\n`
    );
    process.exit(1);
  }
  throw err;
});
