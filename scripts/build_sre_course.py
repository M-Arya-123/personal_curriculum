import os
import json
from datetime import datetime, timezone

COURSE_ID = "c1a00000-0000-4000-a000-000000000001"
OUTPUT_PATH = os.path.join(os.path.dirname(__file__), "..", "db", f"{COURSE_ID}.json")

now = datetime.now(timezone.utc).isoformat()

# Build comprehensive curriculum matching Santhosh Kumar Jampala's article exactly
course = {
    "id": COURSE_ID,
    "title": "Site Reliability Engineering (SRE) Roadmap",
    "description": "Complete Learning Path from Zero to Site Reliability Engineer based strictly on Santhosh Kumar Jampala's authoritative curriculum. Estimated Timeframe: 12–18 months (15–20 hours/week) covering 5 progressive Phases and all 15 Topics with hands-on practice, labs, assignments, and AI SRE Mentor review.",
    "createdAt": now,
    "updatedAt": now,
    "authors": [
        {
            "authorName": "Santhosh Kumar Jampala",
            "authorLink": "https://medium.com/@santhoshjsh/sre-roadmap-for-beginners-4a183314c504"
        }
    ],
    "tags": [
        "SRE",
        "DevOps",
        "Linux",
        "Networking",
        "Bash",
        "Git",
        "Python",
        "Databases",
        "Docker",
        "AWS",
        "Ansible",
        "Observability",
        "Prometheus",
        "Grafana",
        "CI/CD",
        "Kubernetes",
        "Incident Management"
    ],
    "courseLanguage": ["English"],
    "lessons": [],
    "tasks": []
}

# -----------------------------------------------------------------------------
# Helper functions
# -----------------------------------------------------------------------------
order_counter = 1

def add_lesson(lesson_id, title, phase_id, phase_title, topic_id, topic_title, kind, est_minutes, notes, resource=""):
    global order_counter
    course["lessons"].append({
        "id": lesson_id,
        "title": title,
        "type": "markdown",
        "resource": resource,
        "notes": notes,
        "lessonNote": "",
        "isCompleted": False,
        "completeDate": None,
        "createdAt": now,
        "phaseId": phase_id,
        "phaseTitle": phase_title,
        "topicId": topic_id,
        "topicTitle": topic_title,
        "kind": kind,
        "estimatedMinutes": est_minutes,
        "order": order_counter
    })
    order_counter += 1

def add_task(task_id, title, phase_id, phase_title, topic_id, topic_title, question, instruction):
    course["tasks"].append({
        "id": task_id,
        "title": title,
        "phaseId": phase_id,
        "phaseTitle": phase_title,
        "topicId": topic_id,
        "topicTitle": topic_title,
        "status": "NOT STARTED",
        "createdAt": now,
        "question": question,
        "instruction": instruction,
        "submissions": []
    })

# =============================================================================
# INTRODUCTORY GUIDE LESSON: SRE Principles & Roadmap Study Guide
# =============================================================================
add_lesson(
    "f0a00000-0001-4000-a000-000000000001",
    "Roadmap Orientation: SRE Principles, Reading List & Study Schedule",
    "phase-1",
    "Phase 1: Foundation (Months 1–3)",
    "p1-t1",
    "1. Linux Fundamentals",
    "concept",
    30,
    """# SRE Roadmap for Beginners: Authoritative Overview

**Title:** Complete Learning Path from Zero to Site Reliability Engineer  
**Author:** Santhosh Kumar Jampala  
**Estimated Timeframe:** 12–18 months (15–20 hours/week)

---

## 1. Understanding SRE & What SREs Do

### What is Site Reliability Engineering?
Site Reliability Engineering (SRE) is a discipline that applies software engineering principles to infrastructure and operations problems. SREs create scalable, automated, and highly reliable software systems.

### Core Responsibilities of an SRE:
* Monitor and maintain system reliability and uptime
* Automate operational tasks to eliminate repetitive toil
* Design and implement scalable cloud infrastructure
* Lead incident response channels and conduct blameless post-mortems
* Balance feature velocity with system stability using Error Budgets
* Define and track Service Level Objectives (SLOs) and Indicators (SLIs)

---

## 2. Essential SRE Principles to Internalize
1. **Embrace Risk:** 100% uptime is impossible and wasteful. Set realistic targets.
2. **Service Level Objectives:** Define and measure what truly matters to users.
3. **Eliminate Toil:** Automate repetitive manual operational tasks.
4. **Monitoring & Alerting:** Know your systems' health through metrics, logs, and traces.
5. **Capacity Planning:** Plan for traffic growth before outages happen.
6. **Blameless Post-Mortems:** Learn from failures without pointing fingers.
7. **Gradual Rollouts:** Reduce the blast radius of new changes with canaries.

---

## 3. Recommended Reading List

### Essential Books (Free Online)
* [Site Reliability Engineering: How Google Runs Production Systems](https://sre.google/sre-book/table-of-contents/) by Google
* [The Site Reliability Workbook](https://sre.google/workbook/table-of-contents/) by Google
* [Building Secure and Reliable Systems](https://sre.google/books/building-secure-reliable-systems/) by Google

### Paid Books Worth Buying
* *The Phoenix Project* by Gene Kim (DevOps transformation novel)
* *Seeking SRE* edited by David N. Blank-Edelman
* *Database Reliability Engineering* by Laine Campbell & Charity Majors

---

## 4. Certifications to Consider
* **Foundational:** Linux Foundation Certified System Administrator (LFCS), AWS Certified Solutions Architect Associate (or GCP/Azure equivalent)
* **Advanced:** Certified Kubernetes Administrator (CKA), Certified Kubernetes Application Developer (CKAD), HashiCorp Certified: Terraform Associate

---

## 5. Weekly Study Schedule Template
* **Weekdays (2 hours/day):**
  * 1 hour: Focused learning (courses, books, tutorials)
  * 1 hour: Hands-on practice (labs, terminal, code, projects)
* **Weekends (4–6 hours total):**
  * Work on a larger project / lab
  * Read SRE books or technical blogs
  * Watch SREcon conference talks
  * Practice system troubleshooting scenarios

---

## 6. Common Pitfalls to Avoid
1. **Tutorial hell:** Build real projects, don't just passively watch videos.
2. **Trying to learn everything at once:** Master Linux and networking fundamentals first.
3. **Skipping Linux:** It is the bedrock of containers, cloud VMs, and Kubernetes.
4. **Not documenting:** Keep engineering notes, runbooks, and write down findings.
5. **Working in isolation:** Join SRE communities (Reddit r/sre, CNCF, Slack).
6. **Ignoring soft skills:** Technical communication and incident leadership are critical.
""",
    resource="https://medium.com/@santhoshjsh/sre-roadmap-for-beginners-4a183314c504"
)

# =============================================================================
# PHASE 1: FOUNDATION (Months 1–3)
# =============================================================================

# TOPIC 1: Linux Fundamentals
add_lesson(
    "f1a00001-0001-4000-a000-000000000001",
    "1. Linux Fundamentals — Concepts & Core Architecture",
    "phase-1", "Phase 1: Foundation (Months 1–3)",
    "p1-t1", "1. Linux Fundamentals",
    "concept", 60,
    """# 1. Linux Fundamentals: Deep Dive for SREs

**Why:** Linux powers most servers and cloud infrastructure worldwide. SREs must be intimately familiar with the CLI, operating system internals, process lifecycle, virtual filesystems, and security controls.

---

## What to Learn

### 1. Basic Command Line Navigation & File Operations
* **Navigation:** `cd`, `ls -laFh`, `pwd`, `mkdir -p`
* **File Operations:** `cp -a`, `mv`, `rm -rf`, `cat`, `grep -E`, `find /var/log -type f -mtime -2`, `less`, `head`, `tail -f`
* **Text Processing Pipeline:** `awk`, `sed`, `cut`, `sort`, `uniq -c`, `xargs`, `wc -l`

### 2. Text Editors
* Master either **`vim`** or **`nano`** for remote server configuration editing over SSH without GUI dependencies.

### 3. File Permissions and Ownership
* **Permission Bits:** Read (4), Write (2), Execute (1) across User, Group, Others.
* **Commands:** `chmod 750 script.sh`, `chmod u+x,g-w file`, `chown -R app:app /opt/app`.
* **Special Permissions:** SUID (4000), SGID (2000), Sticky Bit (1000 on `/tmp`).
* Understanding `umask` defaults.

### 4. Process Management & System Inspection
* **Process Lifecycle:** `fork()` -> `exec()` -> Running -> Sleeping (`S`/`D`) -> Zombie (`Z`).
* **Inspection:** `ps aux`, `top`, `htop`, `pgrep`, `kill`, `systemctl`.
* **Signals:**
  * `SIGTERM` (15): Graceful termination; process can flush buffers and close connections.
  * `SIGKILL` (9): Immediate kernel kill; cannot be caught or ignored.
  * `SIGHUP` (1): Reload configuration without stopping process.
* **Systemd:** `systemctl status/start/stop/restart/enable/reload`, `journalctl -u <service> -f`.

### 5. Package Management
* Debian/Ubuntu: `apt update && apt install -y`, `dpkg -l`.
* RHEL/Rocky: `yum install -y` / `dnf install -y`, `rpm -qa`.

### 6. SSH and Remote Connections
* Key generation: `ssh-keygen -t ed25519`.
* Public key distribution: `ssh-copy-id user@host`.
* SSH hardening: `/etc/ssh/sshd_config` (`PermitRootLogin no`, `PasswordAuthentication no`).
* Port forwarding: `ssh -L 8080:localhost:80 user@remote`.

### 7. Virtual Filesystems: `/proc` and `/sys`
* Dynamic kernel data structures exposed as files:
  * `/proc/cpuinfo`, `/proc/meminfo`, `/proc/loadavg`
  * `/proc/[PID]/cmdline`, `/proc/[PID]/fd/`, `/proc/[PID]/status`
  * Diagnosing deleted open files holding disk space with `lsof +L1` and `/proc/[PID]/fd/* (deleted)`.
"""
)

add_lesson(
    "f1a00001-0002-4000-a000-000000000001",
    "1. Linux Fundamentals — Recommended Resources",
    "phase-1", "Phase 1: Foundation (Months 1–3)",
    "p1-t1", "1. Linux Fundamentals",
    "resource", 30,
    """# 1. Linux Fundamentals: Authoritative Resources

The following resources are explicitly recommended by Santhosh Kumar Jampala's roadmap:

### 1. [Linux Journey](https://linuxjourney.com)
* Interactive, modular web course covering Grasshopper, Journeyman, Networking, and Command Line.

### 2. [OverTheWire: Bandit Wargame](https://overthewire.org/wargames/bandit/)
* Hands-on security and Linux CLI challenges. Target: Complete Levels 0 through 20.

### 3. *"The Linux Command Line"* by William Shotts
* Complete free online book: [linuxcommand.org/tlcl.php](https://linuxcommand.org/tlcl.php). Covers shell usage, environment configuration, core utilities, and shell scripting.
""",
    resource="https://linuxjourney.com"
)

add_lesson(
    "f1a00001-0003-4000-a000-000000000001",
    "1. Linux Fundamentals — Practice Projects & Exercises",
    "phase-1", "Phase 1: Foundation (Months 1–3)",
    "p1-t1", "1. Linux Fundamentals",
    "practice", 60,
    """# 1. Linux Fundamentals: Practice Projects

**Roadmap Requirements:**
1. Set up a Linux VM (Ubuntu or Rocky Linux) on VirtualBox.
2. Complete basic system administration tasks daily.

---

### Step-by-Step Lab Instructions

#### Exercise 1: VM Provisioning & Hardening
1. Download Ubuntu Server 22.04 LTS ISO or Rocky Linux 9.
2. In VirtualBox, provision a VM with 2 vCPUs, 2048 MB RAM, and Host-Only / Bridged Networking.
3. Configure SSH keypair authentication (`ed25519`) and disable password login in `/etc/ssh/sshd_config`.

#### Exercise 2: Daily System Administration Triage Runbook
Run and record the output of essential diagnostic utilities:
```bash
uptime
free -h
df -hT --exclude-type=tmpfs --exclude-type=squashfs
ps aux --sort=-%cpu | head -n 6
ps aux --sort=-%mem | head -n 6
ss -tulpn
```

#### Exercise 3: Simulating Open File Disk Leak
1. Create a 200MB file: `dd if=/dev/zero of=/tmp/leak.img bs=1M count=200`
2. Hold file open: `tail -f /tmp/leak.img &`
3. Delete file: `rm /tmp/leak.img`
4. Inspect `df -h /tmp` vs `ls /tmp/leak.img`. Notice disk space is not freed!
5. Find leaking PID using `lsof +L1` or `/proc/<PID>/fd/`.
6. Terminate process cleanly and observe disk reclamation.
"""
)

