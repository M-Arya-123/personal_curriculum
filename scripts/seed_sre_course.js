const fs = require('fs');
const path = require('path');

const DB_DIR = path.join(__dirname, '..', 'db');
const COURSE_ID = 'c1a00000-0000-4000-a000-000000000001';
const COURSE_FILE = path.join(DB_DIR, `${COURSE_ID}.json`);

const now = new Date().toISOString();

const course = {
  id: COURSE_ID,
  title: 'Site Reliability Engineering (SRE) Roadmap',
  description: 'Complete Learning Path from Zero to SRE based on Santhosh Kumar Jampala\'s authoritative curriculum. Covers 5 Phases over 36 weeks with deep hands-on practice, system labs, assignments, and AI SRE Mentor review.',
  createdAt: now,
  updatedAt: now,
  authors: [
    {
      authorName: 'Santhosh Kumar Jampala',
      authorLink: 'https://medium.com/@santhoshjsh/sre-roadmap-for-beginners-4a183314c504'
    }
  ],
  tags: [
    'SRE',
    'DevOps',
    'Linux',
    'Networking',
    'Python',
    'Docker',
    'Kubernetes',
    'AWS',
    'Terraform',
    'CI/CD',
    'Prometheus',
    'Grafana',
    'Observability'
  ],
  courseLanguage: ['English'],
  lessons: [
    // -------------------------------------------------------------------------
    // PHASE 1: FOUNDATION (Weeks 1-6)
    // TOPIC 1: Linux & OS Fundamentals (Weeks 1-2)
    // -------------------------------------------------------------------------
    {
      id: 'f1a00001-0001-4000-a000-000000000001',
      title: 'Linux Architecture, Kernel & Virtual Filesystems (/proc, /sys)',
      type: 'markdown',
      resource: '',
      phaseId: 'phase-1',
      phaseTitle: 'Phase 1: Foundation (Weeks 1–6)',
      topicId: 'p1-t1',
      topicTitle: 'Linux & OS Fundamentals (Weeks 1–2)',
      kind: 'concept',
      estimatedMinutes: 45,
      order: 1,
      isCompleted: false,
      completeDate: null,
      createdAt: now,
      notes: `# Linux & OS Fundamentals: Deep Dive for SREs

Site Reliability Engineering builds directly on top of operating system fundamentals. When a service latency spikes or nodes fail health checks, understanding Linux internals is what separates guessing from diagnosing.

## 1. Linux Architecture Overview
The Linux operating system consists of four primary layers:
1. **Hardware**: CPU, Memory, Disk, Network Interface Cards (NICs).
2. **Kernel**: The core of the OS. Manages memory, processes, device drivers, and system calls.
3. **Shell & System Utilities**: Command-line interfaces (Bash, Zsh) and GNU utilities (\`coreutils\`, \`util-linux\`).
4. **User Applications**: Web servers, databases, microservices, container runtimes.

\`\`\`
+-------------------------------------------------------+
|                 User Applications                     |
+-------------------------------------------------------+
|             GNU C Library (glibc) / Shell             |
+-------------------------------------------------------+
|                    System Calls                       |
|           (fork, execve, open, read, write)           |
+-------------------------------------------------------+
|                      KERNEL                           |
|  [Process Scheduler]  [Virtual Memory]  [VFS] [Net]   |
+-------------------------------------------------------+
|                     HARDWARE                          |
|             (CPU, RAM, Disks, Network)                |
+-------------------------------------------------------+
\`\`\`

## 2. Virtual Filesystems: \`/proc\` and \`/sys\`
In Linux, **"everything is a file"**—including kernel data structures and device states.

### The \`/proc\` Filesystem (procfs)
A pseudo-filesystem dynamically created in memory by the kernel:
- \`/proc/cpuinfo\`: CPU architecture, cores, flags (e.g. \`vmx\`, \`aes\`).
- \`/proc/meminfo\`: Detailed memory statistics (\`MemTotal\`, \`MemAvailable\`, \`Buffers\`, \`Cached\`, \`Dirty\`).
- \`/proc/loadavg\`: System load average over 1, 5, and 15 minutes.
- \`/proc/net/dev\`: Network device statistics (bytes/packets received/transmitted, errors, drops).
- \`/proc/[PID]/\`: Per-process runtime metrics:
  - \`/proc/[PID]/cmdline\`: Command line arguments.
  - \`/proc/[PID]/status\`: Human-readable status (memory footprint, threads, state).
  - \`/proc/[PID]/fd/\`: Open file descriptors (sockets, files, pipes).
  - \`/proc/[PID]/limits\`: Soft and hard resource limits (open files, max memory).

### The \`/sys\` Filesystem (sysfs)
Exposes kernel device model, hardware devices, drivers, and cgroups:
- \`/sys/fs/cgroup/\`: Control groups (cgroups v1/v2)—the foundation of Docker and Kubernetes container resource constraints!

## 3. Process Management & Signals
Every Linux process has a Process ID (\`PID\`), Parent Process ID (\`PPID\`), state (\`R\` running, \`S\` interruptible sleep, \`D\` uninterruptible disk sleep, \`Z\` zombie), and priority.

### Key Inspection Tools
- \`ps aux\` or \`ps -ef --forest\`: View process hierarchy.
- \`top\` / \`htop\`: Interactive real-time process monitoring.
- \`pgrep\` & \`pkill\`: Search or signal processes by name.

### Linux Signals SREs Must Know
| Signal | Number | Description | Catchable? |
|---|---|---|---|
| **SIGHUP** | 1 | Terminal hangup / Reload configuration without restart | Yes |
| **SIGINT** | 2 | Keyboard interrupt (\`Ctrl+C\`) | Yes |
| **SIGKILL** | 9 | Forceful termination; kernel cleans up immediately | **NO** |
| **SIGTERM** | 15 | Graceful termination request (allows cleanup, flush buffers) | Yes |
| **SIGCHLD** | 17 | Child process terminated or stopped | Yes |

> **SRE Rule of Thumb:** Always issue \`SIGTERM\` (15) first to allow processes to close active database connections and flush in-flight requests. Only use \`SIGKILL\` (9) as a last resort when a process is unresponsive.

## 4. Systemd & Service Supervision
Modern Linux systems use \`systemd\` as PID 1 (init system):
- Unit files live in \`/etc/systemd/system/\` (admin) and \`/lib/systemd/system/\` (packages).
- Service lifecycle commands:
  \`\`\`bash
  systemctl start myapp.service
  systemctl status myapp.service
  systemctl restart myapp.service
  systemctl enable myapp.service
  \`\`\`
- Structured journal logging:
  \`\`\`bash
  journalctl -u myapp.service -n 100 --no-pager
  journalctl -u myapp.service -f  # Follow logs in real time
  journalctl -p err               # View only priority error and above
  \`\`\`

## 5. Text Processing Toolkit for SREs
When diagnosing incidents on a production host, CLI text processing is your primary diagnostic tool:
- \`grep -E 'ERROR|FATAL' /var/log/app.log\`: Regex search.
- \`awk '{print $1, $7, $9}' access.log\`: Column extraction.
- \`sort | uniq -c | sort -nr\`: Frequency distribution calculation.
- \`sed -i 's/old_endpoint/new_endpoint/g' config.yaml\`: Stream editing.
`,
      lessonNote: ''
    },
    {
      id: 'f1a00001-0002-4000-a000-000000000002',
      title: 'Linux Fundamentals Curated Resources & Reading List',
      type: 'markdown',
      resource: '',
      phaseId: 'phase-1',
      phaseTitle: 'Phase 1: Foundation (Weeks 1–6)',
      topicId: 'p1-t1',
      topicTitle: 'Linux & OS Fundamentals (Weeks 1–2)',
      kind: 'resource',
      estimatedMinutes: 20,
      order: 2,
      isCompleted: false,
      completeDate: null,
      createdAt: now,
      notes: `# Curated Resources: Linux & OS Fundamentals

These are the authoritative resources explicitly recommended by the SRE Roadmap. Keep these bookmarked for reference throughout your studies.

---

### 1. [Linux Journey (Free Online Course)](https://linuxjourney.com/)
- **Link:** [https://linuxjourney.com/](https://linuxjourney.com/)
- **Why it matters:** Outstanding interactive, beginner-friendly guide covering Linux command line, filesystem hierarchy, permissions, processes, and text wrangling.
- **Key Modules to Complete:**
  - *Getting Started*
  - *Command Line*
  - *Text-Fu*
  - *Advanced Text-Fu*
  - *Process Utilization*
  - *Filesystem*

---

### 2. [The Linux Command Line by William Shotts (Free PDF Book)](http://linuxcommand.org/tlcl.php)
- **Link:** [http://linuxcommand.org/tlcl.php](http://linuxcommand.org/tlcl.php)
- **Direct PDF:** [Download PDF from Source](http://linuxcommand.org/tlcl.php)
- **Why it matters:** The definitive reference on shell commands, bash script authoring, redirection (\`>\`, \`>>\`, \`2>&1\`), pipes, and environment variables.
- **Recommended Chapters:**
  - Part 1: Learning the Shell (Chapters 1–10)
  - Part 4: Writing Shell Scripts (Chapters 24–36)

---

### 3. [OverTheWire: Bandit Wargame (Hands-on Practice)](https://overthewire.org/wargames/bandit/)
- **Link:** [https://overthewire.org/wargames/bandit/](https://overthewire.org/wargames/bandit/)
- **Target Goal:** Complete Levels 0 through 20.
- **Skills Trained:** SSH, finding files by permission/size/owner, base64 decoding, compressed file extraction, rot13, network connections (\`nc\`, \`openssl s_client\`), cron jobs.

---

### 4. [Brendan Gregg's Linux Performance Tools](https://www.brendangregg.com/linuxperf.html)
- **Link:** [https://www.brendangregg.com/linuxperf.html](https://www.brendangregg.com/linuxperf.html)
- **Key Diagram:** Linux Performance Observability Tools (USE Method: Utilization, Saturation, Errors).
`,
      lessonNote: ''
    },
    {
      id: 'f1a00001-0003-4000-a000-000000000003',
      title: 'Linux Hands-On Practice Labs (Disk Alert & Access Log Parser)',
      type: 'markdown',
      resource: '',
      phaseId: 'phase-1',
      phaseTitle: 'Phase 1: Foundation (Weeks 1–6)',
      topicId: 'p1-t1',
      topicTitle: 'Linux & OS Fundamentals (Weeks 1–2)',
      kind: 'practice',
      estimatedMinutes: 60,
      order: 3,
      isCompleted: false,
      completeDate: null,
      createdAt: now,
      notes: `# Hands-On Practice Labs: Linux Fundamentals

Complete these practical exercises on your local Linux machine, WSL2, or a Linux VM.

---

## Lab 1: Automated Disk Usage Alert Script
### Objective
Write a robust Bash script named \`disk_monitor.sh\` that inspects filesystem capacity and alerts when disk usage exceeds a defined threshold (e.g. 80%).

### Specifications & Requirements
1. Use \`df -Ph\` to inspect local mounted filesystems.
2. Filter out virtual filesystems like \`tmpfs\`, \`devtmpfs\`, \`udev\`, and squashfs mounts.
3. Compare the current utilization percentage against a configurable threshold (\`THRESHOLD=80\`).
4. If usage exceeds threshold:
   - Output an alert message formatted with hostname, mount point, percentage, and current timestamp.
   - Simulate an alert trigger (e.g. write to syslog via \`logger -t disk_monitor\`, send email, or trigger a webhook).
5. Ensure the script handles non-numeric edge cases and returns exit code 0 if healthy, exit code 1 if alert triggered, or exit code 2 if a runtime error occurs.

---

## Lab 2: Nginx / Apache Access Log Parser
### Objective
Write a one-liner or bash script that parses an HTTP access log file (\`access.log\`) to compute traffic metrics during an incident.

### Requirements
1. Extract and display the **Top 10 Most Visited URLs / Endpoints**.
2. Extract and display the **Top 10 Client IP Addresses** making requests.
3. Count the total number of HTTP 5xx responses (Server Errors).
4. Use standard Linux stream processing tools: \`awk\`, \`grep\`, \`sort\`, \`uniq -c\`, \`head\`.

### Example Command Pattern
\`\`\`bash
# Top 10 IPs:
awk '{print $1}' access.log | sort | uniq -c | sort -nr | head -n 10

# Top 10 Requested URLs:
awk '{print $7}' access.log | sort | uniq -c | sort -nr | head -n 10
\`\`\`

---

## Lab 3: OverTheWire Bandit Challenges
- Connect to \`bandit.labs.overthewire.org\` on port 2220 using \`ssh\`.
- Complete levels 0 through 15.
- Keep a personal markdown log of the commands used for each level.
`,
      lessonNote: ''
    },

    // -------------------------------------------------------------------------
    // TOPIC 2: Computer Networking Fundamentals (Weeks 3-4)
    // -------------------------------------------------------------------------
    {
      id: 'f1a00002-0001-4000-a000-000000000001',
      title: 'Computer Networking: OSI, TCP/IP, DNS, TLS & Network CLI Tools',
      type: 'markdown',
      resource: '',
      phaseId: 'phase-1',
      phaseTitle: 'Phase 1: Foundation (Weeks 1–6)',
      topicId: 'p1-t2',
      topicTitle: 'Computer Networking Fundamentals (Weeks 3–4)',
      kind: 'concept',
      estimatedMinutes: 50,
      order: 4,
      isCompleted: false,
      completeDate: null,
      createdAt: now,
      notes: `# Computer Networking Fundamentals for SREs

In distributed cloud architectures, almost every system failure has a network component—DNS timeout, TLS certificate expiry, connection pool exhaustion, or packet drops.

## 1. The Models: OSI vs TCP/IP
| Layer | OSI Name | TCP/IP Layer | Protocols / Units | SRE Focus Area |
|---|---|---|---|---|
| **7** | Application | Application | HTTP, HTTPS, DNS, gRPC, SSH | Status codes, latency, headers |
| **6** | Presentation | Application | TLS, SSL, Compression | Certificate validity, handshakes |
| **5** | Session | Application | Sockets, RPC sessions | Keepalive, connection pooling |
| **4** | Transport | Transport | TCP, UDP (Segments) | SYN/ACK, retransmits, timeouts |
| **3** | Network | Internet | IP, ICMP, BGP (Packets) | Routing, CIDR, MTU, packet drop |
| **2** | Data Link | Link / Network Interface | Ethernet, ARP, VLAN (Frames) | NIC drops, MAC addressing |
| **1** | Physical | Link / Network Interface | Cables, Fiber, Radio (Bits) | Link state, hardware errors |

## 2. The TCP 3-Way Handshake
Before any HTTP or application payload is exchanged, TCP establishes a stateful, reliable connection:

\`\`\`
Client                                          Server
  |                                                |
  | -------- SYN (seq=x) ------------------------> |  Server listens (LISTEN)
  |                                                |  Receives SYN, sends SYN-ACK
  | <------- SYN-ACK (seq=y, ack=x+1) ------------ |  Server in SYN_RECEIVED state
  |                                                |
  | -------- ACK (seq=x+1, ack=y+1) -------------> |  Connection ESTABLISHED
  |                                                |
\`\`\`

### TCP Connection States
- \`LISTEN\`: Waiting for incoming connections.
- \`SYN_SENT\` / \`SYN_RECV\`: Handshake in progress.
- \`ESTABLISHED\`: Active connection exchanging data.
- \`TIME_WAIT\`: Connection closed; waiting for lingering packets before releasing the socket port. (Crucial for SREs: too many \`TIME_WAIT\` sockets can exhaust ephemeral ports!)

## 3. DNS (Domain Name System) Resolution Workflow
When your service connects to \`api.service.internal\`:
1. Checks local cache / \`/etc/hosts\`.
2. Queries the local resolver (configured in \`/etc/resolv.conf\`).
3. Root DNS server (\`.\`) -> TLD server (\`.internal\`) -> Authoritative nameserver.
4. Record types:
   - \`A\`: IPv4 address.
   - \`AAAA\`: IPv6 address.
   - \`CNAME\`: Canonical alias name.
   - \`SRV\`: Service record (port & weight, heavily used in Consul and Kubernetes).
   - \`TXT\`: Text data (SPF, DKIM, verification tokens).

## 4. Network Troubleshooting Toolkit
- \`ping -c 4 8.8.8.8\`: Verify Layer 3 ICMP connectivity and round-trip time.
- \`traceroute / mtr 1.1.1.1\`: Trace intermediate network hops and packet loss per hop.
- \`ss -tulpn\`: Inspect active TCP/UDP sockets, listening ports, and associated PIDs.
- \`curl -Iv https://example.com\`: Trace full HTTP request-response cycle, TLS handshake, and headers.
- \`dig +trace +nocmd example.com\`: Step-by-step DNS hierarchy resolution.
- \`tcpdump -i eth0 -nn -s0 -w capture.pcap 'port 443'\`: Capture live packet traces for Wireshark analysis.
`,
      lessonNote: ''
    },
    {
      id: 'f1a00002-0002-4000-a000-000000000002',
      title: 'Networking Curated Resources & Practice Labs',
      type: 'markdown',
      resource: '',
      phaseId: 'phase-1',
      phaseTitle: 'Phase 1: Foundation (Weeks 1–6)',
      topicId: 'p1-t2',
      topicTitle: 'Computer Networking Fundamentals (Weeks 3–4)',
      kind: 'practice',
      estimatedMinutes: 45,
      order: 5,
      isCompleted: false,
      completeDate: null,
      createdAt: now,
      notes: `# Networking Resources & Hands-On Practice Labs

### Recommended Resources from SRE Roadmap
- [MDN: Networking for Web Developers](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Web_mechanics)
- [Computer Networking: A Top-Down Approach (Kurose & Ross)](https://www.ucg.ac.me/skladiste/blog_44233/objava_64433/fajlovi/Computer_Networking_A_Top-Down_Approach.pdf)
- [Julia Evans' Networking Zines (Bite-sized, practical SRE visual guides)](https://wizardzines.com/zines/networking/)
- [ByteByteGo Networking Videos on YouTube](https://www.youtube.com/@ByteByteGo)

---

## Hands-On Practice Labs

### Lab 1: Capture TCP 3-Way Handshake with \`tcpdump\`
1. In one terminal, start packet capture on your primary interface:
   \`\`\`bash
   sudo tcpdump -i any -nn 'tcp[tcpflags] & (tcp-syn|tcp-ack) != 0 and port 80'
   \`\`\`
2. In a second terminal, trigger an HTTP connection:
   \`\`\`bash
   curl -I http://neverssl.com
   \`\`\`
3. Inspect the flags output by tcpdump: \`[S]\` (SYN), \`[S.]\` (SYN-ACK), and \`[.]\` (ACK).

### Lab 2: Detailed TLS Handshake Inspection with \`curl\`
Run a verbose curl request against an HTTPS endpoint:
\`\`\`bash
curl -Iv https://httpbin.org/get
\`\`\`
Identify:
- DNS resolution time
- TCP connection established timestamp
- TLS Client Hello, Server Hello, Certificate validation, Cipher suite negotiated
- HTTP/2 or HTTP/1.1 negotiation (ALPN)

### Lab 3: DNS Incident Triage with \`dig\`
Use \`dig\` to query various record types and check propagation:
\`\`\`bash
dig A google.com +noall +answer
dig TXT google.com +short
dig @8.8.8.8 google.com +trace
\`\`\`
`,
      lessonNote: ''
    },

    // -------------------------------------------------------------------------
    // TOPIC 3: Programming / Scripting (Python or Go) (Weeks 5-6)
    // -------------------------------------------------------------------------
    {
      id: 'f1a00003-0001-4000-a000-000000000001',
      title: 'Python for SRE & DevOps: Automation, APIs, CLI & Error Handling',
      type: 'markdown',
      resource: '',
      phaseId: 'phase-1',
      phaseTitle: 'Phase 1: Foundation (Weeks 1–6)',
      topicId: 'p1-t3',
      topicTitle: 'Programming / Scripting (Python or Go) (Weeks 5–6)',
      kind: 'concept',
      estimatedMinutes: 50,
      order: 6,
      isCompleted: false,
      completeDate: null,
      createdAt: now,
      notes: `# Python & Scripting for Site Reliability Engineers

Bash is great for simple one-liners and quick pipeline scripts. But when scripts grow beyond 100 lines, require JSON/YAML parsing, make complex REST API calls, or need robust unit tests, **Python** or **Go** is the standard tool.

## 1. Core Python Patterns for SREs

### Robust HTTP Requests with \`requests\`
Always specify timeouts on outbound network requests! Default requests without timeout will hang indefinitely if the target server stalls.

\`\`\`python
import requests
from requests.exceptions import Timeout, RequestException

def check_service_health(url: str, timeout_sec: float = 3.0) -> dict:
    try:
        response = requests.get(url, timeout=timeout_sec)
        return {
            "url": url,
            "status_code": response.status_code,
            "response_time_ms": round(response.elapsed.total_seconds() * 1000, 2),
            "is_healthy": 200 <= response.status_code < 300
        }
    except Timeout:
        return {"url": url, "error": "Request timed out", "is_healthy": False}
    except RequestException as err:
        return {"url": url, "error": str(err), "is_healthy": False}
\`\`\`

### Safe Subprocess Execution
Avoid \`os.system\` because it executes commands in a subshell without escaping (security vulnerability). Use \`subprocess.run\` with a list of arguments:

\`\`\`python
import subprocess

def run_command(cmd_args: list[str]) -> str:
    result = subprocess.run(
        cmd_args,
        capture_output=True,
        text=True,
        check=True  # Raises CalledProcessError on non-zero exit
    )
    return result.stdout.strip()
\`\`\`

### Building Professional CLI Tools with \`argparse\`
\`\`\`python
import argparse

parser = argparse.ArgumentParser(description="SRE Production Health Checker")
parser.add_argument("--url", required=True, help="Target URL to check")
parser.add_argument("--timeout", type=float, default=5.0, help="Request timeout in seconds")
parser.add_argument("--retries", type=int, default=3, help="Number of retry attempts")
parser.add_argument("--format", choices=["text", "json"], default="text", help="Output format")
args = parser.parse_args()
\`\`\`
`,
      lessonNote: ''
    },
    {
      id: 'f1a00003-0002-4000-a000-000000000002',
      title: 'Python/Go Scripting Resources & Hands-On Practice',
      type: 'markdown',
      resource: '',
      phaseId: 'phase-1',
      phaseTitle: 'Phase 1: Foundation (Weeks 1–6)',
      topicId: 'p1-t3',
      topicTitle: 'Programming / Scripting (Python or Go) (Weeks 5–6)',
      kind: 'practice',
      estimatedMinutes: 45,
      order: 7,
      isCompleted: false,
      completeDate: null,
      createdAt: now,
      notes: `# Scripting Resources & Hands-On Practice Labs

### Curated Resources
- [Automate the Boring Stuff with Python (Free Online)](https://automatetheboringstuff.com/)
- [Python for DevOps (O'Reilly Book by Noah Gift)](https://www.oreilly.com/library/view/python-for-devops/9781492052197/)
- [Learn Go with Tests](https://quii.gitbook.io/learn-go-with-tests)

---

## Hands-On Practice Labs

### Lab 1: Production URL Health Check CLI
Create a Python CLI script \`healthcheck.py\` that:
- Accepts a list of URLs from a JSON configuration file or command line argument.
- Checks HTTP status code, latency (milliseconds), and SSL certificate expiration date.
- Outputs results in a clean colored terminal table or JSON format.
- Exits with return code 0 if all services are healthy, 1 if any service is down.

### Lab 2: Streaming Large Log File Parser (Memory Efficient)
Write a Python script that processes a 1GB+ web server log file line-by-line using a generator (never loading the whole file into RAM with \`readlines()\`).
- Count occurrences of HTTP 5xx responses per minute.
- Output a CSV report of 5xx spike windows.
`,
      lessonNote: ''
    },

    // -------------------------------------------------------------------------
    // PHASES 2 to 5 OVERVIEW & TOPICS
    // -------------------------------------------------------------------------
    {
      id: 'f2a00001-0001-4000-a000-000000000001',
      title: 'Phase 2 Overview: Containers, Docker, Kubernetes & Cloud (Weeks 7–14)',
      type: 'markdown',
      resource: '',
      phaseId: 'phase-2',
      phaseTitle: 'Phase 2: Core Infrastructure & Cloud (Weeks 7–14)',
      topicId: 'p2-t1',
      topicTitle: 'Containers & Docker (Weeks 7–8)',
      kind: 'concept',
      estimatedMinutes: 40,
      order: 8,
      isCompleted: false,
      completeDate: null,
      createdAt: now,
      notes: `# Phase 2: Core Infrastructure & Cloud (Weeks 7–14)

### Structure & Topics
1. **Containers & Docker (Weeks 7–8)**
   - Namespaces, cgroups, OverlayFS, Multi-stage Dockerfile builds, Docker Compose, security best practices.
   - *Resources:* Docker Official Docs, Docker Deep Dive (Nigel Poulton), Play with Docker.
2. **Kubernetes Fundamentals (Weeks 9–11)**
   - Control Plane (API server, etcd, scheduler, controllers), Worker Nodes (kubelet, kube-proxy).
   - Core Objects: Pods, Deployments, Services, ConfigMaps, Secrets, Ingress, HPA, Probes.
   - *Resources:* Kubernetes Docs, Mumshad Mannambeth CKA, TechWorld with Nana.
3. **Cloud Fundamentals: AWS or GCP (Weeks 12–14)**
   - VPC, Subnets, Route Tables, IGW, NAT Gateways, EC2, S3, IAM least privilege, ALB, Auto Scaling.
   - *Resources:* AWS Free Tier, Stephane Maarek SAA, Adrian Cantrill, Cloud Resume Challenge.
`,
      lessonNote: ''
    },
    {
      id: 'f3a00001-0001-4000-a000-000000000001',
      title: 'Phase 3 Overview: Terraform (IaC) & CI/CD Pipelines (Weeks 15–20)',
      type: 'markdown',
      resource: '',
      phaseId: 'phase-3',
      phaseTitle: 'Phase 3: Automation, IaC & CI/CD (Weeks 15–20)',
      topicId: 'p3-t1',
      topicTitle: 'Infrastructure as Code (Terraform) (Weeks 15–17)',
      kind: 'concept',
      estimatedMinutes: 40,
      order: 9,
      isCompleted: false,
      completeDate: null,
      createdAt: now,
      notes: `# Phase 3: Automation, IaC & CI/CD Pipelines (Weeks 15–20)

### Structure & Topics
1. **Infrastructure as Code (Terraform) (Weeks 15–17)**
   - Providers, Resources, Variables, Remote state locking with S3 + DynamoDB, Modules, Workspaces, Drift detection.
   - *Resources:* HashiCorp Terraform Tutorials, Terraform Up & Running (Brikman), Anton Babenko Best Practices.
2. **CI/CD Pipelines (Weeks 18–20)**
   - CI vs CD, GitHub Actions / GitLab CI workflows, automated testing, container image build & push, Trivy vulnerability scanning, Canary and Blue/Green deployment strategies.
   - *Resources:* GitHub Actions Docs, GitLab CI Docs, DevOps Directive.
`,
      lessonNote: ''
    },
    {
      id: 'f4a00001-0001-4000-a000-000000000001',
      title: 'Phase 4 Overview: Observability, Metrics, Logs, Traces & SRE Culture (Weeks 21–28)',
      type: 'markdown',
      resource: '',
      phaseId: 'phase-4',
      phaseTitle: 'Phase 4: Observability & SRE Principles (Weeks 21–28)',
      topicId: 'p4-t1',
      topicTitle: 'Observability: Metrics & Monitoring (Weeks 21–23)',
      kind: 'concept',
      estimatedMinutes: 45,
      order: 10,
      isCompleted: false,
      completeDate: null,
      createdAt: now,
      notes: `# Phase 4: Observability & SRE Principles (Weeks 21–28)

### Structure & Topics
1. **Observability: Metrics & Monitoring (Weeks 21–23)**
   - The Three Pillars, Prometheus architecture, PromQL, node_exporter, Alertmanager, Grafana Dashboards, Four Golden Signals (Latency, Traffic, Errors, Saturation - USE & RED methods).
   - *Resources:* Prometheus: Up & Running (Brian Brazil), Prometheus Docs, Grafana Fundamentals.
2. **Observability: Logging & Tracing (Weeks 24–25)**
   - Centralized logging with Grafana Loki / ELK, structured JSON logging, distributed tracing with OpenTelemetry and Jaeger/Tempo.
   - *Resources:* OpenTelemetry Docs, Grafana Loki Docs, Distributed Tracing in Practice.
3. **SRE Principles & Culture (Weeks 26–28)**
   - Google SRE Philosophy, Service Level Objectives (SLIs, SLOs, SLAs), Error Budget Policies, Incident Management & Severity Levels, Blameless Postmortems, Toil Reduction (Google's 50% rule).
   - *Resources:* Google SRE Books (sre.google/books), Seeking SRE (David Blank-Edelman), Chaos Engineering.
`,
      lessonNote: ''
    },
    {
      id: 'f5a00001-0001-4000-a000-000000000001',
      title: 'Phase 5: Advanced SRE & Capstone Portfolio Projects (Weeks 29–36)',
      type: 'markdown',
      resource: '',
      phaseId: 'phase-5',
      phaseTitle: 'Phase 5: Advanced SRE & Capstone Projects (Weeks 29–36)',
      topicId: 'p5-t1',
      topicTitle: 'Advanced SRE & Capstone Portfolio Projects',
      kind: 'project',
      estimatedMinutes: 60,
      order: 11,
      isCompleted: false,
      completeDate: null,
      createdAt: now,
      notes: `# Phase 5: Advanced SRE Topics & Capstone Projects (Weeks 29–36)

This phase turns all the theory and practice from Phases 1–4 into four production-grade portfolio projects.

### Topic 1: Advanced Topics (Weeks 29–32)
- **Service Mesh:** Istio / Linkerd (mTLS, traffic splitting, observability without app code).
- **Chaos Engineering:** Chaos Mesh / LitmusChaos / Chaos Monkey (injecting network latency, pod failures, disk exhaustion).
- **Advanced Kubernetes:** Custom Resource Definitions (CRDs), Kubernetes Operators (Operator SDK), Network Policies.
- **DevSecOps:** Secrets management with HashiCorp Vault, CIS security benchmarks.

### Topic 2: Capstone Projects (Weeks 33–36)
1. **Project 1: Production-Grade Kubernetes Platform** (Terraform + EKS/GKE + Ingress + Helm + Prometheus/Grafana stack).
2. **Project 2: Automated Incident Response System** (Alertmanager webhook + Python automation + Slack notification + automated pod restart/remediation).
3. **Project 3: Chaos Engineering & Resilience Testing Lab** (Deploy microservice app, define SLOs, inject latency/partition faults, measure error budget impact).
4. **Project 4: Full CI/CD Pipeline with Automated Canary Deployments** (GitHub Actions + ArgoCD / Flagger canary rollout based on Prometheus error rates).
`,
      lessonNote: ''
    }
  ],
  tasks: [
    // -------------------------------------------------------------------------
    // SRE ASSIGNMENT 1: Linux & OS Fundamentals
    // -------------------------------------------------------------------------
    {
      id: 't1a00001-0001-4000-a000-000000000001',
      title: 'Assignment 1: Linux Process & Disk Alerting System (Hands-on SRE Lab)',
      phaseId: 'phase-1',
      phaseTitle: 'Phase 1: Foundation (Weeks 1–6)',
      topicId: 'p1-t1',
      topicTitle: 'Linux & OS Fundamentals (Weeks 1–2)',
      status: 'NOT STARTED',
      createdAt: now,
      question: `# Assignment 1: Linux Process & Disk Alerting System

### Scenario
You are the on-call SRE responsible for a fleet of production Ubuntu servers hosting customer-facing microservices. During the last incident, a runaway application log file filled the root partition (\`/\`) to 100%, causing the kernel to enter read-only mode and crashing the database.

Your task is to write a production-grade Bash monitoring script and explain the underlying OS mechanics to prevent this from ever happening again.

---

### Part 1: Write the Bash Monitoring Script (\`disk_alert.sh\`)
Write a script that:
1. Checks the disk usage percentage of all mounted physical filesystems (using \`df\`), ignoring pseudo-filesystems like \`tmpfs\`, \`udev\`, and \`squashfs\`.
2. Compares usage against a configurable threshold (\`THRESHOLD=80\`).
3. If usage exceeds the threshold:
   - Identifies the top 5 largest files or directories under the affected mount point.
   - Logs an alert to syslog using \`logger\` with tag \`sre-disk-alert\` and severity \`alert\`.
   - Prints a formatted report with timestamp, hostname, mount point, percent used, and top disk consumers.
4. Includes safe bash flags (\`set -euo pipefail\`) and appropriate exit codes (0 for OK, 1 for alert triggered, 2 for invalid arguments/error).

---

### Part 2: Technical Explanation & SRE Reasoning
Answer the following questions in your submission:
1. **The \`/proc\` Filesystem:** How could a script determine if a process is holding an unlinked (deleted) large file open in memory using \`/proc\` (e.g. when \`rm log.txt\` was run but disk space was not freed)?
2. **Signals:** When you need to stop a runaway process that is filling the disk, explain why you send \`SIGTERM\` (15) first instead of immediately running \`kill -9\` (\`SIGKILL\`). What does the kernel do in each case?
3. **Automated Scheduling:** Would you schedule this script using a legacy Cron job or a Systemd Timer? Explain the reliability and logging advantages of your choice.

---

### Submission Guidelines
Paste your complete bash script and your technical explanations below. You may also link to a GitHub repository or Gist if you published it.`,
      instruction: `You are a Senior Site Reliability Engineer (SRE) Mentor evaluating a junior engineer's Linux & OS Fundamentals submission.

Grading Rubric & Rules:
1. SCRIPT CORRECTNESS:
   - Uses 'df' properly (e.g. df -hP or df -x tmpfs -x devtmpfs).
   - Handles numeric comparison against threshold properly.
   - Uses defensive bash practices ('set -euo pipefail', quoting variables).
   - Proper exit codes (0 for healthy, non-zero for alert or error).

2. TECHNICAL UNDERSTANDING & REASONING:
   - Question 1 (/proc): Must mention /proc/[PID]/fd and checking for "(deleted)" file descriptors or using lsof. Explains that the inode is not freed until the process closes its file descriptor!
   - Question 2 (Signals): Explains that SIGTERM (15) can be caught by the process to flush buffers, finish transactions, and close sockets gracefully. Explains that SIGKILL (9) cannot be caught or ignored; the kernel terminates the process immediately, risking corrupted state and orphaned locks.
   - Question 3 (Systemd Timer vs Cron): Mentions systemd timer advantages (integrated logging with journalctl, monotonic timers, dependency handling, execution catch-up if server was off/paused).

EVALUATION RULES:
- If the submission is empty, trivial, or lacks the script, give result "NEEDS REVISION" and provide specific hints without giving away the full answer.
- If the submission demonstrates solid understanding and answers both the script and theoretical questions accurately, give result "PASS".
- Be constructive, educational, and strict on production safety. Do NOT silently rewrite the entire script for the student; guide them.

OUTPUT FORMAT:
Reply in this exact Markdown structure:
## Evaluation: [PASS or NEEDS REVISION]
### 🎯 Executive Summary
(1-2 sentences summarizing performance)

### 🔍 Technical Strengths
(Bullet points highlighting what was done well)

### ⚠️ Gaps & Edge Cases
(Explain WHY certain things need improvement—e.g. mount filtering, signal handling, quoting)

### 💡 Socratic Hint & Question
(A guiding question or hint to deepen their SRE intuition)

### 🚀 Next Steps
(What to work on next)`
    },

    // -------------------------------------------------------------------------
    // SRE ASSIGNMENT 2: Networking
    // -------------------------------------------------------------------------
    {
      id: 't1a00002-0001-4000-a000-000000000001',
      title: 'Assignment 2: Network Packet Trace Analysis & DNS Triage Report',
      phaseId: 'phase-1',
      phaseTitle: 'Phase 1: Foundation (Weeks 1–6)',
      topicId: 'p1-t2',
      topicTitle: 'Computer Networking Fundamentals (Weeks 3–4)',
      status: 'NOT STARTED',
      createdAt: now,
      question: `# Assignment 2: Network Packet Trace & DNS Triage Report

### Incident Scenario
At 14:02 UTC, an internal payment microservice started failing all outbound HTTPS calls to a third-party gateway (\`api.payment-gateway.com\`) with \`504 Gateway Timeout\` and sporadic \`Connection Refused\` errors. The application team claims "the cloud network is down." As the SRE, you must prove or disprove this hypothesis using network diagnostic tools.

---

### Tasks to Submit

#### 1. Diagnostic Command Pipeline
List the exact sequential CLI commands you would execute on the affected host to isolate the issue across Layer 3, Layer 4, and Layer 7 (e.g. \`ping\`, \`mtr\`, \`dig\`, \`ss\`, \`curl -v\`, \`tcpdump\`). Explain what each command proves.

#### 2. Analyzing a TCP Trace
Assume a \`tcpdump\` capture between the microservice and the gateway reveals repeated \`SYN\` packets sent by the client followed by no \`SYN-ACK\` from the server, ending in \`ETIMEDOUT\`. What layer is failing, and what are the two most likely infrastructure causes (e.g. Security Groups/Firewall vs Server port)?

#### 3. DNS Failure Resolution
If \`dig api.payment-gateway.com\` returns \`SERVFAIL\`, explain the diagnostic steps you take to trace the root cause back through \`/etc/resolv.conf\`, local caching resolvers (e.g. \`systemd-resolved\` or CoreDNS), and upstream authoritative nameservers.`,
      instruction: `You are a Senior SRE Mentor evaluating a junior engineer's Computer Networking assignment.

Grading Rubric:
1. Diagnostic steps must cover DNS, Layer 3 (ping/traceroute), Layer 4 (ss/tcpdump), and Layer 7 (curl -v).
2. TCP trace explanation: Recognizes that SYN without SYN-ACK indicates packet drop or firewall filtering (security group, iptables, or network ACL), rather than connection refused (which would send RST).
3. DNS resolution analysis: Demonstrates clear understanding of resolv.conf, recursive resolver, and testing with 'dig +trace' or direct query to upstream DNS servers.

OUTPUT FORMAT:
## Evaluation: [PASS or NEEDS REVISION]
### 🎯 Executive Summary
### 🔍 Technical Strengths
### ⚠️ Gaps & Edge Cases
### 💡 Socratic Hint & Question
### 🚀 Next Steps`
    },

    // -------------------------------------------------------------------------
    // SRE ASSIGNMENT 3: Python Scripting
    // -------------------------------------------------------------------------
    {
      id: 't1a00003-0001-4000-a000-000000000001',
      title: 'Assignment 3: Production Health Check CLI Tool with Timeout & SSL Expiry',
      phaseId: 'phase-1',
      phaseTitle: 'Phase 1: Foundation (Weeks 1–6)',
      topicId: 'p1-t3',
      topicTitle: 'Programming / Scripting (Python or Go) (Weeks 5–6)',
      status: 'NOT STARTED',
      createdAt: now,
      question: `# Assignment 3: Production Health Check CLI Tool

### Objective
Write a production-ready Python CLI tool named \`sre_healthcheck.py\` that monitors a list of HTTP/HTTPS endpoints and validates both service availability and TLS certificate expiration.

---

### Requirements
1. **Arguments:** Accept target URLs via CLI argument (\`--url\`) or config file (\`--config urls.json\`).
2. **HTTP Verification:** Check status code, total response time in ms, and catch timeouts without crashing.
3. **SSL Certificate Expiration:** For HTTPS URLs, extract the certificate's expiration timestamp using Python's \`ssl\` and \`socket\` libraries and calculate days remaining.
4. **Structured Output:** Support \`--format text\` (human-readable table) and \`--format json\` (for consumption by monitoring systems or pipelines).
5. **Exit Codes:** Return 0 if all endpoints are healthy and certificate validity > 14 days; return 1 if any endpoint fails or certificate expires soon.

Submit your Python code along with a brief explanation of how you handled connection pooling, timeouts, and exceptions.`,
      instruction: `You are a Senior SRE Mentor evaluating a Python/Go automation script assignment.

Grading Rubric:
1. Code Quality: Pythonic, clean functions/classes, proper exception handling ('requests.RequestException', 'socket.timeout').
2. Defensive SRE Programming: Outbound requests MUST have explicit timeouts.
3. SSL Inspection: Correctly extracts cert expire date or uses ssl context without disabling certificate verification (no verify=False in production!).
4. CLI & Exit Codes: Uses argparse/click, supports JSON output, returns proper exit codes.

OUTPUT FORMAT:
## Evaluation: [PASS or NEEDS REVISION]
### 🎯 Executive Summary
### 🔍 Technical Strengths
### ⚠️ Gaps & Edge Cases
### 💡 Socratic Hint & Question
### 🚀 Next Steps`
    }
  ]
};

fs.writeFileSync(COURSE_FILE, JSON.stringify(course, null, 2), 'utf8');
console.log(`Successfully generated SRE Course: ${COURSE_FILE}`);
console.log(`Total Lessons: ${course.lessons.length}, Total Tasks: ${course.tasks.length}`);