add_task(
    "t1a00001-0001-4000-a000-000000000001",
    "Assignment 1: Linux Process & Disk Alerting System (Hands-on SRE Lab)",
    "phase-1", "Phase 1: Foundation (Months 1–3)",
    "p1-t1", "1. Linux Fundamentals",
    """# Assignment 1: Linux Process & Disk Alerting System

### Production Scenario
You are on-call for an e-commerce platform. Several production database replica nodes suffered severe degradation because a logging process filled the root partition (`/`) to 100% capacity. When root is full, Linux cannot create temporary files or allocate socket buffers, causing services to crash hard.

To prevent this from recurring, your team requires an automated diagnostic and alerting script that monitors disk capacity and flags runaway processes before an outage occurs.

---

### Tasks to Submit

#### 1. Shell Implementation
Write a production-quality Bash script named `sre_disk_alert.sh` that:
- Inspects all mounted filesystems using standard Unix tools (`df`).
- Excludes virtual pseudo-filesystems (e.g. `tmpfs`, `devtmpfs`, `squashfs`).
- Flags any partition where usage exceeds a configurable threshold (default **80%**).
- For flagged partitions, identifies the top 3 largest directories/files.
- Emits structured log output with timestamps to standard error/syslog.
- Adheres to defensive bash programming standards.

#### 2. Technical Explanation Questions
Answer the following system questions:
1. **The `/proc` Mystery:** A junior engineer deleted a 50GB log file with `rm /var/log/app.log`, but `df -h` still shows the disk at 100% full. Why did this happen according to Linux filesystem semantics, and how do you locate and release the disk space without restarting the server using `/proc` or `lsof`?
2. **Signals in Production:** What is the critical difference between `kill -15` (`SIGTERM`) and `kill -9` (`SIGKILL`)? Why should an SRE avoid using `kill -9` as a primary troubleshooting step?
3. **Execution Scheduling:** Compare running this script via standard `cron` vs a `systemd timer`. What advantages does a systemd timer provide for production observability?""",
    """You are a Senior SRE Mentor evaluating a junior engineer's Linux Fundamentals assignment.

Grading Rubric:
1. Script uses defensive flags, df parsing with filtering of tmpfs, threshold comparison.
2. Identifies open file descriptors holding deleted inodes via /proc/[PID]/fd or lsof.
3. Explains SIGTERM allows graceful cleanup whereas SIGKILL causes abrupt termination risking state corruption.
4. Explains systemd timer advantages (journalctl logging, monotonic timers).

OUTPUT FORMAT:
## Evaluation: [PASS or NEEDS REVISION]
### 🎯 Executive Summary
### 🔍 Technical Strengths
### ⚠️ Gaps & Edge Cases
### 💡 Socratic Hint & Question
### 🚀 Next Steps"""
)

# TOPIC 2: Networking Basics
add_lesson(
    "f1a00002-0001-4000-a000-000000000001",
    "2. Networking Basics — OSI, TCP/IP, DNS & HTTP/S",
    "phase-1", "Phase 1: Foundation (Months 1–3)",
    "p1-t2", "2. Networking Basics",
    "concept", 60,
    """# 2. Networking Basics: SRE Network Engineering

**Why:** Understanding how systems communicate is essential. When web services experience latency spikes or timeouts, an SRE must diagnose whether the problem is DNS resolution failure, TCP handshake delays, TLS negotiation, packet loss, or firewall drops.

---

## What to Learn

### 1. OSI & TCP/IP Model Basics
* **Layer 7 (Application):** HTTP/HTTPS, DNS, gRPC, SSH.
* **Layer 4 (Transport):** TCP vs UDP.
  * TCP: Reliable, ordered delivery, 3-way handshake (SYN, SYN-ACK, ACK), flow control, congestion window.
  * UDP: Unreliable, low-latency, connectionless (DNS queries, media streaming).
* **Layer 3 (Network):** IP addressing (IPv4 CIDR, IPv6), routing tables, ICMP (`ping`).
* **Layer 2 (Data Link):** MAC addresses, ARP resolution.

### 2. DNS (How Domain Names Work)
* Root servers (`.`) -> TLD servers (`.com`) -> Authoritative nameservers -> Recursive resolvers.
* Record Types: `A`, `AAAA`, `CNAME`, `MX`, `TXT`, `NS`, `PTR`, `SOA`.
* TTL (Time to Live) caching and propagation delay.
* Local resolver configuration: `/etc/resolv.conf`, `systemd-resolved`.

### 3. HTTP / HTTPS Protocols
* Methods: `GET`, `POST`, `PUT`, `DELETE`, `PATCH`, `HEAD`, `OPTIONS`.
* Status Codes: 2xx (Success), 3xx (Redirect), 4xx (Client error), 5xx (Server error).
* TLS Handshake: Certificate exchange, asymmetric key exchange (RSA/ECDH), symmetric session encryption (AES-GCM).

### 4. Ports and Sockets
* Standard Ports: 80 (HTTP), 443 (HTTPS), 22 (SSH), 53 (DNS), 3306 (MySQL), 5432 (Postgres), 6379 (Redis).
* Socket states: `LISTEN`, `SYN_SENT`, `ESTABLISHED`, `FIN_WAIT`, `TIME_WAIT`, `CLOSE_WAIT`.

### 5. Basic Troubleshooting Tools
* `ping` (ICMP connectivity and round-trip time)
* `traceroute` / `mtr` (Hop-by-hop latency and packet loss)
* `netstat` / `ss -tulpn` (Socket statistics and active listeners)
* `curl -v` (Detailed HTTP request headers and timings)
* `dig +trace domain.com` (Root-to-leaf DNS resolution hierarchy)
* `tcpdump` (Raw packet capture and protocol analysis)

### 6. Firewalls and Security Groups
* Host-based: `iptables`, `nftables`, `ufw`.
* Cloud: Security Groups (stateful) vs Network ACLs (stateless).
"""
)

add_lesson(
    "f1a00002-0002-4000-a000-000000000001",
    "2. Networking Basics — Recommended Resources",
    "phase-1", "Phase 1: Foundation (Months 1–3)",
    "p1-t2", "2. Networking Basics",
    "resource", 30,
    """# 2. Networking Basics: Authoritative Resources

The following resources are explicitly recommended by Santhosh Kumar Jampala's roadmap:

### 1. *"Computer Networking: A Top-Down Approach"* by Kurose & Ross
* **Target Chapters:** First 3 chapters:
  * **Chapter 1: Computer Networks and the Internet** (Network core, packet switching, delay, loss, throughput, protocol layers)
  * **Chapter 2: Application Layer** (Principles of network apps, Web and HTTP, DNS, socket programming)
  * **Chapter 3: Transport Layer** (Multiplexing/demultiplexing, UDP, reliable data transfer principles, TCP connection management, congestion control)

### 2. [Practical Networking YouTube Channel](https://www.youtube.com/@PracticalNetworking)
* **High-Value Playlists:**
  * Networking Fundamentals (Routing, Switching, Subnetting)
  * Packet Traveling Series (Visualizes packet structure hop-by-hop)
  * Address Resolution Protocol (ARP) & TCP Deep Dives
""",
    resource="https://www.youtube.com/@PracticalNetworking"
)

add_lesson(
    "f1a00002-0003-4000-a000-000000000001",
    "2. Networking Basics — Practice Projects & Exercises",
    "phase-1", "Phase 1: Foundation (Months 1–3)",
    "p1-t2", "2. Networking Basics",
    "practice", 60,
    """# 2. Networking Basics: Practice Projects

**Roadmap Requirements:**
1. Set up a simple web server and understand the request flow.
2. Use Wireshark or tcpdump to capture and analyze network traffic.

---

### Step-by-Step Lab Instructions

#### Exercise 1: Request Flow & Detailed Latency Breakdown
1. Install an Nginx web server: `sudo apt install nginx -y`
2. Create a curl timing format file `curl-format.txt`:
```text
    time_namelookup:  %{time_namelookup}s\\n
       time_connect:  %{time_connect}s\\n
    time_appconnect:  %{time_appconnect}s\\n
   time_pretransfer:  %{time_pretransfer}s\\n
 time_starttransfer:  %{time_starttransfer}s\\n
                    ----------\\n
         time_total:  %{time_total}s\\n
```
3. Run: `curl -w "@curl-format.txt" -o /dev/null -s https://example.com`
4. Document the exact difference between DNS lookup, TCP connect, TLS appconnect, and TTFB.

#### Exercise 2: Packet Capture Analysis with tcpdump & Wireshark
1. Run tcpdump: `sudo tcpdump -nn -i any port 80 -w /tmp/http.pcap`
2. In another shell: `curl http://localhost`
3. Stop capture (Ctrl+C) and inspect:
```bash
tcpdump -nn -r /tmp/http.pcap
```
4. Identify the TCP 3-way handshake:
   - Packet 1: Flags `[S]` (SYN) with sequence number `seq X`
   - Packet 2: Flags `[S.]` (SYN-ACK) with `seq Y, ack X+1`
   - Packet 3: Flags `[.]` (ACK) with `seq X+1, ack Y+1`
"""
)

add_task(
    "t1a00002-0001-4000-a000-000000000001",
    "Assignment 2: Network Packet Trace Analysis & DNS Triage Report",
    "phase-1", "Phase 1: Foundation (Months 1–3)",
    "p1-t2", "2. Networking Basics",
    """# Assignment 2: Network Packet Trace & DNS Triage Report

### Incident Scenario
At 14:02 UTC, an internal payment microservice started failing all outbound HTTPS calls to a third-party gateway (`api.payment-gateway.com`) with `504 Gateway Timeout` and sporadic `Connection Refused` errors. The application team claims "the cloud network is down." As the SRE, you must prove or disprove this hypothesis using network diagnostic tools.

---

### Tasks to Submit

#### 1. Diagnostic Command Pipeline
List the exact sequential CLI commands you would execute on the affected host to isolate the issue across Layer 3, Layer 4, and Layer 7 (e.g. `ping`, `mtr`, `dig`, `ss`, `curl -v`, `tcpdump`). Explain what each command proves.

#### 2. Analyzing a TCP Trace
Assume a `tcpdump` capture between the microservice and the gateway reveals repeated `SYN` packets sent by the client followed by no `SYN-ACK` from the server, ending in `ETIMEDOUT`. What layer is failing, and what are the two most likely infrastructure causes (e.g. Security Groups/Firewall vs Server port)?

#### 3. DNS Failure Resolution
If `dig api.payment-gateway.com` returns `SERVFAIL`, explain the diagnostic steps you take to trace the root cause back through `/etc/resolv.conf`, local caching resolvers (e.g. `systemd-resolved` or CoreDNS), and upstream authoritative nameservers.""",
    """You are a Senior SRE Mentor evaluating a junior engineer's Computer Networking assignment.

Grading Rubric:
1. Diagnostic steps cover DNS, Layer 3 (ping/traceroute), Layer 4 (ss/tcpdump), and Layer 7 (curl -v).
2. TCP trace explanation recognizes SYN without SYN-ACK indicates packet drop or firewall filtering.
3. DNS resolution analysis demonstrates clear understanding of resolv.conf, recursive resolver, and testing with 'dig +trace'.

OUTPUT FORMAT:
## Evaluation: [PASS or NEEDS REVISION]
### 🎯 Executive Summary
### 🔍 Technical Strengths
### ⚠️ Gaps & Edge Cases
### 💡 Socratic Hint & Question
### 🚀 Next Steps"""
)

# TOPIC 3: Basic Scripting (Bash)
add_lesson(
    "f1a00003-0001-4000-a000-000000000001",
    "3. Basic Scripting (Bash) — Automation Fundamentals",
    "phase-1", "Phase 1: Foundation (Months 1–3)",
    "p1-t3", "3. Basic Scripting (Bash)",
    "concept", 60,
    """# 3. Basic Scripting (Bash): SRE Automation

**Why:** Automation is core to SRE work. Repetitive manual tasks ("toil") create reliability hazards and consume engineering capacity. Bash is ubiquitous across every Linux machine, container, and cloud init boot sequence.

---

## What to Learn

### 1. Defensive Scripting Boilerplate
```bash
#!/usr/bin/env bash
set -euo pipefail
IFS=$'\\n\\t'
```
* `-e`: Exit immediately if any command returns a non-zero exit code.
* `-u`: Treat unset variables as an error and exit immediately.
* `-o pipefail`: Propagate errors inside pipeline commands instead of hiding them.

### 2. Variables and Data Types
* Quoting: Double quotes `"$var"` permit interpolation; single quotes `'$var'` treat text literally.
* Special variables: `$0` (script name), `$1..$9` (arguments), `$#` (arg count), `$@` (all args), `$?` (exit code of last command), `$$` (PID of script).

### 3. Conditionals & Loops
* Modern test syntax: `[[ ... ]]`.
* Numerical checks: `(( count > 10 ))` or `[[ "$count" -gt 10 ]]`.
* File tests: `[[ -f /path/file ]]`, `[[ -d /path/dir ]]`, `[[ -s /path/file ]]` (exists and non-empty).
* Loops: `for item in "${items[@]}"; do ...; done`, `while IFS= read -r line; do ...; done < file.txt`.

### 4. Functions & Variable Scoping
* Always use `local` variables inside functions to prevent polluting global scope:
```bash
log_alert() {
  local level="$1"
  local msg="$2"
  printf '[%s] [%s] %s\\n' "$(date -u +'%Y-%m-%dT%H:%M:%SZ')" "$level" "$msg" >&2
}
```

### 5. File I/O & Streams
* `stdin` (0), `stdout` (1), `stderr` (2).
* Redirecting stdout and stderr: `command > /var/log/app.log 2>&1`.

### 6. Error Handling & Traps
* Using `trap` for cleanup on script exit or interrupt (`EXIT`, `SIGINT`, `SIGTERM`):
```bash
cleanup() {
  local exit_code=$?
  rm -rf "$TMP_DIR"
  exit "$exit_code"
}
trap cleanup EXIT
```

### 7. Cron Jobs for Scheduling
* Cron syntax: `* * * * * command` (minute, hour, day of month, month, day of week).
* Modern alternative: Systemd Timers with journalctl integration.
"""
)

add_lesson(
    "f1a00003-0002-4000-a000-000000000001",
    "3. Basic Scripting (Bash) — Recommended Resources",
    "phase-1", "Phase 1: Foundation (Months 1–3)",
    "p1-t3", "3. Basic Scripting (Bash)",
    "resource", 30,
    """# 3. Basic Scripting (Bash): Authoritative Resources

The following resources are explicitly recommended by Santhosh Kumar Jampala's roadmap:

### 1. *"Bash Guide for Beginners"* by Machtelt Garrels
* Complete free guide: [tldp.org/LDP/Bash-Beginners-Guide/html/](https://tldp.org/LDP/Bash-Beginners-Guide/html/)
* Covers bash environment, variables, conditionals, loops, functions, and regular expressions.

### 2. [ShellCheck](https://www.shellcheck.net/)
* Static analysis tool for shell scripts that detects quoting pitfalls, syntax bugs, and subshell errors.
* CLI Usage: `shellcheck myscript.sh`
""",
    resource="https://www.shellcheck.net"
)

add_lesson(
    "f1a00003-0003-4000-a000-000000000001",
    "3. Basic Scripting (Bash) — Practice Projects & Exercises",
    "phase-1", "Phase 1: Foundation (Months 1–3)",
    "p1-t3", "3. Basic Scripting (Bash)",
    "practice", 60,
    """# 3. Basic Scripting (Bash): Practice Projects

**Roadmap Requirements:**
1. Write a script to back up files.
2. Create a system health monitoring script.
3. Automate log file rotation.

---

### Step-by-Step Lab Instructions

#### Project 1: Automated Timestamped Backup Script
Write `backup.sh` that:
1. Takes source and destination directories as arguments.
2. Archives with timestamp: `tar -czf "$DEST/backup-$(date +%Y%m%d_%H%M%S).tar.gz" -C "$SRC" .`
3. Verifies archive integrity (`tar -tzf`).
4. Enforces retention: removes backups older than 7 days (`find "$DEST" -name "*.tar.gz" -mtime +7 -delete`).

#### Project 2: System Health Monitor & Alerting Script
Write `sys_monitor.sh` that:
1. Checks CPU load average against CPU core count.
2. Checks RAM available percentage.
3. Checks disk usage on physical partitions.
4. Emits warnings to syslog via `logger -t sre_monitor`.

#### Project 3: Automated Log Rotation Script
Write `rotate_logs.sh` that:
1. Scans `/var/log/custom-app/*.log`.
2. For files > 100MB, moves them to `filename.YYYY-MM-DD.gz` and touches fresh file with original permissions.
3. Sends `SIGHUP` to the daemon so it reopens file handles.
"""
)

add_task(
    "t1a00003-0001-4000-a000-000000000001",
    "Assignment 3: Production Health Check CLI Tool with Timeout & SSL Expiry",
    "phase-1", "Phase 1: Foundation (Months 1–3)",
    "p1-t3", "3. Basic Scripting (Bash)",
    """# Assignment 3: Automated Backup, Health Check & Rotation Suite

### Objective
Write an automated Bash production utility suite that demonstrates professional automation practices:
1. **Automated Backup:** `backup_service.sh` that takes backup directories, archives with timestamp, checks tar integrity, and purges files older than 7 days.
2. **System Health Check:** `health_check.sh` monitoring load average, RAM, and disk, emitting warnings to syslog.
3. **Log Rotation Automation:** `rotate_logs.sh` that safely compresses logs > 100MB and sends `SIGHUP` to the running daemon without dropping open connections.

Explain how you implemented error handling (`set -euo pipefail`) and signal traps.""",
    """You are a Senior SRE Mentor evaluating a Bash Scripting automation assignment.

Grading Rubric:
1. Uses defensive Bash: set -euo pipefail, traps, and quote safety.
2. Validates backup integrity and implements retention purging.
3. Implements non-disruptive log rotation with SIGHUP.

OUTPUT FORMAT:
## Evaluation: [PASS or NEEDS REVISION]
### 🎯 Executive Summary
### 🔍 Technical Strengths
### ⚠️ Gaps & Edge Cases
### 💡 Socratic Hint & Question
### 🚀 Next Steps"""
)

# =============================================================================
# PHASE 2: CORE SKILLS (Months 4–6)
# =============================================================================

# TOPIC 4: Version Control (Git)
add_lesson(
    "f2a00004-0001-4000-a000-000000000001",
    "4. Version Control (Git) — Git Fundamentals & Collaboration",
    "phase-2", "Phase 2: Core Skills (Months 4–6)",
    "p2-t4", "4. Version Control (Git)",
    "concept", 60,
    """# 4. Version Control (Git): Collaboration & GitOps

**Why:** Essential for collaboration and Infrastructure as Code. In modern SRE organizations, infrastructure is defined as code stored in Git (GitOps). Every change, rollback, playbook, and Kubernetes manifest is managed via Git commits, pull requests, and peer reviews.

---

## What to Learn

### 1. Git Basics
* Commits, Staging (Index), Working Directory, and Git Repository.
* Core commands: `git init`, `git add`, `git commit -m`, `git push`, `git pull --rebase`.
* Inspection: `git log --oneline --graph`, `git diff`, `git status`.

### 2. Branching and Merging
* Branch creation: `git checkout -b feature/alerting` or `git switch -c feature/alerting`.
* Merging: Fast-forward vs 3-way merge commit (`git merge`).
* Rebasing: `git rebase main` (linear history).
* Conflict Resolution: Identifying conflicts (`<<<<<<<`, `=======`, `>>>>>>>`), resolving, and committing.

### 3. GitHub/GitLab Workflows
* Pull Request (PR) and Merge Request (MR) workflows.
* Code reviews, branch protection rules, requiring CI status checks.

### 4. Pull Requests and Code Reviews
* Authoring descriptive PRs: What changed, why, verification evidence, rollback instructions.

### 5. `.gitignore` and Best Practices
* Ignoring transient files and secrets (`.env`, `*.tfstate`, `*.pem`, `node_modules/`).
* Secret scrubbing: Eradicating committed secrets using `git filter-repo` or BFG Repo-Cleaner.
"""
)

add_lesson(
    "f2a00004-0002-4000-a000-000000000001",
    "4. Version Control (Git) — Recommended Resources",
    "phase-2", "Phase 2: Core Skills (Months 4–6)",
    "p2-t4", "4. Version Control (Git)",
    "resource", 30,
    """# 4. Version Control (Git): Authoritative Resources

The following resources are explicitly recommended by Santhosh Kumar Jampala's roadmap:

### 1. *Pro Git* Book by Scott Chacon & Ben Straub
* Free online book: [git-scm.com/book/en/v2](https://git-scm.com/book/en/v2).
* Covers Git Basics, Branching, Distributed Workflows, and Git Tools.

### 2. [Learn Git Branching](https://learngitbranching.js.org/)
* Interactive visual simulation tutorial for mastering branching, merging, cherry-picking, and interactive rebasing.
""",
    resource="https://learngitbranching.js.org"
)

add_lesson(
    "f2a00004-0003-4000-a000-000000000001",
    "4. Version Control (Git) — Practice Projects & Exercises",
    "phase-2", "Phase 2: Core Skills (Months 4–6)",
    "p2-t4", "4. Version Control (Git)",
    "practice", 60,
    """# 4. Version Control (Git): Practice Projects

**Roadmap Requirements:**
1. Create a GitHub account.
2. Version control your scripts.
3. Contribute to an open source project.

---

### Step-by-Step Lab Instructions

#### Exercise 1: Version Control Your Automation Toolbox
1. Initialize repository: `mkdir sre-toolbox && cd sre-toolbox && git init`
2. Add your Bash monitoring scripts, `.gitignore`, and a detailed `README.md`.
3. Push to GitHub using SSH authentication:
```bash
git remote add origin git@github.com:<your-user>/sre-toolbox.git
git branch -M main
git push -u origin main
```

#### Exercise 2: Branching, Conflict Resolution & Interactive Rebase
1. Create branch `feature/disk-check`, edit a script line.
2. Switch back to `main`, make a conflicting edit on the same line, and commit.
3. Merge `feature/disk-check` into `main`, resolve the conflict markers, test, and commit.
4. Practice interactive rebasing: `git rebase -i HEAD~3` to squash multiple commits into one.
"""
)

add_task(
    "t2a00004-0001-4000-a000-000000000001",
    "Assignment 4: Git Collaboration, Rebase & Secret Remediation Lab",
    "phase-2", "Phase 2: Core Skills (Months 4–6)",
    "p2-t4", "4. Version Control (Git)",
    """# Assignment 4: Git Collaboration & Emergency Secret Purge

### Production Scenario
An engineer accidentally committed an AWS IAM Access Key and Secret into the Git repository in commit `c89f2a1`, which was pushed to the remote repository. Simply committing a change that deletes the file does NOT remove the secret from Git history!

---

### Tasks to Submit
1. **Secret Remediation:** Detail the exact sequential steps and commands needed to permanently eradicate the secret from the entire commit history (using tools like `git filter-repo` or BFG) and force-push safely.
2. **Interactive Rebase:** Explain how to use `git rebase -i` to squash 4 messy "wip" commits into a single conventional commit before submitting a pull request.
3. **Merge vs Rebase:** Explain the trade-offs between a merge commit and a rebase strategy for infrastructure repositories.""",
    """You are a Senior SRE Mentor evaluating a Git Version Control assignment.

Grading Rubric:
1. Explains why git rm is insufficient and provides correct history-rewriting steps (git filter-repo/BFG) + credential revocation.
2. Explains git rebase -i workflow for squashing.
3. Articulates trade-offs between merge commits and linear rebase histories in GitOps repositories.

OUTPUT FORMAT:
## Evaluation: [PASS or NEEDS REVISION]
### 🎯 Executive Summary
### 🔍 Technical Strengths
### ⚠️ Gaps & Edge Cases
### 💡 Socratic Hint & Question
### 🚀 Next Steps"""
)

# TOPIC 5: Programming Fundamentals (Python)
add_lesson(
    "f2a00005-0001-4000-a000-000000000001",
    "5. Programming Fundamentals (Python) — Automation & APIs",
    "phase-2", "Phase 2: Core Skills (Months 4–6)",
    "p2-t5", "5. Programming Fundamentals (Python)",
    "concept", 60,
    """# 5. Programming Fundamentals (Python): SRE Automation

**Why:** Python is the most common language for SRE automation, cloud SDKs (Boto3), and data parsing. When shell scripts become complex, Python offers robust data structures, structured logging, testing frameworks, and maintainable API clients.

---

## What to Learn

### 1. Variables, Data Types, and Structures
* Primitives: `int`, `float`, `str`, `bool`.
* Collections: Lists (dynamic arrays), Tuples (immutable), Dictionaries (hash maps for JSON data), Sets (unique elements).
* List and dictionary comprehensions.

### 2. Functions and Modules
* Function definitions, type hints, variable arguments (`*args`, `**kwargs`).
* Modularizing scripts into packages.

### 3. File I/O Operations
* Context managers (`with open(...) as f:`) ensuring clean file descriptor teardown.
* Streaming file processing for gigabyte-scale logs.

### 4. Working with APIs (`requests` library)
* HTTP requests (`requests.get`, `requests.post`).
* **SRE Defensive Rule:** Always specify explicit network timeouts: `requests.get(url, timeout=5.0)`.
* JSON serialization and parsing (`response.json()`).

### 5. Error Handling and Logging
* Exception handling: `try ... except requests.RequestException as exc:`.
* Structured logging with the standard `logging` library (timestamps, log levels).

### 6. Regular Expressions (`re` module)
* Extracting IP addresses, error codes, and latency figures from unstructured logs.

### 7. Virtual Environments
* Environment isolation: `python3 -m venv venv && source venv/bin/activate`.
* Package manifests: `requirements.txt` / `pyproject.toml`.
"""
)

add_lesson(
    "f2a00005-0002-4000-a000-000000000001",
    "5. Programming Fundamentals (Python) — Recommended Resources",
    "phase-2", "Phase 2: Core Skills (Months 4–6)",
    "p2-t5", "5. Programming Fundamentals (Python)",
    "resource", 30,
    """# 5. Programming Fundamentals (Python): Authoritative Resources

The following resources are explicitly recommended by Santhosh Kumar Jampala's roadmap:

### 1. *"Automate the Boring Stuff with Python"* by Al Sweigart
* Free complete online book: [automatetheboringstuff.com](https://automatetheboringstuff.com).
* Practical automation chapters: Files, Web Scraping, APIs, and Debugging.

### 2. [Real Python Tutorials](https://realpython.com/)
* In-depth guides on Python Virtual Environments, Requests library, and Structured Logging.

### 3. *"Python Crash Course"* by Eric Matthes
* Hands-on, project-based introduction to modern Python.
""",
    resource="https://automatetheboringstuff.com"
)

add_lesson(
    "f2a00005-0003-4000-a000-000000000001",
    "5. Programming Fundamentals (Python) — Practice Projects & Exercises",
    "phase-2", "Phase 2: Core Skills (Months 4–6)",
    "p2-t5", "5. Programming Fundamentals (Python)",
    "practice", 60,
    """# 5. Programming Fundamentals (Python): Practice Projects

**Roadmap Requirements:**
1. Build a log parser.
2. Create a simple API client.
3. Automate a repetitive task from your daily work.

---

### Step-by-Step Lab Instructions

#### Project 1: Streaming Nginx Access Log Parser
Write `log_parser.py` that:
1. Streams an access log file line by line without loading the whole file into RAM.
2. Uses regex to extract IP, timestamp, method, endpoint, status code, and latency.
3. Computes: Total requests, 4xx/5xx error percentages, and top 5 requested endpoints.
4. Outputs the analysis as pretty JSON.

#### Project 2: Service Health API Client
Write `api_health.py` that:
1. Queries public status APIs (e.g. GitHub Status API `https://www.githubstatus.com/api/v2/status.json`).
2. Validates latency and status with proper timeout handling.
3. Returns exit code 0 if operational, 1 if degraded or down.
"""
)

add_task(
    "t2a00005-0001-4000-a000-000000000001",
    "Assignment 5: Production Python HTTP Health Checker with TLS Expiry",
    "phase-2", "Phase 2: Core Skills (Months 4–6)",
    "p2-t5", "5. Programming Fundamentals (Python)",
    """# Assignment 5: Production Python HTTP & TLS Health Checker

### Objective
Write a production-ready Python CLI tool named `sre_healthcheck.py` that monitors HTTP/HTTPS endpoints and validates availability, latency, and TLS certificate expiration.

---

### Requirements
1. Accept URLs via CLI argument (`--url`) or config file.
2. Inspect HTTP status code, total response time in ms, and catch timeouts without crashing.
3. Extract TLS certificate expiration timestamp using Python `ssl`/`socket` libraries and calculate days remaining.
4. Support `--format json` and `--format text`.
5. Return exit code 0 if all targets healthy and TLS cert > 14 days valid; exit code 1 otherwise.""",
    """You are a Senior SRE Mentor evaluating a Python automation assignment.

Grading Rubric:
1. Pythonic code with functions/classes and exception handling.
2. Outbound requests have explicit timeouts.
3. Inspects TLS certificate expiration safely without verify=False.
4. Supports JSON output and appropriate exit codes.

OUTPUT FORMAT:
## Evaluation: [PASS or NEEDS REVISION]
### 🎯 Executive Summary
### 🔍 Technical Strengths
### ⚠️ Gaps & Edge Cases
### 💡 Socratic Hint & Question
### 🚀 Next Steps"""
)

# TOPIC 6: Databases Basics
add_lesson(
    "f2a00006-0001-4000-a000-000000000001",
    "6. Databases Basics — SQL, PostgreSQL/MySQL & Admin",
    "phase-2", "Phase 2: Core Skills (Months 4–6)",
    "p2-t6", "6. Databases Basics",
    "concept", 60,
    """# 6. Databases Basics: Reliability & Administration

**Why:** Most applications rely on databases. In production, database exhaustion (connection pool exhaustion, lock contention, slow queries, disk fullness) is one of the most common causes of high-severity incidents. SREs must know how databases function, how to take backups, and how to triage queries.

---

## What to Learn

### 1. SQL Fundamentals
* DDL: `CREATE TABLE`, `ALTER TABLE`, `DROP TABLE`.
* DML: `SELECT`, `INSERT`, `UPDATE`, `DELETE`.
* Filtering, grouping, and joins: `WHERE`, `GROUP BY`, `HAVING`, `ORDER BY`, `INNER JOIN`, `LEFT JOIN`.
* Aggregations: `COUNT()`, `AVG()`, `SUM()`, `MAX()`, `MIN()`.

### 2. Database Concepts
* **ACID Properties:** Atomicity, Consistency, Isolation, Durability.
* **Indexes:** B-Tree indexes, compound indexes, index cardinality, avoiding full table scans.
* **Relationships:** Primary Keys, Foreign Keys, One-to-Many, Many-to-Many.

### 3. Basic PostgreSQL or MySQL Administration
* Starting/stopping services with `systemctl`.
* Configuration tuning: `max_connections`, `shared_buffers`, `work_mem`.
* Connection pooling: Why applications need poolers (PgBouncer) to avoid per-connection process overhead.

### 4. Backup and Restore Procedures
* Logical backups: `pg_dump`, `mysqldump`.
* Physical backups & WAL archiving (Write-Ahead Logging) for Point-In-Time Recovery (PITR).
* Testing restoration regularly.

### 5. Performance Monitoring Basics
* Inspecting active queries: `pg_stat_activity` or `SHOW PROCESSLIST`.
* Query execution plans: `EXPLAIN ANALYZE <query>`.
"""
)

add_lesson(
    "f2a00006-0002-4000-a000-000000000001",
    "6. Databases Basics — Recommended Resources",
    "phase-2", "Phase 2: Core Skills (Months 4–6)",
    "p2-t6", "6. Databases Basics",
    "resource", 30,
    """# 6. Databases Basics: Authoritative Resources

The following resources are explicitly recommended by Santhosh Kumar Jampala's roadmap:

### 1. [SQLBolt](https://sqlbolt.com/)
* Interactive, browser-based SQL tutorial covering queries, constraints, table operations, aggregations, and subqueries.

### 2. [PostgreSQL Tutorial](https://www.postgresqltutorial.com/)
* In-depth reference for PostgreSQL administration, indexes, backup/restore with `pg_dump`, and concurrency.
""",
    resource="https://sqlbolt.com"
)

add_lesson(
    "f2a00006-0003-4000-a000-000000000001",
    "6. Databases Basics — Practice Projects & Exercises",
    "phase-2", "Phase 2: Core Skills (Months 4–6)",
    "p2-t6", "6. Databases Basics",
    "practice", 60,
    """# 6. Databases Basics: Practice Projects

**Roadmap Requirements:**
1. Set up a database server.
2. Create a simple database schema.
3. Write queries to analyze data.

---

### Step-by-Step Lab Instructions

#### Exercise 1: PostgreSQL Setup & Schema Creation
1. Run PostgreSQL locally or via Docker:
```bash
docker run -d --name sre-postgres -e POSTGRES_PASSWORD=postgres -p 5432:5432 postgres:15
```
2. Connect with `psql` and create an incident tracking schema:
```sql
CREATE TABLE services (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    tier VARCHAR(20) NOT NULL
);

CREATE TABLE incidents (
    id SERIAL PRIMARY KEY,
    service_id INTEGER REFERENCES services(id),
    title VARCHAR(255) NOT NULL,
    severity VARCHAR(10) NOT NULL,
    duration_minutes INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### Exercise 2: Analytical Queries & Automated Backup
1. Insert sample incident records across Tier-1 and Tier-2 services.
2. Write analytical queries calculating total downtime minutes per service and average incident duration by severity.
3. Write a shell script `db_backup.sh` that runs `pg_dump`, compresses with gzip, and verifies the backup archive.
"""
)

add_task(
    "t2a00006-0001-4000-a000-000000000001",
    "Assignment 6: Database Slow Query Triage & Backup Recovery Runbook",
    "phase-2", "Phase 2: Core Skills (Months 4–6)",
    "p2-t6", "6. Databases Basics",
    """# Assignment 6: Database Triage & Backup Recovery Runbook

### Scenario
Your Postgres database CPU spiked to 100%, causing connection pool starvation. You suspect an unindexed query on a table with 10 million records.

---

### Tasks to Submit
1. **Query Diagnostics:** Write the SQL query to inspect running queries in `pg_stat_activity` and find queries running longer than 30 seconds. Explain how to cancel a runaway query gracefully (`pg_cancel_backend`) vs forcefully (`pg_terminate_backend`).
2. **Execution Plan:** Explain the difference between `Seq Scan` and `Index Scan` in an `EXPLAIN ANALYZE` output.
3. **Backup Strategy:** Provide a shell script that performs an automated `pg_dump` backup, validates the backup file size, and outlines the step-by-step restoration verification process.""",
    """You are a Senior SRE Mentor evaluating a Database Administration assignment.

Grading Rubric:
1. Uses pg_stat_activity with state != 'idle' and query duration filtering.
2. Explains pg_cancel_backend vs pg_terminate_backend.
3. Explains Seq Scan vs Index Scan performance implications.
4. Provides robust backup and recovery validation procedure.

OUTPUT FORMAT:
## Evaluation: [PASS or NEEDS REVISION]
### 🎯 Executive Summary
### 🔍 Technical Strengths
### ⚠️ Gaps & Edge Cases
### 💡 Socratic Hint & Question
### 🚀 Next Steps"""
)

# TOPIC 7: Containerization (Docker)
add_lesson(
    "f2a00007-0001-4000-a000-000000000001",
    "7. Containerization (Docker) — Container Architecture & Compose",
    "phase-2", "Phase 2: Core Skills (Months 4–6)",
    "p2-t7", "7. Containerization (Docker)",
    "concept", 60,
    """# 7. Containerization (Docker): Modern SRE Packaging

**Why:** Containers are the standard for modern application deployment. They provide immutable, reproducible deployment artifacts across local development, CI/CD pipelines, and Kubernetes clusters.

---

## What to Learn

### 1. Container Concepts vs VMs
* **VMs:** Run a guest OS with hypervisor emulation.
* **Containers:** Share the host Linux kernel. Isolation achieved via:
  * **Namespaces:** Process tree (PID), networking (NET), mount points (MNT), IPC, UTS, User IDs.
  * **cgroups (Control Groups):** Enforcing hard CPU, memory, and I/O resource limits.
  * **OverlayFS:** Layered copy-on-write filesystem.

### 2. Docker Basics
* Images, containers, volumes, networks.
* Commands: `docker build`, `docker run`, `docker ps`, `docker logs -f`, `docker exec -it`, `docker stop`.

### 3. Dockerfile Creation Best Practices
* Multi-stage builds to minimize image attack surface and size.
* Non-root user execution (`USER appuser`).
* Explicit `HEALTHCHECK` definitions.

### 4. Docker Compose for Multi-Container Apps
* Declarative multi-container orchestration (`docker-compose.yml`).
* Defining services, networks, volumes, and health dependencies.

### 5. Container Networking & Registries
* Bridge networks, host networking, port mappings (`-p 8080:80`).
* Pushing and tagging images on Docker Hub / GitHub Container Registry (GHCR).
"""
)

add_lesson(
    "f2a00007-0002-4000-a000-000000000001",
    "7. Containerization (Docker) — Recommended Resources",
    "phase-2", "Phase 2: Core Skills (Months 4–6)",
    "p2-t7", "7. Containerization (Docker)",
    "resource", 30,
    """# 7. Containerization (Docker): Authoritative Resources

The following resources are explicitly recommended by Santhosh Kumar Jampala's roadmap:

### 1. Docker Official Documentation
* [docs.docker.com/get-started/](https://docs.docker.com/get-started/)
* Reference for Dockerfiles, Compose specs, and container networking.

### 2. *"Learn Docker in a Month of Lunches"* by Elton Stoneman
* Hands-on guide covering multi-stage builds, compose, and security.

### 3. [Play with Docker](https://labs.play-with-docker.com/)
* Free interactive browser-based Docker playground for testing multi-container architectures.
""",
    resource="https://labs.play-with-docker.com"
)

add_lesson(
    "f2a00007-0003-4000-a000-000000000001",
    "7. Containerization (Docker) — Practice Projects & Exercises",
    "phase-2", "Phase 2: Core Skills (Months 4–6)",
    "p2-t7", "7. Containerization (Docker)",
    "practice", 60,
    """# 7. Containerization (Docker): Practice Projects

**Roadmap Requirements:**
1. Containerize a simple web application.
2. Create a multi-tier application with Docker Compose.
3. Build and push images to Docker Hub.

---

### Step-by-Step Lab Instructions

#### Exercise 1: Multi-Stage Hardened Dockerfile
Write a hardened multi-stage `Dockerfile`:
```dockerfile
# Build stage
FROM python:3.11-slim AS builder
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir --user -r requirements.txt

# Final runtime stage
FROM python:3.11-slim
WORKDIR /app
RUN addgroup --system appgroup && adduser --system --group appuser
COPY --from=builder /root/.local /home/appuser/.local
COPY . .
ENV PATH=/home/appuser/.local/bin:$PATH
USER appuser
EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=3s CMD curl -f http://localhost:8080/health || exit 1
CMD ["python", "app.py"]
```

#### Exercise 2: Multi-Tier Compose Architecture
Create a `docker-compose.yml` running:
1. Web service
2. Redis cache
3. PostgreSQL database with persistent volume
4. Nginx reverse proxy
5. Build and push your image to Docker Hub or GHCR.
"""
)

add_task(
    "t2a00007-0001-4000-a000-000000000001",
    "Assignment 7: Hardened Multi-Stage Container & Compose Stack",
    "phase-2", "Phase 2: Core Skills (Months 4–6)",
    "p2-t7", "7. Containerization (Docker)",
    """# Assignment 7: Hardened Multi-Stage Container & Compose Stack

### Objective
Create a secure, production-grade Docker deployment for a multi-tier web service consisting of an application, a Redis cache, and an Nginx reverse proxy.

---

### Deliverables
1. **Hardened Dockerfile:** Multi-stage build, non-root user execution, explicit `HEALTHCHECK`, minimal base image (< 100MB final size).
2. **Docker Compose File:** Defines the web app, Redis, and Nginx with explicit resource constraints (CPU/memory limits via `deploy.resources.limits`), health check dependencies (`depends_on.condition: service_healthy`), and custom bridge network.
3. **Security Analysis:** Explain why running containers as root is dangerous, and how Linux namespaces and cgroups isolate this workload.""",
    """You are a Senior SRE Mentor evaluating a Docker Containerization assignment.

Grading Rubric:
1. Dockerfile demonstrates multi-stage build, non-root user, and HEALTHCHECK.
2. Compose file includes resource limits, health check conditions, and isolated networking.
3. Explains security implications of root container execution and namespace isolation.

OUTPUT FORMAT:
## Evaluation: [PASS or NEEDS REVISION]
### 🎯 Executive Summary
### 🔍 Technical Strengths
### ⚠️ Gaps & Edge Cases
### 💡 Socratic Hint & Question
### 🚀 Next Steps"""
)

# =============================================================================
# PHASE 3: INFRASTRUCTURE & CLOUD (Months 7–9)
# =============================================================================

# TOPIC 8: Cloud Platforms (AWS example)
add_lesson(
    "f3a00008-0001-4000-a000-000000000001",
    "8. Cloud Platforms (AWS) — Architecture, Networking & IAM",
    "phase-3", "Phase 3: Infrastructure & Cloud (Months 7–9)",
    "p3-t8", "8. Cloud Platforms (AWS)",
    "concept", 60,
    """# 8. Cloud Platforms (AWS): Cloud Infrastructure for SREs

**Why:** Most infrastructure is now cloud-based. SREs must understand cloud networking, elasticity, IAM security boundaries, compute models, and storage redundancy.

---

## What to Learn (AWS Example)

### 1. Core Services: EC2, S3, VPC, IAM
* **EC2:** Instance types, AMIs, EBS block storage, User Data bootstrap scripts.
* **S3:** Object storage buckets, storage tiers, bucket policies, lifecycle rules.
* **IAM:** Users, Groups, Roles, Policies (Least Privilege), Instance Profiles.

### 2. Load Balancers and Auto-Scaling
* **Application Load Balancers (ALB):** Layer 7 path-based routing, health checks, TLS termination.
* **Auto Scaling Groups (ASG):** Dynamic scale-out and scale-in policies based on CPU / target request count.

### 3. Cloud Networking Concepts
* Virtual Private Cloud (VPC) with public and private subnets across multi-Availability Zones.
* Internet Gateways (IGW), NAT Gateways, Route Tables.
* Security Groups (stateful) vs Network ACLs (stateless).

### 4. Cost Management and Billing
* AWS Free Tier tracking, Billing Alarms, AWS Budgets.

### 5. Security Best Practices
* No root user API keys, enforcing MFA, encrypting EBS and S3 at rest.

### 6. CLI and SDK Usage
* AWS CLI (`aws ec2 describe-instances`, `aws s3 cp`).
* AWS SDKs (Boto3 in Python).
"""
)

add_lesson(
    "f3a00008-0002-4000-a000-000000000001",
    "8. Cloud Platforms (AWS) — Recommended Resources",
    "phase-3", "Phase 3: Infrastructure & Cloud (Months 7–9)",
    "p3-t8", "8. Cloud Platforms (AWS)",
    "resource", 30,
    """# 8. Cloud Platforms: Authoritative Resources

The following resources are explicitly recommended by Santhosh Kumar Jampala's roadmap:

### 1. AWS Free Tier Account
* [aws.amazon.com/free/](https://aws.amazon.com/free/)
* 12 months free tier with EC2 (`t2.micro`/`t3.micro`), S3 (5GB), RDS, and CloudWatch.

### 2. AWS Certified Solutions Architect Associate Path
* Industry standard certification path covering resilient, secure, high-performing cloud architectures.

### 3. A Cloud Guru / Linux Academy / Adrian Cantrill
* Comprehensive video courses with hands-on labs and architectural diagrams.
""",
    resource="https://aws.amazon.com/free/"
)

add_lesson(
    "f3a00008-0003-4000-a000-000000000001",
    "8. Cloud Platforms (AWS) — Practice Projects & Exercises",
    "phase-3", "Phase 3: Infrastructure & Cloud (Months 7–9)",
    "p3-t8", "8. Cloud Platforms (AWS)",
    "practice", 60,
    """# 8. Cloud Platforms: Practice Projects

**Roadmap Requirements:**
1. Deploy a web application on EC2.
2. Set up a VPC with public/private subnets.
3. Implement auto-scaling based on load.

---

### Step-by-Step Lab Instructions

#### Exercise 1: Multi-AZ VPC Architecture
1. In AWS Console or CLI, provision a VPC with CIDR `10.0.0.0/16`.
2. Create two Public Subnets across two AZs (`us-east-1a`, `us-east-1b`).
3. Create two Private Subnets across the same AZs.
4. Attach an Internet Gateway and provision a NAT Gateway in a public subnet.

#### Exercise 2: Application Load Balancer & Auto-Scaling
1. Deploy an EC2 instance in a private subnet running a sample web application.
2. Configure an Application Load Balancer in public subnets with health checks targeting `/health`.
3. Create an Auto Scaling Group with a minimum size of 2 and maximum of 4.
4. Test failover: Manually terminate an instance and verify automatic replacement.
"""
)

add_task(
    "t3a00008-0001-4000-a000-000000000001",
    "Assignment 8: Multi-AZ Cloud Architecture & Disaster Recovery Plan",
    "phase-3", "Phase 3: Infrastructure & Cloud (Months 7–9)",
    "p3-t8", "8. Cloud Platforms (AWS)",
    """# Assignment 8: Multi-AZ Cloud Infrastructure Blueprint

### Objective
Design a highly available, fault-tolerant cloud architecture on AWS for a web application serving 10,000 requests per minute with strict 99.9% uptime requirement.

---

### Deliverables
1. **Network Topology:** Detailed CIDR allocation plan across 2 Availability Zones with public and private subnets, Internet Gateways, NAT Gateways, and Route Tables.
2. **Security & IAM:** Least-privilege IAM policies, Security Group rules (restricting database port 5432 strictly to application security group), and encrypted S3 bucket policy.
3. **Failure Mode Analysis:** Describe what happens when AZ-1 suffers a total power failure. How do the ALB, Auto Scaling Group, and Multi-AZ database maintain service availability?""",
    """You are a Senior SRE Mentor evaluating a Cloud Architecture assignment.

Grading Rubric:
1. Clean VPC subnet CIDR design with public and private separation across multi-AZ.
2. Strict security groups preventing direct public database access.
3. Clear failure mode analysis of AZ failover behavior.

OUTPUT FORMAT:
## Evaluation: [PASS or NEEDS REVISION]
### 🎯 Executive Summary
### 🔍 Technical Strengths
### ⚠️ Gaps & Edge Cases
### 💡 Socratic Hint & Question
### 🚀 Next Steps"""
)

# TOPIC 9: Configuration Management (Ansible)
add_lesson(
    "f3a00009-0001-4000-a000-000000000001",
    "9. Configuration Management (Ansible) — Playbooks & Roles",
    "phase-3", "Phase 3: Infrastructure & Cloud (Months 7–9)",
    "p3-t9", "9. Configuration Management (Ansible)",
    "concept", 60,
    """# 9. Configuration Management (Ansible): Scalable Automation

**Why:** Manage infrastructure at scale consistently. Manually configuring servers via SSH leads to configuration drift, unreproducible environments, and human errors. Configuration management tools enforce desired state consistently.

---

## What to Learn

### 1. Infrastructure as Code Concepts & Idempotency
* **Idempotency:** Executing a playbook once or multiple times produces the exact same state without unintended side effects.
* **Agentless Architecture:** Ansible operates over standard SSH and Python.

### 2. Ansible Basics: Playbooks, Roles, Inventory
* **Inventories:** INI or YAML host lists (`[webservers]`, `[dbservers]`).
* **Playbooks:** Ordered task lists mapped to hosts.
* **Roles:** Reusable directory structures (`tasks/`, `handlers/`, `templates/`, `vars/`, `defaults/`).

### 3. YAML Syntax
* Strict indentation, key-value mappings, lists, multi-line strings (`|` and `>`).

### 4. Ansible Modules
* Package managers: `ansible.builtin.apt`, `ansible.builtin.yum`.
* Files & Templates: `ansible.builtin.template` (Jinja2), `ansible.builtin.copy`.
* Services: `ansible.builtin.systemd`.
* Users & Security: `ansible.builtin.user`, `ansible.builtin.group`.

### 5. Best Practices & Organization
* Handlers: Restarting services only when configuration files actually change (`notify: restart nginx`).
* Variables and secrets (`ansible-vault`).
"""
)

add_lesson(
    "f3a00009-0002-4000-a000-000000000001",
    "9. Configuration Management (Ansible) — Recommended Resources",
    "phase-3", "Phase 3: Infrastructure & Cloud (Months 7–9)",
    "p3-t9", "9. Configuration Management (Ansible)",
    "resource", 30,
    """# 9. Configuration Management (Ansible): Authoritative Resources

The following resources are explicitly recommended by Santhosh Kumar Jampala's roadmap:

### 1. Ansible Official Documentation
* [docs.ansible.com](https://docs.ansible.com)
* User Guide, Modules Index, and Best Practices.

### 2. *"Ansible for DevOps"* by Jeff Geerling
* [ansiblefordevops.com](https://www.ansiblefordevops.com/)
* The definitive guide to server automation, orchestration, and continuous testing with Ansible.
""",
    resource="https://docs.ansible.com"
)

add_lesson(
    "f3a00009-0003-4000-a000-000000000001",
    "9. Configuration Management (Ansible) — Practice Projects & Exercises",
    "phase-3", "Phase 3: Infrastructure & Cloud (Months 7–9)",
    "p3-t9", "9. Configuration Management (Ansible)",
    "practice", 60,
    """# 9. Configuration Management (Ansible): Practice Projects

**Roadmap Requirements:**
1. Write playbooks to configure servers.
2. Automate application deployment.
3. Create reusable roles.

---

### Step-by-Step Lab Instructions

#### Exercise 1: Server Hardening & Nginx Provisioning Playbook
Write an idempotent playbook `site.yml`:
```yaml
---
- name: Hardened Web Server Setup
  hosts: webservers
  become: true
  tasks:
    - name: Ensure security packages installed
      ansible.builtin.apt:
        name: [ufw, fail2ban, curl, htop]
        state: present
        update_cache: true

    - name: Deploy hardened Nginx configuration
      ansible.builtin.template:
        src: templates/nginx.conf.j2
        dest: /etc/nginx/nginx.conf
        mode: '0644'
      notify: Reload Nginx

  handlers:
    - name: Reload Nginx
      ansible.builtin.systemd:
        name: nginx
        state: reloaded
```

#### Exercise 2: Building a Reusable Monitoring Role
Create an Ansible role `roles/node_exporter` that downloads Prometheus `node_exporter`, sets up a dedicated systemd service, and verifies status.
"""
)

add_task(
    "t3a00009-0001-4000-a000-000000000001",
    "Assignment 9: Idempotent Ansible Role for Infrastructure Provisioning",
    "phase-3", "Phase 3: Infrastructure & Cloud (Months 7–9)",
    "p3-t9", "9. Configuration Management (Ansible)",
    """# Assignment 9: Idempotent Ansible Role for Telemetry Provisioning

### Objective
Author an Ansible role named `node_exporter` that automatically provisions and manages the Prometheus node_exporter binary across Linux servers.

---

### Deliverables
1. **Role Structure:** Complete `tasks/main.yml`, `handlers/main.yml`, `templates/node_exporter.service.j2`, and `defaults/main.yml`.
2. **Idempotency Guarantee:** Explain how your tasks ensure idempotency (e.g. not re-downloading if binary already exists, triggering systemd reload only when template changes).
3. **Execution Verification:** Show the `ansible-playbook` run output proving 0 failed and 0 changed on second execution.""",
    """You are a Senior SRE Mentor evaluating an Ansible Configuration Management assignment.

Grading Rubric:
1. Follows standard role layout with tasks, handlers, and templates.
2. Implements handlers for service reloads.
3. Ensures idempotency across repeated executions.

OUTPUT FORMAT:
## Evaluation: [PASS or NEEDS REVISION]
### 🎯 Executive Summary
### 🔍 Technical Strengths
### ⚠️ Gaps & Edge Cases
### 💡 Socratic Hint & Question
### 🚀 Next Steps"""
)

# =============================================================================
# PHASE 4: ADVANCED SRE CONCEPTS (Months 10–12)
# =============================================================================

# TOPIC 10: Monitoring & Observability
add_lesson(
    "f4a00010-0001-4000-a000-000000000001",
    "10. Monitoring & Observability — Metrics, Prometheus, Grafana & SLOs",
    "phase-4", "Phase 4: Advanced SRE Concepts (Months 10–12)",
    "p4-t10", "10. Monitoring & Observability",
    "concept", 60,
    """# 10. Monitoring & Observability: The Core of SRE

**Why:** *"You can't improve what you can't measure."* Observability provides visibility into internal system health based on external telemetry. Without real-time telemetry, SREs cannot detect regressions, verify deployments, or troubleshoot production incidents.

---

## What to Learn

### 1. Metrics, Logs, and Traces (The Three Pillars)
* **Metrics:** Numeric time-series data (Counters, Gauges, Histograms).
* **Logs:** Structured, timestamped event records (JSON logging).
* **Traces:** Distributed spans capturing request propagation across microservices.

### 2. Prometheus for Metrics Collection
* Pull model: Scraping `/metrics` endpoints.
* PromQL (Prometheus Query Language):
  * Request rate: `rate(http_requests_total[5m])`
  * P99 Latency: `histogram_quantile(0.99, sum(rate(http_request_duration_seconds_bucket[5m])) by (le))`
  * Error rate: `sum(rate(http_requests_total{status=~"5.."}[5m])) / sum(rate(http_requests_total[5m])) * 100`

### 3. Grafana for Visualization
* Building operational dashboards, defining template variables, and panel visualization.

### 4. ELK Stack (Elasticsearch, Logstash, Kibana) or Loki
* Centralized log aggregation, querying logs by label and regex.

### 5. Alerting Strategies
* Alertmanager routing, grouping, silencing, and inhibiting redundant alerts.
* Google SRE's Four Golden Signals: **Latency, Traffic, Errors, Saturation**.

### 6. SLIs, SLOs, and SLAs
* **SLI (Service Level Indicator):** Quantitative measurement of service level (e.g. % successful requests).
* **SLO (Service Level Objective):** Target agreed by SRE and Product (e.g. 99.9% over rolling 30 days).
* **SLA (Service Level Agreement):** Legal/commercial commitment with financial consequences.

### 7. Error Budgets
* Permitted unreliability: `100% - SLO`.
* Multi-window multi-burn-rate alerting to detect rapid budget burn.
"""
)

add_lesson(
    "f4a00010-0002-4000-a000-000000000001",
    "10. Monitoring & Observability — Recommended Resources",
    "phase-4", "Phase 4: Advanced SRE Concepts (Months 10–12)",
    "p4-t10", "10. Monitoring & Observability",
    "resource", 30,
    """# 10. Monitoring & Observability: Authoritative Resources

The following resources are explicitly recommended by Santhosh Kumar Jampala's roadmap:

### 1. *"The Art of Monitoring"* by James Turnbull
* Comprehensive architectural guide to modern telemetry, collection pipelines, and alerting.

### 2. Prometheus & Grafana Official Documentation
* [prometheus.io/docs/](https://prometheus.io/docs/)
* [grafana.com/docs/](https://grafana.com/docs/)

### 3. Google's SRE Books (Free Online)
* [sre.google/books/](https://sre.google/books/)
* Chapters on Monitoring Distributed Systems, Being On-Call, and Service Level Objectives.
""",
    resource="https://sre.google/books/"
)

add_lesson(
    "f4a00010-0003-4000-a000-000000000001",
    "10. Monitoring & Observability — Practice Projects & Exercises",
    "phase-4", "Phase 4: Advanced SRE Concepts (Months 10–12)",
    "p4-t10", "10. Monitoring & Observability",
    "practice", 60,
    """# 10. Monitoring & Observability: Practice Projects

**Roadmap Requirements:**
1. Set up Prometheus and Grafana.
2. Create dashboards for your applications.
3. Implement alerting rules.
4. Define SLOs for a service.

---

### Step-by-Step Lab Instructions

#### Exercise 1: Prometheus & Grafana Stack Deployment
1. Deploy Prometheus, Grafana, and `node_exporter` via Docker Compose.
2. Build a Grafana dashboard visualizing the Four Golden Signals.

#### Exercise 2: Implementing SLOs & Burn Rate Alerts
1. Define a 99.5% availability SLO for your application.
2. Configure multi-window burn rate alerts in Prometheus to detect rapid error budget depletion.
"""
)

add_task(
    "t4a00010-0001-4000-a000-000000000001",
    "Assignment 10: Prometheus Alerting Ruleset & SLO Error Budget Policy",
    "phase-4", "Phase 4: Advanced SRE Concepts (Months 10–12)",
    "p4-t10", "10. Monitoring & Observability",
    """# Assignment 10: Prometheus Alerting & SLO Error Budget Policy

### Objective
Define an enterprise-grade monitoring, alerting, and error budget policy for a mission-critical checkout service.

---

### Deliverables
1. **SLO Specification:** Define SLI and SLO targets (e.g. 99.9% of requests return HTTP 2xx/3xx in < 250ms over rolling 30-day window). Calculate the exact monthly error budget in minutes.
2. **Prometheus Alerting Rules:** Provide production YAML alerting rules including:
   - High Error Rate (5xx > 1% over 5m)
   - Multi-window Error Budget Burn Rate alert (14.4x burn rate over 1h)
   - High Latency P99 alert using `histogram_quantile`
3. **Error Budget Policy:** Write a clear policy establishing what actions engineering takes when 50%, 75%, and 100% of the monthly error budget is burned.""",
    """You are a Senior SRE Mentor evaluating a Monitoring & Observability assignment.

Grading Rubric:
1. Clearly defines SLI and mathematically calculates 30-day error budget.
2. Provides valid PromQL queries for error rate and histogram_quantile latency.
3. Implements multi-window burn rate alert.
4. Defines practical Error Budget enforcement policy.

OUTPUT FORMAT:
## Evaluation: [PASS or NEEDS REVISION]
### 🎯 Executive Summary
### 🔍 Technical Strengths
### ⚠️ Gaps & Edge Cases
### 💡 Socratic Hint & Question
### 🚀 Next Steps"""
)

# TOPIC 11: CI/CD Pipelines
add_lesson(
    "f4a00011-0001-4000-a000-000000000001",
    "11. CI/CD Pipelines — Automated Testing, Delivery & Rollouts",
    "phase-4", "Phase 4: Advanced SRE Concepts (Months 10–12)",
    "p4-t11", "11. CI/CD Pipelines",
    "concept", 60,
    """# 11. CI/CD Pipelines: Deployment Safety & Automation

**Why:** Automated deployment is crucial for reliability. High deployment frequency with low change failure rate (DORA metrics) is achievable only with automated testing, linting, container builds, and safe progressive deployment strategies (canary/blue-green).

---

## What to Learn

### 1. CI/CD Concepts and Workflows
* **CI:** Automated build, unit testing, linting, and static analysis upon PR creation.
* **CD:** Automated deployment to staging and production with rollback gates.

### 2. Jenkins, GitLab CI, or GitHub Actions
* Pipeline as Code defined in repository YAML.
* Triggers, jobs, stages, runners, secrets, and artifact caching.

### 3. Pipeline as Code
* Declarative workflow configuration, matrix builds, environment separation.

### 4. Testing in Pipelines
* Unit tests, integration tests, smoke tests, and container vulnerability scanning (Trivy).

### 5. Deployment Strategies
* **Rolling Update:** Gradually replacing instances.
* **Blue/Green:** Instantaneous traffic switch between identical environments.
* **Canary:** Routing a small slice of live traffic (e.g. 5%) to new release; promoting only if error budget remains intact.

### 6. Rollback Procedures
* Automated rollbacks triggered by metric anomalies.
"""
)

add_lesson(
    "f4a00011-0002-4000-a000-000000000001",
    "11. CI/CD Pipelines — Recommended Resources",
    "phase-4", "Phase 4: Advanced SRE Concepts (Months 10–12)",
    "p4-t11", "11. CI/CD Pipelines",
    "resource", 30,
    """# 11. CI/CD Pipelines: Authoritative Resources

The following resources are explicitly recommended by Santhosh Kumar Jampala's roadmap:

### 1. Jenkins Documentation
* [jenkins.io/doc/](https://www.jenkins.io/doc/)
* Declarative Pipeline syntax, multibranch pipelines, and agents.

### 2. GitLab CI/CD Tutorials
* [docs.gitlab.com/ee/ci/](https://docs.gitlab.com/ee/ci/)
* Industry-leading CI/CD documentation and runner architecture.

### 3. *"Continuous Delivery"* by Jez Humble & David Farley
* The foundational book on automated builds, deployment pipelines, and release management.
""",
    resource="https://docs.gitlab.com/ee/ci/"
)

add_lesson(
    "f4a00011-0003-4000-a000-000000000001",
    "11. CI/CD Pipelines — Practice Projects & Exercises",
    "phase-4", "Phase 4: Advanced SRE Concepts (Months 10–12)",
    "p4-t11", "11. CI/CD Pipelines",
    "practice", 60,
    """# 11. CI/CD Pipelines: Practice Projects

**Roadmap Requirements:**
1. Build a CI/CD pipeline for a sample application.
2. Implement automated testing.
3. Set up deployment to multiple environments.

---

### Step-by-Step Lab Instructions

#### Exercise 1: GitHub Actions CI Pipeline with Security Gates
Create `.github/workflows/deploy.yml` that:
1. Runs linter and unit tests.
2. Scans Docker image for vulnerabilities using Trivy.
3. Pushes image to GHCR on main branch merge.
4. Triggers deployment to staging.
"""
)

add_task(
    "t4a00011-0001-4000-a000-000000000001",
    "Assignment 11: Production CI/CD Pipeline with Automated Rollback",
    "phase-4", "Phase 4: Advanced SRE Concepts (Months 10–12)",
    "p4-t11", "11. CI/CD Pipelines",
    """# Assignment 11: Production CI/CD Pipeline with Rollback Gate

### Objective
Create a complete GitHub Actions or GitLab CI pipeline definition (`.github/workflows/deploy.yml`) incorporating automated testing, vulnerability scanning, and safe canary deployment.

---

### Deliverables
1. **Pipeline Workflow YAML:** Linting, automated unit/integration tests, Trivy container security vulnerability scanner, image build and push.
2. **Canary Deployment Stage:** Deploys new version to 10% canary traffic.
3. **Automated Rollback Logic:** Script or step that queries Prometheus; if 5xx error rate exceeds 1% during the canary window, halts deployment and initiates rollback immediately.""",
    """You are a Senior SRE Mentor evaluating a CI/CD Pipeline assignment.

Grading Rubric:
1. Complete workflow YAML covering test, security scan, and build stages.
2. Progressive delivery or canary deployment mechanics.
3. Automated rollback condition based on metrics/health checks.

OUTPUT FORMAT:
## Evaluation: [PASS or NEEDS REVISION]
### 🎯 Executive Summary
### 🔍 Technical Strengths
### ⚠️ Gaps & Edge Cases
### 💡 Socratic Hint & Question
### 🚀 Next Steps"""
)

# TOPIC 12: Kubernetes (Container Orchestration)
add_lesson(
    "f4a00012-0001-4000-a000-000000000001",
    "12. Kubernetes — Architecture, Deployments, Services & Helm",
    "phase-4", "Phase 4: Advanced SRE Concepts (Months 10–12)",
    "p4-t12", "12. Kubernetes (Container Orchestration)",
    "concept", 60,
    """# 12. Kubernetes: Production Container Orchestration

**Why:** Industry standard for container orchestration. Kubernetes automates container provisioning, scaling, service discovery, load balancing, rolling updates, and self-healing.

---

## What to Learn

### 1. Kubernetes Architecture
* **Control Plane:** `kube-apiserver`, `etcd`, `kube-scheduler`, `kube-controller-manager`.
* **Worker Nodes:** `kubelet`, `kube-proxy`, Container Runtime (`containerd`).

### 2. Core Objects
* **Pods:** Smallest deployable unit in Kubernetes.
* **Deployments & ReplicaSets:** Declarative pod updates and replicas.
* **Services:** `ClusterIP`, `NodePort`, `LoadBalancer`.
* **ConfigMaps & Secrets:** Externalizing configuration and sensitive credentials.

### 3. `kubectl` Command Line & YAML Manifests
* `kubectl get/describe/apply/logs/exec/rollout`.

### 4. Helm for Package Management
* Chart structure, templating, `values.yaml`, versioned releases.

### 5. Ingress and Networking
* Ingress controllers, routing rules, TLS termination, NetworkPolicies.

### 6. Monitoring Kubernetes Clusters
* Metrics Server, Prometheus Operator, Kube-State-Metrics.
"""
)

add_lesson(
    "f4a00012-0002-4000-a000-000000000001",
    "12. Kubernetes — Recommended Resources",
    "phase-4", "Phase 4: Advanced SRE Concepts (Months 10–12)",
    "p4-t12", "12. Kubernetes (Container Orchestration)",
    "resource", 30,
    """# 12. Kubernetes: Authoritative Resources

The following resources are explicitly recommended by Santhosh Kumar Jampala's roadmap:

### 1. Kubernetes Official Tutorials
* [kubernetes.io/docs/tutorials/](https://kubernetes.io/docs/tutorials/)
* Official interactive modules covering deployments, services, and scaling.

### 2. *"Kubernetes Up & Running"* by Brendan Burns, Joe Beda, & Kelsey Hightower
* Authoritative operational book by the creators of Kubernetes.

### 3. [KillerCoda](https://killercoda.com/)
* Free interactive browser-based scenarios for hands-on Kubernetes debugging.
""",
    resource="https://kubernetes.io/docs/tutorials/"
)

add_lesson(
    "f4a00012-0003-4000-a000-000000000001",
    "12. Kubernetes — Practice Projects & Exercises",
    "phase-4", "Phase 4: Advanced SRE Concepts (Months 10–12)",
    "p4-t12", "12. Kubernetes (Container Orchestration)",
    "practice", 60,
    """# 12. Kubernetes: Practice Projects

**Roadmap Requirements:**
1. Set up a local cluster (`minikube` or `kind`).
2. Deploy a multi-tier application.
3. Implement rolling updates and rollbacks.
4. Set up monitoring with Prometheus.

---

### Step-by-Step Lab Instructions

#### Exercise 1: Provisioning a Local Cluster with kind
1. Install `kind` and `kubectl`.
2. Provision a 3-node cluster (1 control plane + 2 workers).
3. Verify cluster node health.

#### Exercise 2: Rolling Updates & Zero Downtime
1. Deploy a multi-tier application with health probes.
2. Trigger rolling update: `kubectl set image deployment/app app=app:v2`.
3. Verify zero dropped requests during rollout.
"""
)

add_task(
    "t4a00012-0001-4000-a000-000000000001",
    "Assignment 12: Zero-Downtime Kubernetes Deployment with HPA & Probes",
    "phase-4", "Phase 4: Advanced SRE Concepts (Months 10–12)",
    "p4-t12", "12. Kubernetes (Container Orchestration)",
    """# Assignment 12: Resilient Kubernetes Microservice Architecture

### Objective
Write complete production Kubernetes manifests for a resilient web service deployed to a production cluster.

---

### Deliverables
1. **Deployment Manifest:** Must specify `readinessProbe`, `livenessProbe`, resource `requests` and `limits`, rolling update strategy (`maxUnavailable: 0`, `maxSurge: 1`), and pod anti-affinity.
2. **Horizontal Pod Autoscaler (HPA):** Scales pods between 3 and 10 based on 70% target CPU utilization.
3. **Pod Disruption Budget (PDB):** Ensures minimum available pods during node drain operations.
4. **Lifecycle Explanation:** Explain the difference between `livenessProbe` and `readinessProbe` failure outcomes.""",
    """You are a Senior SRE Mentor evaluating a Kubernetes assignment.

Grading Rubric:
1. Manifests include liveness/readiness probes with reasonable thresholds.
2. Defines CPU/memory requests and limits.
3. Configures rolling update strategy with maxUnavailable=0 for zero downtime.
4. Includes HPA and PDB.

OUTPUT FORMAT:
## Evaluation: [PASS or NEEDS REVISION]
### 🎯 Executive Summary
### 🔍 Technical Strengths
### ⚠️ Gaps & Edge Cases
### 💡 Socratic Hint & Question
### 🚀 Next Steps"""
)

# TOPIC 13: Incident Management & On-Call
add_lesson(
    "f4a00013-0001-4000-a000-000000000001",
    "13. Incident Management & On-Call — Procedures, Runbooks & Retros",
    "phase-4", "Phase 4: Advanced SRE Concepts (Months 10–12)",
    "p4-t13", "13. Incident Management & On-Call",
    "concept", 60,
    """# 13. Incident Management & On-Call: SRE Crisis Leadership

**Why:** Responding to incidents is a core SRE responsibility. When outages occur, structured command, clear communication, actionable runbooks, and blameless post-mortem retrospectives turn failures into long-term system resilience.

---

## What to Learn

### 1. Incident Response Procedures
* Severity levels: SEV-1 (Critical outage), SEV-2 (Degradation), SEV-3 (Minor).
* Incident Command System (ICS):
  * **Incident Commander (IC):** Leads triage, delegates tasks, maintains focus.
  * **Operations Lead:** Executes technical commands.
  * **Communications Lead:** Updates status pages and stakeholders.

### 2. On-Call Best Practices
* Paging hygiene: Alert only on actionable user impact, not noisy warnings.
* Rotation management, handoffs, and secondary escalation policies.

### 3. Runbooks and Documentation
* Actionable documentation attached to every alert with symptoms, verification commands, and mitigation steps.

### 4. Post-Mortem Culture & Blameless Retrospectives
* Assumption of good intent: Systemic failures over individual blame.
* Timeline of events (UTC), 5 Whys root cause analysis, action items with assigned owners.

### 5. Escalation Procedures & Tools
* PagerDuty, Opsgenie, VictorOps escalation paths and alerting schedules.
"""
)

add_lesson(
    "f4a00013-0002-4000-a000-000000000001",
    "13. Incident Management & On-Call — Recommended Resources",
    "phase-4", "Phase 4: Advanced SRE Concepts (Months 10–12)",
    "p4-t13", "13. Incident Management & On-Call",
    "resource", 30,
    """# 13. Incident Management: Authoritative Resources

The following resources are explicitly recommended by Santhosh Kumar Jampala's roadmap:

### 1. *"Incident Management for Operations"* by Rob Schnepp
* Comprehensive guide applying FEMA Incident Command System (ICS) principles to tech operations.

### 2. Google SRE Book — Chapter on Incident Response
* [sre.google/sre-book/incident-response/](https://sre.google/sre-book/incident-response/)
* Managing incidents, triage, delegation, and retaining composure under operational pressure.

### 3. Atlassian Incident Management Handbook
* [atlassian.com/incident-management](https://www.atlassian.com/incident-management)
* Real-world workflows, templates for post-mortems, and on-call escalation guides.
""",
    resource="https://sre.google/sre-book/incident-response/"
)

add_lesson(
    "f4a00013-0003-4000-a000-000000000001",
    "13. Incident Management & On-Call — Practice Projects & Exercises",
    "phase-4", "Phase 4: Advanced SRE Concepts (Months 10–12)",
    "p4-t13", "13. Incident Management & On-Call",
    "practice", 60,
    """# 13. Incident Management: Practice Projects

**Roadmap Requirements:**
1. Write runbooks for common issues.
2. Conduct a mock incident drill.
3. Write a sample post-mortem.

---

### Step-by-Step Lab Instructions

#### Exercise 1: Production Runbook Authoring
Write an actionable runbook for: `Alert: HighHTTP5xxRateOnPaymentService`.
Must include:
1. Trigger condition and SLO impact.
2. 3 triage commands (log inspection, status query, pod restart).
3. Rollback procedure and failover to secondary gateway.

#### Exercise 2: Conducting a Mock Incident Drill & Blameless Post-Mortem
1. Simulate a database connection pool exhaustion incident.
2. Write a comprehensive, blameless post-mortem document including executive summary, customer impact (SLO error budget consumed), exact timeline (UTC), 5 Whys analysis, and preventive action items.
"""
)

add_task(
    "t4a00013-0001-4000-a000-000000000001",
    "Assignment 13: Production Incident Runbook & Blameless Post-Mortem",
    "phase-4", "Phase 4: Advanced SRE Concepts (Months 10–12)",
    "p4-t13", "13. Incident Management & On-Call",
    """# Assignment 13: Incident Runbook & Blameless Post-Mortem

### Scenario
A SEV-1 outage occurred where customer orders failed for 42 minutes due to a cascading connection pool failure between the web tier and payment database.

---

### Deliverables
1. **Actionable Production Runbook:** Create `RUNBOOK_DB_CONNECTION_EXHAUSTION.md` with symptoms, triage commands, mitigation steps (scaling connection pooler, killing idle connections), and escalation matrix.
2. **Complete Blameless Post-Mortem:** Must include:
   - Executive Summary & Customer Impact (downtime, requests dropped, error budget consumed)
   - High-resolution timestamped timeline (UTC)
   - 5 Whys Root Cause Analysis
   - What went well / What went poorly / Where we got lucky
   - Preventive Action Items with assigned owners and priority levels.""",
    """You are a Senior SRE Mentor evaluating an Incident Management assignment.

Grading Rubric:
1. Actionable runbook with concrete mitigation commands.
2. Thorough blameless post-mortem adhering to Google SRE standards.
3. Rigorous 5 Whys analysis avoiding blame and addressing systemic root causes.
4. Preventive action items with owners and deadlines.

OUTPUT FORMAT:
## Evaluation: [PASS or NEEDS REVISION]
### 🎯 Executive Summary
### 🔍 Technical Strengths
### ⚠️ Gaps & Edge Cases
### 💡 Socratic Hint & Question
### 🚀 Next Steps"""
)

# =============================================================================
# PHASE 5: SPECIALIZATION & GROWTH (Month 13+)
# =============================================================================

# TOPIC 14: Choose Your Focus Areas
add_lesson(
    "f5a00014-0001-4000-a000-000000000001",
    "14. Choose Your Focus Areas — Advanced Tracks & Architecture",
    "phase-5", "Phase 5: Specialization & Growth (Month 13+)",
    "p5-t14", "14. Choose Your Focus Areas",
    "concept", 60,
    """# 14. Choose Your Focus Areas: SRE Specialization

**Why:** Once foundational and core SRE skills are internalized, senior engineering paths diverge into specialized domains. Choosing focus areas allows you to build deep domain mastery and high leverage.

---

## Focus Tracks Defined by the Roadmap

### Track A: Infrastructure & Platform
* **Advanced Kubernetes:** Operators, Custom Resource Definitions (CRDs).
* **Service Mesh:** Istio or Linkerd (mTLS, traffic splitting, circuit breakers).
* **Infrastructure as Code:** Terraform, Pulumi.
* **Multi-Cloud Strategies:** Resilient cross-cloud architectures.

### Track B: Observability & Performance
* **Advanced Monitoring:** eBPF profiling, flame graphs.
* **Distributed Tracing:** OpenTelemetry, Jaeger, Zipkin.
* **Performance Engineering:** Benchmarking, load testing, latency optimization.
* **Chaos Engineering:** Chaos Mesh, Litmus, failure injection.

### Track C: Security & Compliance
* **Security Best Practices:** Hardening, CIS benchmarks.
* **Secrets Management:** HashiCorp Vault (dynamic secrets, PKI).
* **Compliance Frameworks:** SOC 2, ISO 27001.
* **Security Scanning & Hardening:** Container scanning, SBOMs.
"""
)

add_lesson(
    "f5a00014-0002-4000-a000-000000000001",
    "14. Choose Your Focus Areas — Recommended Resources",
    "phase-5", "Phase 5: Specialization & Growth (Month 13+)",
    "p5-t14", "14. Choose Your Focus Areas",
    "resource", 30,
    """# 14. Focus Areas: Authoritative Resources

The following resources support Phase 5 specialization:

### 1. [CNCF Cloud Native Interactive Landscape](https://landscape.cncf.io/)
* Map of container orchestration, service mesh, observability, and security tools.

### 2. Istio & Linkerd Official Documentation
* [istio.io/latest/docs/](https://istio.io/latest/docs/)
* Architecture, Envoy proxy sidecars, and traffic management rules.

### 3. HashiCorp Vault Learn Portal
* [developer.hashicorp.com/vault/tutorials](https://developer.hashicorp.com/vault/tutorials)
* Dynamic secrets generation and Kubernetes pod integration.
""",
    resource="https://landscape.cncf.io"
)

add_lesson(
    "f5a00014-0003-4000-a000-000000000001",
    "14. Choose Your Focus Areas — Practice Projects & Capstones",
    "phase-5", "Phase 5: Specialization & Growth (Month 13+)",
    "p5-t14", "14. Choose Your Focus Areas",
    "practice", 60,
    """# 14. Focus Areas: Practice Projects

Implement an end-to-end focus track project:
1. **Platform Project:** Deploy a Service Mesh on your cluster and configure 90/10 canary traffic splitting between v1 and v2 with automatic mutual TLS.
2. **Observability Project:** Instrument a distributed microservice with OpenTelemetry and trace a transaction from ingress to database.
3. **Resilience Project:** Run a Chaos Engineering experiment injecting 300ms network latency into database queries and verify client timeout circuit breaking.
"""
)

add_task(
    "t5a00014-0001-4000-a000-000000000001",
    "Assignment 14: Specialized SRE Architecture Design Document",
    "phase-5", "Phase 5: Specialization & Growth (Month 13+)",
    "p5-t14", "14. Choose Your Focus Areas",
    """# Assignment 14: Focus Track Architecture Proposal

### Objective
Select one of the 3 focus tracks (Platform/Mesh, Observability/Tracing, or Security/Vault) and author an end-to-end technical architecture proposal for production implementation.

---

### Deliverables
1. **System Architecture Diagram & Overview:** Describe the chosen system (e.g. Istio Service Mesh, OpenTelemetry distributed tracing, or HashiCorp Vault dynamic database secrets).
2. **Implementation Specification:** Configuration manifests or code snippets demonstrating the core implementation.
3. **Operational Readiness:** Rollback plan, performance overhead assessment (CPU/memory latency impact), and failure recovery procedures.""",
    """You are a Senior SRE Mentor evaluating an Advanced SRE Architecture assignment.

Grading Rubric:
1. Comprehensive architecture design for chosen specialization.
2. Working configuration manifests or code.
3. Thorough operational readiness and failure recovery considerations.

OUTPUT FORMAT:
## Evaluation: [PASS or NEEDS REVISION]
### 🎯 Executive Summary
### 🔍 Technical Strengths
### ⚠️ Gaps & Edge Cases
### 💡 Socratic Hint & Question
### 🚀 Next Steps"""
)

# TOPIC 15: Soft Skills Development
add_lesson(
    "f5a00015-0001-4000-a000-000000000001",
    "15. Soft Skills Development — Communication & Cross-Team Leadership",
    "phase-5", "Phase 5: Specialization & Growth (Month 13+)",
    "p5-t15", "15. Soft Skills Development",
    "concept", 60,
    """# 15. Soft Skills Development: Engineering Leadership

**Why:** SRE is collaborative and communication-heavy. You are negotiating reliability contracts (SLOs) with product managers, guiding developers during architectural reviews, leading stressful incident channels, and mentoring junior engineers.

---

## What to Develop

### 1. Communication Skills
* Technical writing: Clear, concise design documents, runbooks, and status updates.
* Presentations: Presenting post-mortem learnings and architecture proposals.

### 2. Collaboration with Development Teams
* Breaking down Dev vs Ops silos; partnering on reliability from day one.
* Conducting Production Readiness Reviews (PRRs).

### 3. Stakeholder Management
* Translating technical latency and errors into business impact.
* Negotiating Error Budget policies with Product Managers.

### 4. Teaching and Mentoring
* Running incident response drills and mentoring peers.

### 5. Project Management Basics & Problem-Solving Methodologies
* Breaking large migrations into incremental, safe milestones.
* Applying systematic root cause triage (5 Whys, fault tree analysis).
"""
)

add_lesson(
    "f5a00015-0002-4000-a000-000000000001",
    "15. Soft Skills Development — Recommended Resources",
    "phase-5", "Phase 5: Specialization & Growth (Month 13+)",
    "p5-t15", "15. Soft Skills Development",
    "resource", 30,
    """# 15. Soft Skills: Authoritative Resources

The following resources are explicitly recommended for technical communication:

### 1. [Google Technical Writing Courses](https://developers.google.com/tech-writing)
* Free courses on sentence structure, active voice, document organization, and technical illustrations.

### 2. *"Staff Engineer: Leadership beyond the management track"* by Will Larson
* Navigation of influence, writing technical proposals, and cross-team alignment.
""",
    resource="https://developers.google.com/tech-writing"
)

add_lesson(
    "f5a00015-0003-4000-a000-000000000001",
    "15. Soft Skills Development — Practice Projects & Exercises",
    "phase-5", "Phase 5: Specialization & Growth (Month 13+)",
    "p5-t15", "15. Soft Skills Development",
    "practice", 60,
    """# 15. Soft Skills: Practice Projects

**Roadmap Requirements:**
1. Author an Architecture Decision Record (ADR) or Production RFC proposing a new SRE standard (e.g. standardizing on structured JSON logging).
2. Facilitate a mock blameless post-mortem retrospective with team members.
"""
)

add_task(
    "t5a00015-0001-4000-a000-000000000001",
    "Assignment 15: Production RFC & Architecture Decision Record (ADR)",
    "phase-5", "Phase 5: Specialization & Growth (Month 13+)",
    "p5-t15", "15. Soft Skills Development",
    """# Assignment 15: Production RFC / Architecture Decision Record

### Objective
Demonstrate technical communication and engineering leadership by authoring a formal Architecture Decision Record (ADR) or Request for Comments (RFC) proposing an engineering-wide reliability standard.

---

### Deliverables
1. **Title & Status:** Proposed / Accepted.
2. **Context & Problem Statement:** Why this decision is necessary (e.g. standardizing on structured JSON logging with correlation IDs across all microservices).
3. **Decision & Proposed Standard:** The exact technical specification and guidelines.
4. **Alternatives Considered & Trade-Offs:** What other solutions were evaluated and why they were rejected.
5. **Rollout Plan & Cross-Team Impact:** How development teams will adopt this standard with minimal friction.""",
    """You are a Senior SRE Mentor evaluating a Technical Writing & Engineering Leadership assignment.

Grading Rubric:
1. Professional RFC/ADR structure following industry standards.
2. Clear problem statement and technical decision.
3. Objective trade-off analysis comparing alternatives.
4. Realistic cross-team migration plan.

OUTPUT FORMAT:
## Evaluation: [PASS or NEEDS REVISION]
### 🎯 Executive Summary
### 🔍 Technical Strengths
### ⚠️ Gaps & Edge Cases
### 💡 Socratic Hint & Question
### 🚀 Next Steps"""
)

# Write output file
with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
    json.dump(course, f, indent=2, ensure_ascii=False)

print(f"Successfully generated SRE Course: {OUTPUT_PATH}")
print(f"Total Lessons: {len(course['lessons'])}, Total Tasks: {len(course['tasks'])}")
