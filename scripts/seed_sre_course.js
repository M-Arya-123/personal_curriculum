const fs = require('fs');
const path = require('path');

const DB_DIR = path.join(__dirname, '..', 'db');
const COURSE_ID = 'c1a00000-0000-4000-a000-000000000001';
const COURSE_FILE = path.join(DB_DIR, `${COURSE_ID}.json`);

const now = new Date().toISOString();

const course = {
  id: COURSE_ID,
  title: 'Site Reliability Engineering (SRE) Roadmap',
  description: 'Complete Learning Path from Zero to Site Reliability Engineer based strictly on Santhosh Kumar Jampala\'s authoritative curriculum. Estimated Timeframe: 12–18 months (15–20 hours/week) covering 5 progressive Phases and all 15 Topics with hands-on practice, labs, assignments, and AI SRE Mentor review.',
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
    'Bash',
    'Git',
    'Python',
    'Databases',
    'Docker',
    'AWS',
    'Ansible',
    'Observability',
    'Prometheus',
    'Grafana',
    'CI/CD',
    'Kubernetes',
    'Incident Management'
  ],
  courseLanguage: ['English'],
  lessons: [
    // =========================================================================
    // PHASE 1: FOUNDATION (Months 1–3)
    // =========================================================================

    // TOPIC 1: Linux Fundamentals
    {
      id: 'f1a00001-0001-4000-a000-000000000001',
      title: '1. Linux Fundamentals — Concepts & Core Architecture',
      type: 'markdown',
      resource: '',
      phaseId: 'phase-1',
      phaseTitle: 'Phase 1: Foundation (Months 1–3)',
      topicId: 'p1-t1',
      topicTitle: '1. Linux Fundamentals',
      kind: 'concept',
      estimatedMinutes: 60,
      order: 1,
      isCompleted: false,
      completeDate: null,
      createdAt: now,
      notes: `# 1. Linux Fundamentals: Deep Dive for SREs

**Why it matters:** Linux powers most servers and cloud infrastructure worldwide. A Site Reliability Engineer must possess deep familiarity with the Linux command line, system internals, process lifecycle, virtual filesystems, and security controls.

---

## 1. Core Operating System Architecture
The Linux operating system is structured into four primary layers:
1. **Hardware**: CPU, RAM, Block Devices, NICs.
2. **Kernel**: Core abstraction layer managing memory (virtual memory, page tables), CPU scheduling (CFS), VFS, and network sockets.
3. **System Calls (syscalls)**: The API boundary between user space and kernel space (\`fork\`, \`execve\`, \`open\`, \`read\`, \`write\`, \`epoll\`, \`kill\`).
4. **User Space**: Shells, GNU system utilities, and application runtimes.

\`\`\`
+-------------------------------------------------------------+
|                     User Space Applications                 |
|             (Nginx, Python, Prometheus, Docker)             |
+-------------------------------------------------------------+
|             GNU C Library (glibc) / POSIX API               |
+-------------------------------------------------------------+
|                    Kernel System Calls                      |
|            [sys_open, sys_read, sys_write, sys_fork]        |
+-------------------------------------------------------------+
|                       LINUX KERNEL                          |
|   [Process Scheduler]   [Virtual Memory (VMA)]  [VFS]       |
|   [Network Stack (TCP/IP)]  [Device Drivers & cgroups]      |
+-------------------------------------------------------------+
|                         HARDWARE                            |
+-------------------------------------------------------------+
\`\`\`

---

## 2. What to Learn: Essential Linux Competencies

### A. Basic Command Line Navigation & File Operations
* **Navigation:** \`pwd\`, \`cd\`, \`ls -laFh\`, \`tree\`
* **File Operations:** \`cp -a\`, \`mv\`, \`rm -rf\`, \`cat\`, \`less\`, \`head\`, \`tail -f\`, \`mkdir -p\`, \`touch\`
* **Finding Files & Inspection:** \`find /var/log -type f -mtime -2\`, \`file\`, \`stat\`, \`locate\`
* **Text Processing Pipeline:** \`grep -E\`, \`awk '{print $1, $9}'\`, \`sed\`, \`cut\`, \`sort\`, \`uniq -c | sort -nr\`, \`xargs\`

### B. Text Editors
* Proficiency in either **\`vim\`** or **\`nano\`** for remote editing over SSH sessions without GUI dependencies.

### C. File Permissions & Ownership
* **Permission Bits:** Read (4), Write (2), Execute (1) across User, Group, and Others.
* **Octal & Symbolic Manipulation:** \`chmod 750 script.sh\`, \`chmod u+x,g-w file\`.
* **Ownership:** \`chown -R appuser:appgroup /opt/app\`.
* **Special Bits:** SUID (\`4000\`), SGID (\`2000\`), Sticky Bit (\`1000\` on \`/tmp\`).
* **umask:** Default permissions mask calculation.

### D. Process Management & Inspection
* **Process Lifecycle:** \`fork()\` ➔ \`exec()\` ➔ Running ➔ Sleeping (\`S\` or \`D\` uninterruptible) ➔ Zombie (\`Z\`) ➔ \`wait()\`.
* **Process Monitoring:** \`ps aux\`, \`ps -ef --forest\`, \`top\`, \`htop\`, \`pgrep\`, \`pidof\`.
* **Signals & Termination:**
  * \`SIGTERM\` (\`15\`): Graceful shutdown request, catchable by application.
  * \`SIGKILL\` (\`9\`): Immediate kernel termination, non-catchable, un-ignorable.
  * \`SIGHUP\` (\`1\`): Reload configuration without stopping process.
* **Systemd Service Control:**
  * \`systemctl status <service>\`, \`start\`, \`stop\`, \`restart\`, \`reload\`.
  * \`systemctl enable --now <service>\`.
  * \`journalctl -u <service> -f -n 100 --no-pager\`.

### E. Virtual Filesystems: \`/proc\` & \`/sys\`
* \`/proc/cpuinfo\`: CPU model, core count, architecture flags.
* \`/proc/meminfo\`: \`MemTotal\`, \`MemAvailable\`, \`Dirty\`, \`Buffers\`, \`Cached\`.
* \`/proc/loadavg\`: System load average (1, 5, 15 minutes).
* \`/proc/[PID]/cmdline\`, \`/proc/[PID]/status\`, \`/proc/[PID]/fd/\` (open file descriptors).
* Diagnosing unlinked open files consuming disk space: checking \`/proc/[PID]/fd/* (deleted)\` and using \`lsof +L1\`.

### F. Package Management
* Debian/Ubuntu: \`apt update && apt install -y\`, \`dpkg -l\`, \`apt-cache search\`.
* RHEL/Rocky: \`dnf install -y\` / \`yum install -y\`, \`rpm -qa\`.

### G. Secure Shell (SSH) & Remote Administration
* Key generation: \`ssh-keygen -t ed25519 -C "sre@prod"\`.
* Authorized keys: \`~/.ssh/authorized_keys\` permissions (\`chmod 600\`, \`chmod 700 ~/.ssh\`).
* Configuration: \`/etc/ssh/sshd_config\` (\`PermitRootLogin no\`, \`PasswordAuthentication no\`).
* Port forwarding: \`ssh -L 8080:localhost:80 user@remote\`.
`,
      lessonNote: ''
    },
    {
      id: 'f1a00001-0002-4000-a000-000000000001',
      title: '1. Linux Fundamentals — Recommended Resources',
      type: 'markdown',
      resource: 'https://linuxjourney.com',
      phaseId: 'phase-1',
      phaseTitle: 'Phase 1: Foundation (Months 1–3)',
      topicId: 'p1-t1',
      topicTitle: '1. Linux Fundamentals',
      kind: 'resource',
      estimatedMinutes: 30,
      order: 2,
      isCompleted: false,
      completeDate: null,
      createdAt: now,
      notes: `# 1. Linux Fundamentals: Authoritative Resources

The following resources are explicitly recommended by Santhosh Kumar Jampala's roadmap for mastering Linux fundamentals:

### 1. [Linux Journey](https://linuxjourney.com)
* **Format:** Interactive, modular web course.
* **Key Sections to Master:**
  * Grasshopper: Command Line, Navigation, File Operations
  * Journeyman: Permissions, Processes, Packages, Devices
  * Networking: Subnetting, Routing, DNS, ARP

### 2. [OverTheWire: Bandit Wargame](https://overthewire.org/wargames/bandit/)
* **Format:** Gamified hands-on SSH challenge.
* **Goal:** Complete Levels 0 through 20.
* **Skills Tested:** SSH logins, hidden files, decoding base64/hex, file permissions, cron jobs, environment variables, finding specific files with \`find\`.

### 3. *"The Linux Command Line"* by William Shotts
* **Format:** Free complete online book ([linuxcommand.org/tlcl.php](https://linuxcommand.org/tlcl.php))
* **Essential Reading:**
  * Part 1: Learning The Shell
  * Part 2: Configuration And The Environment
  * Part 3: Common Tasks And Essential Tools
  * Part 4: Writing Shell Scripts

---
*Tip: Keep notes in your SRE journal as you conquer each Bandit level and review file permissions.*`,
      lessonNote: ''
    },
    {
      id: 'f1a00001-0003-4000-a000-000000000001',
      title: '1. Linux Fundamentals — Practice Projects & Exercises',
      type: 'markdown',
      resource: '',
      phaseId: 'phase-1',
      phaseTitle: 'Phase 1: Foundation (Months 1–3)',
      topicId: 'p1-t1',
      topicTitle: '1. Linux Fundamentals',
      kind: 'practice',
      estimatedMinutes: 60,
      order: 3,
      isCompleted: false,
      completeDate: null,
      createdAt: now,
      notes: `# 1. Linux Fundamentals: Practice Projects

**Roadmap Requirement:**
1. Set up a Linux VM (Ubuntu Server 22.04 LTS or Rocky Linux 9) on VirtualBox or UTM.
2. Complete basic system administration tasks daily.

---

### Step-by-Step Lab Instructions

#### Exercise 1: VM Provisioning & SSH Hardening
1. Install VirtualBox and download an Ubuntu Server 22.04 LTS ISO.
2. Configure VM with 2 vCPUs, 2048 MB RAM, and Host-Only or Bridged Networking.
3. Generate an \`ed25519\` keypair on your host machine and push it to the VM using \`ssh-copy-id\`.
4. Modify \`/etc/ssh/sshd_config\` to disable password authentication and restart \`sshd\`.

#### Exercise 2: Daily System Administration Runbook
Execute and record outputs for the following daily triage commands:
\`\`\`bash
# 1. System uptime and load averages
uptime

# 2. Memory utilization breakdown
free -h

# 3. Disk space and mount points
df -hT --exclude-type=tmpfs --exclude-type=squashfs

# 4. Top 5 CPU-consuming processes
ps aux --sort=-%cpu | head -n 6

# 5. Top 5 Memory-consuming processes
ps aux --sort=-%mem | head -n 6

# 6. Active listening network sockets
ss -tulpn
\`\`\`

#### Exercise 3: Simulating Disk Space Leak via Deleted Open Files
1. Create a large file: \`dd if=/dev/zero of=/tmp/leak.img bs=1M count=200\`
2. Hold it open with a background tail process: \`tail -f /tmp/leak.img &\`
3. Delete the file: \`rm /tmp/leak.img\`
4. Check \`df -h /tmp\` vs \`ls /tmp/leak.img\`. Observe that disk space is NOT freed!
5. Locate the leaking process using \`lsof +L1\` or inspecting \`/proc/<PID>/fd/\`.
6. Terminate the process cleanly and verify disk space reclamation.
`,
      lessonNote: ''
    },

    // TOPIC 2: Networking Basics
    {
      id: 'f1a00002-0001-4000-a000-000000000001',
      title: '2. Networking Basics — OSI, TCP/IP, DNS & HTTP/S',
      type: 'markdown',
      resource: '',
      phaseId: 'phase-1',
      phaseTitle: 'Phase 1: Foundation (Months 1–3)',
      topicId: 'p1-t2',
      topicTitle: '2. Networking Basics',
      kind: 'concept',
      estimatedMinutes: 60,
      order: 4,
      isCompleted: false,
      completeDate: null,
      createdAt: now,
      notes: `# 2. Networking Basics: SRE Network Engineering

**Why it matters:** SREs manage distributed systems where services talk across cloud VPCs, subnets, routers, and the public internet. When an alert fires for increased latency or request timeouts, network diagnostics allow you to pinpoint packet loss, MTU issues, DNS failure, or TLS handshake delays.

---

## 1. What to Learn: Core Networking Primitives

### A. The OSI & TCP/IP Stack
* **Layer 7 (Application):** HTTP/HTTPS, DNS, gRPC, SSH, SMTP.
* **Layer 4 (Transport):** TCP (connection-oriented, guaranteed delivery, 3-way handshake, flow control, congestion window) vs UDP (connectionless, low latency, DNS queries, streaming).
* **Layer 3 (Network):** IP (IPv4 CIDR notation, IPv6), routing tables, ICMP (\`ping\`).
* **Layer 2 (Data Link):** Ethernet frames, MAC addresses, ARP resolution.

### B. TCP 3-Way Handshake & Termination
\`\`\`
Client                                 Server
  |                 SYN                  |
  | -----------------------------------> |  (Server allocates TCB, responds SYN-ACK)
  |               SYN-ACK                |
  | <----------------------------------- |
  |                 ACK                  |
  | -----------------------------------> |  (Connection ESTABLISHED)
\`\`\`
* Termination: \`FIN\` ➔ \`ACK\` ➔ \`FIN\` ➔ \`ACK\` (or abnormal termination via \`RST\`).

### C. DNS: How Domain Names Work
* Recursive vs Authoritative DNS servers.
* Resolution path: Browser cache ➔ OS resolver (\`/etc/resolv.conf\`) ➔ Local DNS / CoreDNS ➔ Root server (\`.\`) ➔ TLD server (\`.com\`) ➔ Authoritative nameserver.
* Core Record Types:
  * \`A\` (IPv4 address), \`AAAA\` (IPv6 address)
  * \`CNAME\` (Canonical name alias)
  * \`MX\` (Mail exchange), \`TXT\` (Verification / SPF)
  * \`NS\` (Authoritative nameservers), \`SOA\` (Start of Authority)
  * \`PTR\` (Reverse DNS lookup)
* TTL (Time to Live) caching implications during incident failovers.

### D. HTTP/1.1, HTTP/2 & HTTPS Protocols
* Request Methods: \`GET\`, \`POST\`, \`PUT\`, \`DELETE\`, \`PATCH\`, \`HEAD\`, \`OPTIONS\`.
* Status Codes: 2xx (Success), 3xx (Redirection), 4xx (Client Error), 5xx (Server Error).
* TLS Handshake: Certificate validation, asymmetric key exchange (RSA/ECDH), symmetric session encryption (AES-GCM).

### E. Ports & Sockets
* Standard ports: 80 (HTTP), 443 (HTTPS), 22 (SSH), 53 (DNS), 3306 (MySQL), 5432 (Postgres), 6379 (Redis), 9090 (Prometheus).
* Socket definition: IP address + Protocol + Port number.
* States: \`LISTEN\`, \`SYN_SENT\`, \`ESTABLISHED\`, \`FIN_WAIT\`, \`TIME_WAIT\`, \`CLOSE_WAIT\`.

### F. Troubleshooting Tools
* \`ping\` (ICMP echo, network connectivity & RTT)
* \`traceroute\` / \`mtr\` (Hop-by-hop latency and packet loss)
* \`netstat\` / \`ss -tulpn\` (Socket statistics and listening ports)
* \`curl -v\` / \`curl -w "@format.txt"\` (HTTP request lifecycle timing: DNS, TCP, TLS, TTFB)
* \`dig +trace api.example.com\` (DNS root-to-leaf resolution trace)
* \`tcpdump -nn -i eth0 port 443\` (Packet capture)

### G. Firewalls & Security Groups
* Packet filtering: \`iptables\`, \`nftables\`, \`ufw\`.
* Cloud Security Groups (stateful) vs Network ACLs (stateless).
`,
      lessonNote: ''
    },
    {
      id: 'f1a00002-0002-4000-a000-000000000001',
      title: '2. Networking Basics — Recommended Resources',
      type: 'markdown',
      resource: 'https://www.youtube.com/@PracticalNetworking',
      phaseId: 'phase-1',
      phaseTitle: 'Phase 1: Foundation (Months 1–3)',
      topicId: 'p1-t2',
      topicTitle: '2. Networking Basics',
      kind: 'resource',
      estimatedMinutes: 30,
      order: 5,
      isCompleted: false,
      completeDate: null,
      createdAt: now,
      notes: `# 2. Networking Basics: Authoritative Resources

The following resources are directly recommended by Santhosh Kumar Jampala's roadmap:

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

### 3. Supplementary SRE References
* Julia Evans' networking zines: *"Networking! Acks, Packets & Sockets"*
* Wireshark Sample Captures repository
`,
      lessonNote: ''
    },
    {
      id: 'f1a00002-0003-4000-a000-000000000001',
      title: '2. Networking Basics — Practice Projects & Exercises',
      type: 'markdown',
      resource: '',
      phaseId: 'phase-1',
      phaseTitle: 'Phase 1: Foundation (Months 1–3)',
      topicId: 'p1-t2',
      topicTitle: '2. Networking Basics',
      kind: 'practice',
      estimatedMinutes: 60,
      order: 6,
      isCompleted: false,
      completeDate: null,
      createdAt: now,
      notes: `# 2. Networking Basics: Practice Projects

**Roadmap Requirements:**
1. Set up a simple web server and understand the request flow.
2. Use Wireshark or tcpdump to capture and analyze network traffic.

---

### Step-by-Step Lab Instructions

#### Exercise 1: Web Server Request Flow & Latency Breakdown
1. Run an Nginx web server on your VM: \`sudo apt install nginx -y\`
2. Create a \`curl\` timing format file named \`curl-format.txt\`:
\`\`\`text
    time_namelookup:  %{time_namelookup}s\\n
       time_connect:  %{time_connect}s\\n
    time_appconnect:  %{time_appconnect}s\\n
   time_pretransfer:  %{time_pretransfer}s\\n
      time_redirect:  %{time_redirect}s\\n
 time_starttransfer:  %{time_starttransfer}s\\n
                    ----------\\n
         time_total:  %{time_total}s\\n
\`\`\`
3. Execute: \`curl -w "@curl-format.txt" -o /dev/null -s https://example.com\`
4. Document the exact difference between \`time_namelookup\` (DNS), \`time_connect\` (TCP 3-way handshake), \`time_appconnect\` (TLS handshake), and \`time_starttransfer\` (TTFB - Time to First Byte).

#### Exercise 2: Packet Capture Analysis with tcpdump & Wireshark
1. On your Linux VM, initiate packet capture on port 80:
\`\`\`bash
sudo tcpdump -nn -i any port 80 -w /tmp/http_capture.pcap
\`\`\`
2. In a separate terminal, curl localhost: \`curl http://localhost\`
3. Stop tcpdump with Ctrl+C.
4. Inspect the capture:
\`\`\`bash
tcpdump -nn -r /tmp/http_capture.pcap
\`\`\`
5. Identify the three packets of the TCP 3-way handshake:
   - Packet 1: Flags \`[S]\` (SYN) with sequence number \`seq X\`
   - Packet 2: Flags \`[S.]\` (SYN-ACK) with \`seq Y, ack X+1\`
   - Packet 3: Flags \`[.]\` (ACK) with \`seq X+1, ack Y+1\`
`,
      lessonNote: ''
    },

    // TOPIC 3: Basic Scripting (Bash)
    {
      id: 'f1a00003-0001-4000-a000-000000000001',
      title: '3. Basic Scripting (Bash) — Automation Fundamentals',
      type: 'markdown',
      resource: '',
      phaseId: 'phase-1',
      phaseTitle: 'Phase 1: Foundation (Months 1–3)',
      topicId: 'p1-t3',
      topicTitle: '3. Basic Scripting (Bash)',
      kind: 'concept',
      estimatedMinutes: 60,
      order: 7,
      isCompleted: false,
      completeDate: null,
      createdAt: now,
      notes: `# 3. Basic Scripting (Bash): SRE Automation

**Why it matters:** Automation is core to SRE work. Repetitive manual tasks ("toil") create reliability hazards and consume engineering capacity. Bash is ubiquitous across every Linux machine, container, and cloud init boot sequence.

---

## 1. What to Learn: Essential Bash Programming

### A. Defensive Scripting Boilerplate
Production Bash scripts must never fail silently:
\`\`\`bash
#!/usr/bin/env bash
set -euo pipefail
IFS=$'\\n\\t'
\`\`\`
* \`-e\`: Exit immediately if any command exits with a non-zero status.
* \`-u\`: Treat unset variables as an error and exit immediately.
* \`-o pipefail\`: Return the exit status of the last command in the pipeline that failed, not the last command executed.

### B. Variables & Data Types
* Quoting rules: Double quotes \`"...\` allow variable expansion; single quotes \`'...\` treat contents as literal strings.
* Special variables: \`$0\` (script name), \`$1..\$9\` (arguments), \`$#\` (arg count), \`$@\` (all args), \`$?\` (exit code of last command), \`$$\` (PID of script).

### C. Conditionals & Tests
* Modern test syntax: \`[[ ... ]]\` (avoids word splitting bugs of \`[ ... ]\`).
* String comparisons: \`[[ "$str1" == "$str2" ]]\`, \`[[ -z "$empty_str" ]]\`.
* Numeric comparisons: \`(( count > 10 ))\` or \`[[ "$count" -gt 10 ]]\`.
* File checks: \`[[ -f /path/file ]]\`, \`[[ -d /path/dir ]]\`, \`[[ -s /path/file ]]\` (file exists and not empty).

### D. Loops & Iteration
* C-style loop: \`for (( i=0; i<10; i++ )); do ...; done\`
* List iteration: \`for item in "${array[@]}"; do ...; done\`
* While loop with streaming file read (safe against large files):
\`\`\`bash
while IFS= read -r line; do
  echo "Processing: $line"
done < "/path/to/logfile.log"
\`\`\`

### E. Functions & Variable Scoping
* Always declare function-scoped variables with \`local\`:
\`\`\`bash
log_message() {
  local level="$1"
  local msg="$2"
  printf '[%s] [%s] %s\\n' "$(date -u +'%Y-%m-%dT%H:%M:%SZ')" "$level" "$msg" >&2
}
\`\`\`

### F. File I/O & Redirection
* Standard streams: \`stdin\` (0), \`stdout\` (1), \`stderr\` (2).
* Redirecting stdout and stderr: \`command > /tmp/out.log 2>&1\` or \`command &> /tmp/out.log\`.
* Discarding output: \`command > /dev/null 2>&1\`.
* Here-documents: \`cat << 'EOF' > /tmp/config.conf\`

### G. Error Handling & Traps
* Using \`trap\` to clean up temporary resources on script exit or interrupt (\`EXIT\`, \`SIGINT\`, \`SIGTERM\`):
\`\`\`bash
cleanup() {
  local exit_code=$?
  rm -rf "$TMP_DIR"
  exit "$exit_code"
}
trap cleanup EXIT
\`\`\`

### H. Scheduling with Cron & Systemd Timers
* Cron syntax: \`* * * * * command\` (minute, hour, day of month, month, day of week).
* Modern alternative: Systemd Timers with journalctl logging and dependency management.
`,
      lessonNote: ''
    },
    {
      id: 'f1a00003-0002-4000-a000-000000000001',
      title: '3. Basic Scripting (Bash) — Recommended Resources',
      type: 'markdown',
      resource: 'https://www.shellcheck.net',
      phaseId: 'phase-1',
      phaseTitle: 'Phase 1: Foundation (Months 1–3)',
      topicId: 'p1-t3',
      topicTitle: '3. Basic Scripting (Bash)',
      kind: 'resource',
      estimatedMinutes: 30,
      order: 8,
      isCompleted: false,
      completeDate: null,
      createdAt: now,
      notes: `# 3. Basic Scripting (Bash): Authoritative Resources

The following resources are explicitly recommended by Santhosh Kumar Jampala's roadmap:

### 1. *"Bash Guide for Beginners"* by Machtelt Garrels
* **Format:** Free complete guide ([tldp.org/LDP/Bash-Beginners-Guide/html/](https://tldp.org/LDP/Bash-Beginners-Guide/html/))
* **Core Topics:**
  * Bash basics & environment
  * Regular expressions & sed/gawk
  * Writing interactive scripts
  * Conditionals & loops

### 2. [ShellCheck](https://www.shellcheck.net/)
* **Format:** Static analysis tool for shell scripts.
* **Why SREs use it:** Automatically catches subtle bugs, quoting pitfalls, subshell escaping mistakes, and non-portable syntax before code touches servers.
* **CLI Usage:** \`shellcheck myscript.sh\`

### 3. Google Shell Style Guide
* Reference: [google.github.io/styleguide/shellguide.html](https://google.github.io/styleguide/shellguide.html)
`,
      lessonNote: ''
    },
    {
      id: 'f1a00003-0003-4000-a000-000000000001',
      title: '3. Basic Scripting (Bash) — Practice Projects & Exercises',
      type: 'markdown',
      resource: '',
      phaseId: 'phase-1',
      phaseTitle: 'Phase 1: Foundation (Months 1–3)',
      topicId: 'p1-t3',
      topicTitle: '3. Basic Scripting (Bash)',
      kind: 'practice',
      estimatedMinutes: 60,
      order: 9,
      isCompleted: false,
      completeDate: null,
      createdAt: now,
      notes: `# 3. Basic Scripting (Bash): Practice Projects

**Roadmap Requirements:**
1. Write a script to back up files.
2. Create a system health monitoring script.
3. Automate log file rotation.

---

### Step-by-Step Lab Instructions

#### Project 1: Automated Timestamped Backup Script
Write a script \`backup.sh\` that:
1. Takes a source directory and destination backup directory as arguments.
2. Creates a compressed archive: \`tar -czf "$DEST_DIR/backup-$(date +%Y%m%d_%H%M%S).tar.gz" -C "$SRC_DIR" .\`
3. Verifies the archive integrity (\`tar -tzf\`).
4. Implements retention: automatically removes backups older than 7 days (\`find "$DEST_DIR" -name "*.tar.gz" -mtime +7 -delete\`).

#### Project 2: System Health Monitor & Alerting Script
Write a script \`sys_monitor.sh\` that:
1. Checks CPU load average against the number of CPU cores.
2. Checks RAM available percentage (\`free\`).
3. Checks disk usage on all physical partitions (\`df -Ph\`).
4. Logs warnings to syslog via \`logger -t sre_monitor\`.

#### Project 3: Automated Log Rotation Script
Write a script \`rotate_logs.sh\` that:
1. Scans \`/var/log/custom-app/*.log\`.
2. For files exceeding 100MB, moves them to \`filename.YYYY-MM-DD.gz\` and creates a fresh empty log file with matching permissions.
3. Sends \`SIGHUP\` to the application daemon so it reopens the log file handle.
`,
      lessonNote: ''
    },

    // =========================================================================
    // PHASE 2: CORE SKILLS (Months 4–6)
    // =========================================================================

    // TOPIC 4: Version Control (Git)
    {
      id: 'f2a00004-0001-4000-a000-000000000001',
      title: '4. Version Control (Git) — Git Fundamentals & Collaboration',
      type: 'markdown',
      resource: '',
      phaseId: 'phase-2',
      phaseTitle: 'Phase 2: Core Skills (Months 4–6)',
      topicId: 'p2-t4',
      topicTitle: '4. Version Control (Git)',
      kind: 'concept',
      estimatedMinutes: 60,
      order: 10,
      isCompleted: false,
      completeDate: null,
      createdAt: now,
      notes: `# 4. Version Control (Git): Collaboration & GitOps

**Why it matters:** Essential for collaboration and Infrastructure as Code (IaC). In modern SRE organizations, infrastructure is defined as code stored in Git (GitOps). Every change, rollback, playbook, and Kubernetes manifest is managed via Git commits, pull requests, and peer reviews.

---

## 1. What to Learn: Git Internals & Workflows

### A. Git Basics & Object Model
* The Three Trees: Working Directory, Staging Area (Index), Git Repository (Commit History).
* Core commands: \`git init\`, \`git clone\`, \`git status\`, \`git add\`, \`git commit -m\`, \`git push\`, \`git pull --rebase\`.
* Inspection: \`git log --oneline --graph --decorate\`, \`git diff\`, \`git show <commit>\`.

### B. Branching, Merging & Rebase
* Branch creation & switching: \`git checkout -b feature/alerting\` or \`git switch -c feature/alerting\`.
* Merging: Fast-forward vs 3-way merge commit (\`git merge\`).
* Rebasing: \`git rebase main\` (keeps a linear history for clean audits).
* Conflict Resolution: Identifying merge conflicts (\`<<<<<<<\`, \`=======\`, \`>>>>>>>\`), resolving, and staging.

### C. GitHub/GitLab Workflows & Pull Requests
* Fork & Pull Request model.
* Writing descriptive PR descriptions: What changed, why, test evidence, rollback plan.
* Code reviews & approving reviews before production deployment.
* Protected branches: Requiring CI status checks to pass before merging into \`main\`.

### D. \`.gitignore\` & Secret Safety
* Preventing secrets and transient artifacts from entering history: \`.env\`, \`*.pem\`, \`*.tfstate\`, \`node_modules/\`, \`__pycache__/\`.
* Removing accidentally committed secrets from history: \`git filter-repo\` or BFG Repo-Cleaner.
`,
      lessonNote: ''
    },
    {
      id: 'f2a00004-0002-4000-a000-000000000001',
      title: '4. Version Control (Git) — Recommended Resources',
      type: 'markdown',
      resource: 'https://learngitbranching.js.org',
      phaseId: 'phase-2',
      phaseTitle: 'Phase 2: Core Skills (Months 4–6)',
      topicId: 'p2-t4',
      topicTitle: '4. Version Control (Git)',
      kind: 'resource',
      estimatedMinutes: 30,
      order: 11,
      isCompleted: false,
      completeDate: null,
      createdAt: now,
      notes: `# 4. Version Control (Git): Authoritative Resources

The following resources are explicitly recommended by Santhosh Kumar Jampala's roadmap:

### 1. *Pro Git* Book by Scott Chacon and Ben Straub
* **Format:** Complete free online book ([git-scm.com/book/en/v2](https://git-scm.com/book/en/v2))
* **Essential Chapters:**
  * Chapter 1: Getting Started
  * Chapter 2: Git Basics
  * Chapter 3: Git Branching
  * Chapter 7: Git Tools (Stashing, Rewriting History, Bisect)

### 2. [Learn Git Branching](https://learngitbranching.js.org/)
* **Format:** Interactive visual git simulation tutorial.
* **Covers:** Visualizing branches, commits, cherry-pick, interactive rebase (\`rebase -i\`), and remote tracking branches.
`,
      lessonNote: ''
    },
    {
      id: 'f2a00004-0003-4000-a000-000000000001',
      title: '4. Version Control (Git) — Practice Projects & Exercises',
      type: 'markdown',
      resource: '',
      phaseId: 'phase-2',
      phaseTitle: 'Phase 2: Core Skills (Months 4–6)',
      topicId: 'p2-t4',
      topicTitle: '4. Version Control (Git)',
      kind: 'practice',
      estimatedMinutes: 60,
      order: 12,
      isCompleted: false,
      completeDate: null,
      createdAt: now,
      notes: `# 4. Version Control (Git): Practice Projects

**Roadmap Requirements:**
1. Create a GitHub account.
2. Version control your scripts.
3. Contribute to an open source project.

---

### Step-by-Step Lab Instructions

#### Exercise 1: Version Control Your Automation Scripts
1. Initialize a Git repository on your local machine:
\`\`\`bash
mkdir sre-toolbox && cd sre-toolbox
git init
\`\`\`
2. Add your Bash monitoring scripts, create a comprehensive \`README.md\` and a secure \`.gitignore\`.
3. Create a GitHub repository and push your code using SSH authentication:
\`\`\`bash
git remote add origin git@github.com:<your-username>/sre-toolbox.git
git branch -M main
git push -u origin main
\`\`\`

#### Exercise 2: Branching, Conflict Simulation & Interactive Rebase
1. Create branch \`feature/disk-check\`, make a commit modifying line 10 of a script.
2. Switch back to \`main\` and make a conflicting commit on the same line.
3. Merge \`feature/disk-check\` into \`main\`, manually resolve the conflict, verify the file, and commit.
4. Practice interactive rebasing: \`git rebase -i HEAD~3\` to squash commits and reword commit messages to adhere to Conventional Commits standards.
`,
      lessonNote: ''
    },

    // TOPIC 5: Programming Fundamentals (Python)
    {
      id: 'f2a00005-0001-4000-a000-000000000001',
      title: '5. Programming Fundamentals (Python) — Automation & APIs',
      type: 'markdown',
      resource: '',
      phaseId: 'phase-2',
      phaseTitle: 'Phase 2: Core Skills (Months 4–6)',
      topicId: 'p2-t5',
      topicTitle: '5. Programming Fundamentals (Python)',
      kind: 'concept',
      estimatedMinutes: 60,
      order: 13,
      isCompleted: false,
      completeDate: null,
      createdAt: now,
      notes: `# 5. Programming Fundamentals (Python): SRE Automation

**Why it matters:** Python is the most common language for SRE automation, tooling, cloud SDKs (Boto3), and data parsing. When shell scripts become complex, Python offers robust data structures, structured logging, testing frameworks, and maintainable API clients.

---

## 1. What to Learn: Python for Infrastructure Engineering

### A. Data Structures & Language Fundamentals
* Primitive types: \`int\`, \`float\`, \`str\`, \`bool\`.
* Collections: Lists (dynamic arrays), Tuples (immutable records), Dictionaries (hash maps for JSON data), Sets (unique membership checks).
* List & dictionary comprehensions for clean filtering.

### B. Functions, Modules & Virtual Environments
* Modular code: \`def func(*args, **kwargs) -> return_type:\`
* Virtual environments: Isolating project dependencies using \`python3 -m venv venv && source venv/bin/activate\`.
* Dependency management: \`pip freeze > requirements.txt\` or \`pyproject.toml\`.

### C. File I/O Operations & Streaming
* Context managers (\`with open(...) as f:\`) guaranteeing file descriptor cleanup.
* Memory-efficient streaming reads for large log files (line-by-line generators).

### D. Working with APIs (\`requests\` library)
* Handling HTTP methods: \`requests.get()\`, \`requests.post()\`.
* **Defensive SRE rule:** Never make un-timed network calls! Always set explicit timeouts: \`requests.get(url, timeout=5.0)\`.
* Status code verification (\`response.raise_for_status()\`) and JSON parsing (\`response.json()\`).

### E. Error Handling & Structured Logging
* Exception handling: \`try ... except requests.RequestException as exc:\`
* Using the \`logging\` module with structured formatting (ISO timestamps, log levels: DEBUG, INFO, WARNING, ERROR, CRITICAL).

### F. Regular Expressions (\`re\` module)
* Extracting IP addresses, timestamps, HTTP status codes, and latency values from raw text logs.
`,
      lessonNote: ''
    },
    {
      id: 'f2a00005-0002-4000-a000-000000000001',
      title: '5. Programming Fundamentals (Python) — Recommended Resources',
      type: 'markdown',
      resource: 'https://automatetheboringstuff.com',
      phaseId: 'phase-2',
      phaseTitle: 'Phase 2: Core Skills (Months 4–6)',
      topicId: 'p2-t5',
      topicTitle: '5. Programming Fundamentals (Python)',
      kind: 'resource',
      estimatedMinutes: 30,
      order: 14,
      isCompleted: false,
      completeDate: null,
      createdAt: now,
      notes: `# 5. Programming Fundamentals (Python): Authoritative Resources

The following resources are explicitly recommended by Santhosh Kumar Jampala's roadmap:

### 1. *"Automate the Boring Stuff with Python"* by Al Sweigart
* **Format:** Free complete online book ([automatetheboringstuff.com](https://automatetheboringstuff.com))
* **Key Chapters for SREs:**
  * Chapter 8: Reading and Writing Files
  * Chapter 9: Organizing Files
  * Chapter 10: Debugging
  * Chapter 12: Web Scraping & API Requests

### 2. [Real Python](https://realpython.com/)
* **Recommended Tutorials:**
  * Python Virtual Environments: A Primer
  * Python Requests Library Guide
  * Logging in Python: Best Practices

### 3. *"Python Crash Course"* by Eric Matthes
* Practical, project-based introduction to idiomatic Python programming.
`,
      lessonNote: ''
    },
    {
      id: 'f2a00005-0003-4000-a000-000000000001',
      title: '5. Programming Fundamentals (Python) — Practice Projects & Exercises',
      type: 'markdown',
      resource: '',
      phaseId: 'phase-2',
      phaseTitle: 'Phase 2: Core Skills (Months 4–6)',
      topicId: 'p2-t5',
      topicTitle: '5. Programming Fundamentals (Python)',
      kind: 'practice',
      estimatedMinutes: 60,
      order: 15,
      isCompleted: false,
      completeDate: null,
      createdAt: now,
      notes: `# 5. Programming Fundamentals (Python): Practice Projects

**Roadmap Requirements:**
1. Build a log parser.
2. Create a simple API client.
3. Automate a repetitive task from your daily work.

---

### Step-by-Step Lab Instructions

#### Project 1: Nginx Access Log Parser
Write \`log_parser.py\` that:
1. Streams an Nginx combined access log without loading the entire file into memory.
2. Uses regex to extract IP, timestamp, method, endpoint, status code, and response time.
3. Computes: Total requests, 4xx count, 5xx error percentage, and top 5 requested endpoints.
4. Outputs the summary as pretty-printed JSON.

#### Project 2: Cloud / Service Status API Checker
Write \`status_checker.py\` that:
1. Queries public status APIs (e.g. GitHub Status API: \`https://www.githubstatus.com/api/v2/status.json\`).
2. Validates response latency and reports component health.
3. Emits exit code 0 if healthy, 1 if degraded or major outage.
`,
      lessonNote: ''
    },

    // TOPIC 6: Databases Basics
    {
      id: 'f2a00006-0001-4000-a000-000000000001',
      title: '6. Databases Basics — SQL, PostgreSQL/MySQL & Admin',
      type: 'markdown',
      resource: '',
      phaseId: 'phase-2',
      phaseTitle: 'Phase 2: Core Skills (Months 4–6)',
      topicId: 'p2-t6',
      topicTitle: '6. Databases Basics',
      kind: 'concept',
      estimatedMinutes: 60,
      order: 16,
      isCompleted: false,
      completeDate: null,
      createdAt: now,
      notes: `# 6. Databases Basics: Reliability & Administration

**Why it matters:** Most applications rely on databases. In production, database exhaustion (connection pool exhaustion, lock contention, slow queries, disk fullness) is one of the most common causes of high-severity incidents. SREs must know how databases function, how to take backups, and how to triage queries.

---

## 1. What to Learn: Relational Database Fundamentals

### A. SQL Fundamentals
* DDL (Data Definition Language): \`CREATE TABLE\`, \`ALTER TABLE\`, \`DROP TABLE\`.
* DML (Data Manipulation Language): \`SELECT\`, \`INSERT\`, \`UPDATE\`, \`DELETE\`.
* Filtering, grouping & joins: \`WHERE\`, \`GROUP BY\`, \`HAVING\`, \`ORDER BY\`, \`INNER JOIN\`, \`LEFT JOIN\`.
* Aggregations: \`COUNT()\`, \`AVG()\`, \`SUM()\`, \`MAX()\`, \`MIN()\`.

### B. Database Concepts
* **ACID Properties:** Atomicity, Consistency, Isolation, Durability.
* **Indexes:** B-Tree indexes, compound indexes, index cardinality, and avoiding full table scans.
* **Relationships:** Primary Keys, Foreign Keys, One-to-Many, Many-to-Many.

### C. PostgreSQL / MySQL Administration
* Starting/stopping services with \`systemctl\`.
* Configuration tuning: \`max_connections\`, \`shared_buffers\`, \`work_mem\`, \`innodb_buffer_pool_size\`.
* Connection pooling: Why applications need connection poolers (PgBouncer) to avoid per-connection process overhead.

### D. Backup & Restore Procedures
* Logical backups: \`pg_dump\`, \`mysqldump\`.
* Physical backups & WAL archiving (Write-Ahead Logging) for Point-In-Time Recovery (PITR).
* Testing backup restoration drills regularly (RTO and RPO validation).

### E. Performance Monitoring Basics
* Inspecting active queries: \`pg_stat_activity\` in Postgres or \`SHOW PROCESSLIST\` in MySQL.
* Query execution plans: \`EXPLAIN ANALYZE <query>\` to identify sequential scans, index scans, and buffer hits.
`,
      lessonNote: ''
    },
    {
      id: 'f2a00006-0002-4000-a000-000000000001',
      title: '6. Databases Basics — Recommended Resources',
      type: 'markdown',
      resource: 'https://sqlbolt.com',
      phaseId: 'phase-2',
      phaseTitle: 'Phase 2: Core Skills (Months 4–6)',
      topicId: 'p2-t6',
      topicTitle: '6. Databases Basics',
      kind: 'resource',
      estimatedMinutes: 30,
      order: 17,
      isCompleted: false,
      completeDate: null,
      createdAt: now,
      notes: `# 6. Databases Basics: Authoritative Resources

The following resources are explicitly recommended by Santhosh Kumar Jampala's roadmap:

### 1. [SQLBolt](https://sqlbolt.com/)
* **Format:** Interactive, browser-based SQL tutorial.
* **Covers:** SQL queries, constraints, table operations, aggregations, and subqueries.

### 2. [PostgreSQL Tutorial](https://www.postgresqltutorial.com/)
* **Key Topics:**
  * PostgreSQL Administration
  * Indexes & Performance Optimization
  * Backup & Restore with \`pg_dump\`
  * Managing Transactions and Concurrency
`,
      lessonNote: ''
    },
    {
      id: 'f2a00006-0003-4000-a000-000000000001',
      title: '6. Databases Basics — Practice Projects & Exercises',
      type: 'markdown',
      resource: '',
      phaseId: 'phase-2',
      phaseTitle: 'Phase 2: Core Skills (Months 4–6)',
      topicId: 'p2-t6',
      topicTitle: '6. Databases Basics',
      kind: 'practice',
      estimatedMinutes: 60,
      order: 18,
      isCompleted: false,
      completeDate: null,
      createdAt: now,
      notes: `# 6. Databases Basics: Practice Projects

**Roadmap Requirements:**
1. Set up a database server.
2. Create a simple database schema.
3. Write queries to analyze data.

---

### Step-by-Step Lab Instructions

#### Exercise 1: PostgreSQL Local Setup & Schema Creation
1. Install PostgreSQL on your Linux VM or run via Docker:
\`\`\`bash
docker run -d --name sre-postgres -e POSTGRES_PASSWORD=postgres -p 5432:5432 postgres:15
\`\`\`
2. Connect using \`psql\`:
\`\`\`sql
CREATE DATABASE incident_db;
\\c incident_db

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
\`\`\`

#### Exercise 2: Analytical SQL & Backup Automation
1. Insert sample incident records across Tier-1 and Tier-2 services.
2. Write analytical queries:
   - Total downtime minutes per service.
   - Average incident duration grouped by severity.
3. Write a shell script \`db_backup.sh\` that runs \`pg_dump\`, compresses the output with gzip, and logs the execution to verify Point-in-Time Recovery readiness.
`,
      lessonNote: ''
    },

    // TOPIC 7: Containerization (Docker)
    {
      id: 'f2a00007-0001-4000-a000-000000000001',
      title: '7. Containerization (Docker) — Container Architecture & Compose',
      type: 'markdown',
      resource: '',
      phaseId: 'phase-2',
      phaseTitle: 'Phase 2: Core Skills (Months 4–6)',
      topicId: 'p2-t7',
      topicTitle: '7. Containerization (Docker)',
      kind: 'concept',
      estimatedMinutes: 60,
      order: 19,
      isCompleted: false,
      completeDate: null,
      createdAt: now,
      notes: `# 7. Containerization (Docker): Modern SRE Packaging

**Why it matters:** Containers are the standard for modern application deployment. They provide immutable, reproducible deployment artifacts across local development, CI/CD pipelines, and Kubernetes clusters.

---

## 1. What to Learn: Container Mechanics

### A. Containers vs Virtual Machines
* **Virtual Machines:** Hypervisor (Type 1 or 2), guest kernel, full OS stack, slow startup, high memory overhead.
* **Containers:** Share the host Linux kernel. Isolation achieved via kernel primitives:
  * **Linux Namespaces:** PID (process tree), NET (network interfaces/ports), MNT (filesystem mounts), IPC (inter-process comms), UTS (hostname), USER (UID mappings).
  * **Control Groups (cgroups v1/v2):** Enforce hard resource limits on CPU, Memory, Disk I/O, and PIDs.
  * **Union Filesystem (OverlayFS):** Copy-on-Write (CoW) layered filesystem.

### B. Docker Core Primitives
* **Images:** Immutable read-only layers with a manifest.
* **Containers:** Writable layer instantiated on top of an image.
* **Volumes:** Persistent storage managed outside the container union filesystem.
* **CLI:** \`docker build\`, \`docker run\`, \`docker ps -a\`, \`docker logs -f\`, \`docker exec -it\`, \`docker stop\`, \`docker rm\`.

### C. Production Dockerfile Best Practices
1. **Multi-Stage Builds:** Compile in a heavy build stage, copy only artifacts to a minimal runtime stage (e.g. Alpine or Distroless).
2. **Layer Caching:** Copy dependency manifests (\`package.json\`, \`requirements.txt\`) before source code.
3. **Non-Root Execution:** Never run as root inside a container (\`USER nonroot:nonroot\`).
4. **Healthchecks:** Provide explicit \`HEALTHCHECK\` instructions.

### D. Docker Compose for Multi-Container Applications
* Declarative multi-container orchestration for local dev and testing.
* Defining services, networks, volumes, and environment variables in \`docker-compose.yml\`.
`,
      lessonNote: ''
    },
    {
      id: 'f2a00007-0002-4000-a000-000000000001',
      title: '7. Containerization (Docker) — Recommended Resources',
      type: 'markdown',
      resource: 'https://labs.play-with-docker.com',
      phaseId: 'phase-2',
      phaseTitle: 'Phase 2: Core Skills (Months 4–6)',
      topicId: 'p2-t7',
      topicTitle: '7. Containerization (Docker)',
      kind: 'resource',
      estimatedMinutes: 30,
      order: 20,
      isCompleted: false,
      completeDate: null,
      createdAt: now,
      notes: `# 7. Containerization (Docker): Authoritative Resources

The following resources are explicitly recommended by Santhosh Kumar Jampala's roadmap:

### 1. Docker Official Documentation
* [docs.docker.com/get-started/](https://docs.docker.com/get-started/)
* Comprehensive coverage of image building, networking, and volumes.

### 2. *"Learn Docker in a Month of Lunches"* by Elton Stoneman
* Hands-on, practical guide covering container packaging, multi-stage builds, security, and compose setups.

### 3. [Play with Docker](https://labs.play-with-docker.com/)
* Free interactive browser-based Docker playground for testing multi-container architectures.
`,
      lessonNote: ''
    },
    {
      id: 'f2a00007-0003-4000-a000-000000000001',
      title: '7. Containerization (Docker) — Practice Projects & Exercises',
      type: 'markdown',
      resource: '',
      phaseId: 'phase-2',
      phaseTitle: 'Phase 2: Core Skills (Months 4–6)',
      topicId: 'p2-t7',
      topicTitle: '7. Containerization (Docker)',
      kind: 'practice',
      estimatedMinutes: 60,
      order: 21,
      isCompleted: false,
      completeDate: null,
      createdAt: now,
      notes: `# 7. Containerization (Docker): Practice Projects

**Roadmap Requirements:**
1. Containerize a simple web application.
2. Create a multi-tier application with Docker Compose.
3. Build and push images to Docker Hub.

---

### Step-by-Step Lab Instructions

#### Exercise 1: Multi-Stage Python/Node Application
Write a hardened multi-stage \`Dockerfile\`:
\`\`\`dockerfile
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
\`\`\`

#### Exercise 2: Multi-Tier Compose Architecture
Create a \`docker-compose.yml\` running:
1. **Web App:** Custom Python/Node web service.
2. **Cache:** Redis for session caching.
3. **Database:** PostgreSQL with a persistent volume.
4. **Proxy:** Nginx reverse proxy routing external port 80 to web app.
5. Verify container networking and test graceful service restart.
`,
      lessonNote: ''
    },

    // =========================================================================
    // PHASE 3: INFRASTRUCTURE & CLOUD (Months 7–9)
    // =========================================================================

    // TOPIC 8: Cloud Platforms (AWS example)
    {
      id: 'f3a00008-0001-4000-a000-000000000001',
      title: '8. Cloud Platforms (AWS) — Architecture, Networking & IAM',
      type: 'markdown',
      resource: '',
      phaseId: 'phase-3',
      phaseTitle: 'Phase 3: Infrastructure & Cloud (Months 7–9)',
      topicId: 'p3-t8',
      topicTitle: '8. Cloud Platforms (AWS)',
      kind: 'concept',
      estimatedMinutes: 60,
      order: 22,
      isCompleted: false,
      completeDate: null,
      createdAt: now,
      notes: `# 8. Cloud Platforms (AWS): Cloud Infrastructure for SREs

**Why it matters:** Most modern infrastructure is hosted on cloud platforms (AWS, GCP, or Azure). SREs must understand cloud networking, elasticity, IAM security boundaries, compute models, and storage redundancy.

---

## 1. What to Learn: Core AWS Services & Concepts

### A. Core Cloud Primitives
* **EC2 (Elastic Compute Cloud):** Instances, AMIs, Instance Types (Compute, Memory, General Purpose), EBS block volumes, User Data scripts.
* **S3 (Simple Storage Service):** Object storage, Buckets, Storage Classes (Standard, Infrequent Access, Glacier), Bucket Policies, Versioning, Lifecycle rules.
* **IAM (Identity and Access Management):** Users, Groups, Roles, Policies (Least Privilege), Instance Profiles, MFA.

### B. Cloud Networking & VPC Architecture
\`\`\`
+--------------------------------------------------------------+
|                         AWS Region                           |
|  +--------------------------------------------------------+  |
|  |                Virtual Private Cloud (VPC)             |  |
|  |                     (10.0.0.0/16)                      |  |
|  |  Internet Gateway (IGW)                                |  |
|  |                                                        |  |
|  |  +--------------------+        +--------------------+  |  |
|  |  | Public Subnet (AZ A) |        | Public Subnet (AZ B)|  |  |
|  |  |  [ALB / NAT Gateway] |        |  [ALB / NAT Gateway]|  |  |
|  |  +----------|---------+        +----------|---------+  |  |
|  |             |                             |            |  |
|  |  +----------v---------+        +----------v---------+  |  |
|  |  |Private Subnet (AZ A)|        |Private Subnet (AZ B)|  |  |
|  |  | [EC2 / Auto Scaling]|        | [EC2 / Auto Scaling]|  |  |
|  |  +--------------------+        +--------------------+  |  |
|  +--------------------------------------------------------+  |
+--------------------------------------------------------------+
\`\`\`
* Public Subnets: Direct route to an Internet Gateway (IGW).
* Private Subnets: Outbound internet access only via NAT Gateways.
* Route Tables, Security Groups (stateful), Network ACLs (stateless).

### C. Elasticity & High Availability
* **Application Load Balancers (ALB):** Layer 7 routing, health checks, TLS termination.
* **Auto Scaling Groups (ASG):** Scaling policies based on CloudWatch metrics (CPU target tracking, request count per target).

### D. Security & Cost Management
* AWS Free Tier management, Billing Alarms, AWS Budgets.
* Security best practices: No root user API keys, enforce MFA, encrypt EBS and S3 at rest.
`,
      lessonNote: ''
    },
    {
      id: 'f3a00008-0002-4000-a000-000000000001',
      title: '8. Cloud Platforms (AWS) — Recommended Resources',
      type: 'markdown',
      resource: 'https://aws.amazon.com/free/',
      phaseId: 'phase-3',
      phaseTitle: 'Phase 3: Infrastructure & Cloud (Months 7–9)',
      topicId: 'p3-t8',
      topicTitle: '8. Cloud Platforms (AWS)',
      kind: 'resource',
      estimatedMinutes: 30,
      order: 23,
      isCompleted: false,
      completeDate: null,
      createdAt: now,
      notes: `# 8. Cloud Platforms: Authoritative Resources

The following resources are explicitly recommended by Santhosh Kumar Jampala's roadmap:

### 1. AWS Free Tier Account
* [aws.amazon.com/free/](https://aws.amazon.com/free/)
* 12 months free tier with EC2 (\`t2.micro\`/\`t3.micro\`), S3 (5GB), RDS, and CloudWatch.

### 2. AWS Certified Solutions Architect Associate (SAA) Path
* Comprehensive overview of resilient, secure, high-performing cloud architectures.

### 3. A Cloud Guru / Linux Academy / Adrian Cantrill
* Renowned in-depth video training with practical cloud diagramming and real-world VPC labs.
`,
      lessonNote: ''
    },
    {
      id: 'f3a00008-0003-4000-a000-000000000001',
      title: '8. Cloud Platforms (AWS) — Practice Projects & Exercises',
      type: 'markdown',
      resource: '',
      phaseId: 'phase-3',
      phaseTitle: 'Phase 3: Infrastructure & Cloud (Months 7–9)',
      topicId: 'p3-t8',
      topicTitle: '8. Cloud Platforms (AWS)',
      kind: 'practice',
      estimatedMinutes: 60,
      order: 24,
      isCompleted: false,
      completeDate: null,
      createdAt: now,
      notes: `# 8. Cloud Platforms: Practice Projects

**Roadmap Requirements:**
1. Deploy a web application on EC2.
2. Set up a VPC with public/private subnets.
3. Implement auto-scaling based on load.

---

### Step-by-Step Lab Instructions

#### Exercise 1: Resilient Multi-AZ VPC Architecture
1. In the AWS Management Console or AWS CLI, create a custom VPC with CIDR \`10.0.0.0/16\`.
2. Provision two Public Subnets across two Availability Zones (\`us-east-1a\`, \`us-east-1b\`).
3. Provision two Private Subnets across the same AZs.
4. Attach an Internet Gateway and route public subnets to it.
5. Deploy a NAT Gateway in a public subnet to allow private instances to update packages.

#### Exercise 2: Application Load Balancer & Auto-Scaling
1. Deploy an EC2 instance in a private subnet running a sample web application.
2. Configure an Application Load Balancer in public subnets with health checks targeting \`/health\`.
3. Create an Auto Scaling Group with a minimum size of 2 and maximum of 4.
4. Test failover: Terminate an instance manually and observe the ASG automatically spawning a healthy replacement instance.
`,
      lessonNote: ''
    },

    // TOPIC 9: Configuration Management (Ansible)
    {
      id: 'f3a00009-0001-4000-a000-000000000001',
      title: '9. Configuration Management (Ansible) — Playbooks & Roles',
      type: 'markdown',
      resource: '',
      phaseId: 'phase-3',
      phaseTitle: 'Phase 3: Infrastructure & Cloud (Months 7–9)',
      topicId: 'p3-t9',
      topicTitle: '9. Configuration Management (Ansible)',
      kind: 'concept',
      estimatedMinutes: 60,
      order: 25,
      isCompleted: false,
      completeDate: null,
      createdAt: now,
      notes: `# 9. Configuration Management (Ansible): Scalable Automation

**Why it matters:** SREs manage fleets of tens, hundreds, or thousands of servers. Manually configuring servers via SSH leads to configuration drift, unreproducible environments, and human errors. Configuration management tools enforce desired state consistently.

---

## 1. What to Learn: Ansible Fundamentals

### A. Infrastructure as Code & Idempotency
* **Idempotency:** Executing a playbook once or a hundred times results in the exact same state without unintended side effects.
* **Agentless Architecture:** Ansible requires no agent on target hosts; it communicates over standard SSH and uses Python.

### B. Ansible Inventory
* Static INI/YAML inventories:
\`\`\`ini
[webservers]
web1.example.com ansible_host=10.0.1.10
web2.example.com ansible_host=10.0.1.11

[dbservers]
db1.example.com ansible_host=10.0.2.10

[production:children]
webservers
dbservers
\`\`\`
* Host variables and group variables (\`group_vars/\`, \`host_vars/\`).

### C. Playbooks & Modules
* YAML syntax: Strict indentation, lists, mappings.
* Common Ansible modules:
  * \`ansible.builtin.apt\` / \`yum\`: Package management
  * \`ansible.builtin.template\`: Jinja2 templating for config files
  * \`ansible.builtin.systemd\`: Service state management
  * \`ansible.builtin.user\` / \`group\`: Security and account provisioning
  * \`ansible.builtin.copy\` / \`file\`: File permissions and state

### D. Ansible Roles & Best Practices
* Reusable structure: \`roles/<role_name>/{tasks, handlers, templates, vars, defaults, meta}\`.
* Handlers: Triggering service restarts only when a configuration file is actually modified (\`notify: restart nginx\`).
`,
      lessonNote: ''
    },
    {
      id: 'f3a00009-0002-4000-a000-000000000001',
      title: '9. Configuration Management (Ansible) — Recommended Resources',
      type: 'markdown',
      resource: 'https://docs.ansible.com',
      phaseId: 'phase-3',
      phaseTitle: 'Phase 3: Infrastructure & Cloud (Months 7–9)',
      topicId: 'p3-t9',
      topicTitle: '9. Configuration Management (Ansible)',
      kind: 'resource',
      estimatedMinutes: 30,
      order: 26,
      isCompleted: false,
      completeDate: null,
      createdAt: now,
      notes: `# 9. Configuration Management (Ansible): Authoritative Resources

The following resources are explicitly recommended by Santhosh Kumar Jampala's roadmap:

### 1. Ansible Official Documentation
* [docs.ansible.com](https://docs.ansible.com)
* User Guide, Modules Index, and Best Practices.

### 2. *"Ansible for DevOps"* by Jeff Geerling
* [ansiblefordevops.com](https://www.ansiblefordevops.com/)
* The definitive guide to server automation, orchestration, and continuous testing with Ansible.
`,
      lessonNote: ''
    },
    {
      id: 'f3a00009-0003-4000-a000-000000000001',
      title: '9. Configuration Management (Ansible) — Practice Projects & Exercises',
      type: 'markdown',
      resource: '',
      phaseId: 'phase-3',
      phaseTitle: 'Phase 3: Infrastructure & Cloud (Months 7–9)',
      topicId: 'p3-t9',
      topicTitle: '9. Configuration Management (Ansible)',
      kind: 'practice',
      estimatedMinutes: 60,
      order: 27,
      isCompleted: false,
      completeDate: null,
      createdAt: now,
      notes: `# 9. Configuration Management (Ansible): Practice Projects

**Roadmap Requirements:**
1. Write playbooks to configure servers.
2. Automate application deployment.
3. Create reusable roles.

---

### Step-by-Step Lab Instructions

#### Exercise 1: Server Hardening & Nginx Provisioning Playbook
Write an idempotent playbook \`site.yml\`:
\`\`\`yaml
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
\`\`\`

#### Exercise 2: Building a Reusable Monitoring Role
Create an Ansible role \`roles/node_exporter\` that downloads the Prometheus \`node_exporter\` binary, sets up a dedicated systemd service, and configures firewall rules.
`,
      lessonNote: ''
    },

    // =========================================================================
    // PHASE 4: ADVANCED SRE CONCEPTS (Months 10–12)
    // =========================================================================

    // TOPIC 10: Monitoring & Observability
    {
      id: 'f4a0010-0001-4000-a000-000000000001',
      title: '10. Monitoring & Observability — Metrics, Prometheus, Grafana & SLOs',
      type: 'markdown',
      resource: '',
      phaseId: 'phase-4',
      phaseTitle: 'Phase 4: Advanced SRE Concepts (Months 10–12)',
      topicId: 'p4-t10',
      topicTitle: '10. Monitoring & Observability',
      kind: 'concept',
      estimatedMinutes: 60,
      order: 28,
      isCompleted: false,
      completeDate: null,
      createdAt: now,
      notes: `# 10. Monitoring & Observability: The Core of SRE

**Why it matters:** *"You can't improve what you can't measure."* Observability provides visibility into internal system health based on external telemetry. Without real-time telemetry, SREs cannot detect regressions, verify deployments, or troubleshoot production incidents.

---

## 1. What to Learn: Telemetry & Reliability Math

### A. The Three Pillars of Observability
1. **Metrics:** Aggregatable numeric measurements over time (Counters, Gauges, Histograms, Summaries).
2. **Logs:** Structured, timestamped event records detailing specific operations.
3. **Traces:** End-to-end journey of a request navigating across distributed microservices.

### B. Prometheus & Grafana Architecture
* **Pull-based model:** Prometheus periodically scrapes \`/metrics\` HTTP endpoints exposed by exporters (\`node_exporter\`) and applications.
* **PromQL (Prometheus Query Language):**
  * Rate calculation: \`rate(http_requests_total[5m])\`
  * 99th percentile latency: \`histogram_quantile(0.99, sum(rate(http_request_duration_seconds_bucket[5m])) by (le))\`
  * Error rate percentage: \`sum(rate(http_requests_total{status=~"5.."}[5m])) / sum(rate(http_requests_total[5m])) * 100\`
* **Alertmanager:** Grouping, deduplication, silencing, and routing alerts to PagerDuty or Slack.
* **Grafana:** Visualizing dashboards, defining variables, and building operational views.

### C. The Four Golden Signals & Alerting Philosophy
Google SRE's Four Golden Signals:
1. **Latency:** Time taken to service a request (distinguish successful requests from failed requests).
2. **Traffic:** Demand placed on system (HTTP requests/sec or network I/O).
3. **Errors:** Rate of requests that fail explicitly or implicitly.
4. **Saturation:** How "full" the system is (CPU, Memory, connection pool headroom).

### D. Service Level Objectives (SLIs, SLOs, SLAs) & Error Budgets
* **SLI (Service Level Indicator):** A quantifiable metric of service performance (e.g. % of HTTP requests returning < 200ms).
* **SLO (Service Level Objective):** Target reliability agreed by SRE and Product (e.g. 99.9% of requests successful over 30 days).
* **SLA (Service Level Agreement):** Legal contract with customers with financial penalties if breached.
* **Error Budget:** Allowed unreliability: \`100% - SLO\`. At 99.9% SLO, the budget is 0.1% (approx 43.8 minutes downtime per month).
`,
      lessonNote: ''
    },
    {
      id: 'f4a0010-0002-4000-a000-000000000001',
      title: '10. Monitoring & Observability — Recommended Resources',
      type: 'markdown',
      resource: 'https://sre.google/books/',
      phaseId: 'phase-4',
      phaseTitle: 'Phase 4: Advanced SRE Concepts (Months 10–12)',
      topicId: 'p4-t10',
      topicTitle: '10. Monitoring & Observability',
      kind: 'resource',
      estimatedMinutes: 30,
      order: 29,
      isCompleted: false,
      completeDate: null,
      createdAt: now,
      notes: `# 10. Monitoring & Observability: Authoritative Resources

The following resources are explicitly recommended by Santhosh Kumar Jampala's roadmap:

### 1. *"The Art of Monitoring"* by James Turnbull
* Comprehensive architectural guide to modern telemetry, collection pipelines, and alerting.

### 2. Prometheus & Grafana Official Documentation
* [prometheus.io/docs/](https://prometheus.io/docs/)
* [grafana.com/docs/](https://grafana.com/docs/)

### 3. Google's SRE Books (Free Online)
* [sre.google/books/](https://sre.google/books/)
* Chapters on Monitoring Distributed Systems, Being On-Call, and Service Level Objectives.
`,
      lessonNote: ''
    },
    {
      id: 'f4a0010-0003-4000-a000-000000000001',
      title: '10. Monitoring & Observability — Practice Projects & Exercises',
      type: 'markdown',
      resource: '',
      phaseId: 'phase-4',
      phaseTitle: 'Phase 4: Advanced SRE Concepts (Months 10–12)',
      topicId: 'p4-t10',
      topicTitle: '10. Monitoring & Observability',
      kind: 'practice',
      estimatedMinutes: 60,
      order: 30,
      isCompleted: false,
      completeDate: null,
      createdAt: now,
      notes: `# 10. Monitoring & Observability: Practice Projects

**Roadmap Requirements:**
1. Set up Prometheus and Grafana.
2. Create dashboards for your applications.
3. Implement alerting rules.
4. Define SLOs for a service.

---

### Step-by-Step Lab Instructions

#### Exercise 1: Deploying Prometheus & Grafana Monitoring Stack
1. Deploy Prometheus and Grafana using Docker Compose.
2. Configure Prometheus to scrape both \`node_exporter\` (infrastructure metrics) and your sample application (\`/metrics\`).
3. Build a Grafana dashboard displaying the Four Golden Signals.

#### Exercise 2: Implementing SLOs & Burn Rate Alerts
1. Define a 99.5% availability SLO for your application.
2. Configure multi-window multi-burn-rate alerting rules in Prometheus to detect rapid error budget depletion (e.g. 14.4x burn rate over 1 hour).
`,
      lessonNote: ''
    },

    // TOPIC 11: CI/CD Pipelines
    {
      id: 'f4a0011-0001-4000-a000-000000000001',
      title: '11. CI/CD Pipelines — Automated Testing, Delivery & Rollouts',
      type: 'markdown',
      resource: '',
      phaseId: 'phase-4',
      phaseTitle: 'Phase 4: Advanced SRE Concepts (Months 10–12)',
      topicId: 'p4-t11',
      topicTitle: '11. CI/CD Pipelines',
      kind: 'concept',
      estimatedMinutes: 60,
      order: 31,
      isCompleted: false,
      completeDate: null,
      createdAt: now,
      notes: `# 11. CI/CD Pipelines: Deployment Safety & Automation

**Why it matters:** Automated deployment is crucial for reliability. High deployment frequency with low change failure rate (DORA metrics) is achievable only with automated testing, linting, container builds, and safe progressive deployment strategies (canary/blue-green).

---

## 1. What to Learn: Pipeline Architecture

### A. CI/CD Core Concepts
* **Continuous Integration (CI):** Developers frequently merge code into main; automated workflows run unit tests, integration tests, and static security scans (SAST).
* **Continuous Delivery (CD):** Automated deployment to staging/production environments with automated rollbacks upon failure.

### B. Pipeline As Code (GitHub Actions / GitLab CI)
* Defining workflows in YAML (\`.github/workflows/ci.yml\`).
* Triggers: \`on: [push, pull_request, workflow_dispatch]\`.
* Jobs, Steps, Runners, and Artifact Caching.

### C. Deployment Strategies & Blast Radius Reduction
1. **Recreate:** Stop old version, start new version (downtime).
2. **Rolling Update:** Gradually replace pods/instances one by one (zero downtime).
3. **Blue/Green Deployment:** Run two identical environments; switch traffic via router/load balancer.
4. **Canary Deployment:** Route a small percentage of real traffic (e.g. 5%) to the new version; monitor error rate and latency; promote or roll back automatically.
`,
      lessonNote: ''
    },
    {
      id: 'f4a0011-0002-4000-a000-000000000001',
      title: '11. CI/CD Pipelines — Recommended Resources',
      type: 'markdown',
      resource: 'https://docs.gitlab.com/ee/ci/',
      phaseId: 'phase-4',
      phaseTitle: 'Phase 4: Advanced SRE Concepts (Months 10–12)',
      topicId: 'p4-t11',
      topicTitle: '11. CI/CD Pipelines',
      kind: 'resource',
      estimatedMinutes: 30,
      order: 32,
      isCompleted: false,
      completeDate: null,
      createdAt: now,
      notes: `# 11. CI/CD Pipelines: Authoritative Resources

The following resources are explicitly recommended by Santhosh Kumar Jampala's roadmap:

### 1. Jenkins Official Documentation
* [jenkins.io/doc/](https://www.jenkins.io/doc/)
* Jenkinsfiles, Declarative Pipelines, and Multibranch setups.

### 2. GitLab CI/CD Tutorials
* [docs.gitlab.com/ee/ci/](https://docs.gitlab.com/ee/ci/)
* Industry-leading CI/CD documentation and runner architecture.

### 3. *"Continuous Delivery"* by Jez Humble & David Farley
* The seminal book on automated builds, test automation, and release management.
`,
      lessonNote: ''
    },
    {
      id: 'f4a0011-0003-4000-a000-000000000001',
      title: '11. CI/CD Pipelines — Practice Projects & Exercises',
      type: 'markdown',
      resource: '',
      phaseId: 'phase-4',
      phaseTitle: 'Phase 4: Advanced SRE Concepts (Months 10–12)',
      topicId: 'p4-t11',
      topicTitle: '11. CI/CD Pipelines',
      kind: 'practice',
      estimatedMinutes: 60,
      order: 33,
      isCompleted: false,
      completeDate: null,
      createdAt: now,
      notes: `# 11. CI/CD Pipelines: Practice Projects

**Roadmap Requirements:**
1. Build a CI/CD pipeline for a sample application.
2. Implement automated testing.
3. Set up deployment to multiple environments.

---

### Step-by-Step Lab Instructions

#### Exercise 1: GitHub Actions CI Pipeline with Security Gates
Create \`.github/workflows/deploy.yml\` that:
1. Runs linter (\`flake8\` or \`eslint\`) and unit tests (\`pytest\`).
2. Builds the Docker container image and scans it for CVE vulnerabilities using Trivy.
3. Pushes the image to GitHub Packages (GHCR) only on \`main\` branch pushes.
4. Triggers an automated deployment to a staging server.
`,
      lessonNote: ''
    },

    // TOPIC 12: Kubernetes (Container Orchestration)
    {
      id: 'f4a0012-0001-4000-a000-000000000001',
      title: '12. Kubernetes — Architecture, Deployments, Services & Helm',
      type: 'markdown',
      resource: '',
      phaseId: 'phase-4',
      phaseTitle: 'Phase 4: Advanced SRE Concepts (Months 10–12)',
      topicId: 'p4-t12',
      topicTitle: '12. Kubernetes (Container Orchestration)',
      kind: 'concept',
      estimatedMinutes: 60,
      order: 34,
      isCompleted: false,
      completeDate: null,
      createdAt: now,
      notes: `# 12. Kubernetes: Production Container Orchestration

**Why it matters:** Kubernetes is the industry standard for container orchestration. It automates container provisioning, scaling, service discovery, load balancing, rolling updates, and self-healing.

---

## 1. What to Learn: Kubernetes Internals

### A. Cluster Architecture
* **Control Plane:**
  * \`kube-apiserver\`: Central REST API entrypoint for all cluster state.
  * \`etcd\`: Distributed consistent key-value store holding entire cluster state.
  * \`kube-scheduler\`: Assigns newly created Pods to healthy Worker Nodes based on resource requests/limits.
  * \`kube-controller-manager\`: Reconciles actual state with desired state (Deployment, ReplicaSet, Node controllers).
* **Worker Nodes:**
  * \`kubelet\`: Node agent ensuring containers described in PodSpecs are running.
  * \`kube-proxy\`: Manages network packet routing (iptables/IPVS) for Kubernetes Services.
  * Container Runtime (containerd/CRI-O).

### B. Core Kubernetes Objects
* **Pods:** The smallest deployable unit in Kubernetes (one or more tightly coupled containers).
* **Deployments & ReplicaSets:** Declarative updates and pod replica management.
* **Services:** Stable networking endpoint: \`ClusterIP\` (internal), \`NodePort\`, \`LoadBalancer\`.
* **ConfigMaps & Secrets:** Decoupling configuration data and credentials from container images.
* **Ingress:** Layer 7 HTTP/HTTPS routing into cluster services.

### C. Health Probes & Resource Management
* \`startupProbe\`, \`livenessProbe\` (restarts deadlocked containers), \`readinessProbe\` (controls traffic routing).
* Resource \`requests\` (scheduling) and \`limits\` (OOMKill and CPU throttling).

### D. Helm (Package Management)
* Templated Kubernetes manifests, values files (\`values.yaml\`), and chart release versioning.
`,
      lessonNote: ''
    },
    {
      id: 'f4a0012-0002-4000-a000-000000000001',
      title: '12. Kubernetes — Recommended Resources',
      type: 'markdown',
      resource: 'https://kubernetes.io/docs/tutorials/',
      phaseId: 'phase-4',
      phaseTitle: 'Phase 4: Advanced SRE Concepts (Months 10–12)',
      topicId: 'p4-t12',
      topicTitle: '12. Kubernetes (Container Orchestration)',
      kind: 'resource',
      estimatedMinutes: 30,
      order: 35,
      isCompleted: false,
      completeDate: null,
      createdAt: now,
      notes: `# 12. Kubernetes: Authoritative Resources

The following resources are explicitly recommended by Santhosh Kumar Jampala's roadmap:

### 1. Kubernetes Official Tutorials
* [kubernetes.io/docs/tutorials/](https://kubernetes.io/docs/tutorials/)
* Interactive tutorials covering cluster setup, deployment, and service exposure.

### 2. *"Kubernetes Up & Running"* by Brendan Burns, Joe Beda, & Kelsey Hightower
* Written by the co-founders of Kubernetes. Comprehensive operational walkthrough.

### 3. [KillerCoda](https://killercoda.com/)
* Free interactive browser-based Kubernetes scenarios for hands-on debugging.
`,
      lessonNote: ''
    },
    {
      id: 'f4a0012-0003-4000-a000-000000000001',
      title: '12. Kubernetes — Practice Projects & Exercises',
      type: 'markdown',
      resource: '',
      phaseId: 'phase-4',
      phaseTitle: 'Phase 4: Advanced SRE Concepts (Months 10–12)',
      topicId: 'p4-t12',
      topicTitle: '12. Kubernetes (Container Orchestration)',
      kind: 'practice',
      estimatedMinutes: 60,
      order: 36,
      isCompleted: false,
      completeDate: null,
      createdAt: now,
      notes: `# 12. Kubernetes: Practice Projects

**Roadmap Requirements:**
1. Set up a local cluster (\`minikube\` or \`kind\`).
2. Deploy a multi-tier application.
3. Implement rolling updates and rollbacks.
4. Set up monitoring with Prometheus.

---

### Step-by-Step Lab Instructions

#### Exercise 1: Provisioning a Local Cluster with kind
1. Install \`kind\` (Kubernetes in Docker) and \`kubectl\`.
2. Provision a multi-node cluster (1 control plane + 2 worker nodes):
\`\`\`yaml
kind: Cluster
apiVersion: kind.x-k8s.io/v1alpha4
nodes:
- role: control-plane
- role: worker
- role: worker
\`\`\`
3. Verify cluster status: \`kubectl get nodes -o wide\`

#### Exercise 2: Resilient Deployment, Zero-Downtime Rollout & Rollback
1. Deploy a multi-tier web application (Deployment, Service, ConfigMap).
2. Configure readiness and liveness probes.
3. Trigger a rolling update: \`kubectl set image deployment/webapp webapp=webapp:v2\`
4. Observe rollout status: \`kubectl rollout status deployment/webapp\`
5. Simulate a failed rollout and rollback immediately: \`kubectl rollout undo deployment/webapp\`
`,
      lessonNote: ''
    },

    // TOPIC 13: Incident Management & On-Call
    {
      id: 'f4a0013-0001-4000-a000-000000000001',
      title: '13. Incident Management & On-Call — Procedures, Runbooks & Retros',
      type: 'markdown',
      resource: '',
      phaseId: 'phase-4',
      phaseTitle: 'Phase 4: Advanced SRE Concepts (Months 10–12)',
      topicId: 'p4-t13',
      topicTitle: '13. Incident Management & On-Call',
      kind: 'concept',
      estimatedMinutes: 60,
      order: 37,
      isCompleted: false,
      completeDate: null,
      createdAt: now,
      notes: `# 13. Incident Management & On-Call: SRE Crisis Leadership

**Why it matters:** Responding to incidents is a core SRE responsibility. When outages occur, structured command, clear communication, actionable runbooks, and blameless post-mortem retrospectives turn failures into long-term system resilience.

---

## 1. What to Learn: Incident Command & Postmortems

### A. Incident Response Procedures
* **Severity Levels:** SEV-1 (Critical outage, customer impact), SEV-2 (Major degradation), SEV-3 (Minor issue).
* **Incident Command System (ICS):**
  * **Incident Commander (IC):** Drives the triage, coordinates responders, delegates investigation, makes high-level decisions.
  * **Operations Lead:** Executes technical commands and mitigations.
  * **Communications Lead:** Updates internal stakeholders and external status pages.

### B. On-Call Best Practices
* Clear shift rotations, escalation policies, and alert hygiene (paging only for actionable problems).
* Reducing alert fatigue: Non-actionable alerts must be converted to tickets, not phone pages.

### C. Runbooks & Actionable Documentation
* Every alert MUST link directly to a runbook.
* Runbook structure: Symptoms, impact, diagnostic steps, mitigation steps, escalation contacts.

### D. Blameless Post-Mortems
* **Core Philosophy:** Humans are fallible; accidents are the result of system vulnerabilities, inadequate tooling, or missing safeguards—never personal negligence.
* **Timeline of Events:** Precise timestamped record from first anomalous metric to final mitigation.
* **Root Cause vs Contributing Factors:** The 5 Whys methodology.
* **Action Items:** Preventive engineering tasks assigned to owners with deadlines to prevent recurrence.
`,
      lessonNote: ''
    },
    {
      id: 'f4a0013-0002-4000-a000-000000000001',
      title: '13. Incident Management & On-Call — Recommended Resources',
      type: 'markdown',
      resource: 'https://sre.google/sre-book/incident-response/',
      phaseId: 'phase-4',
      phaseTitle: 'Phase 4: Advanced SRE Concepts (Months 10–12)',
      topicId: 'p4-t13',
      topicTitle: '13. Incident Management & On-Call',
      kind: 'resource',
      estimatedMinutes: 30,
      order: 38,
      isCompleted: false,
      completeDate: null,
      createdAt: now,
      notes: `# 13. Incident Management: Authoritative Resources

The following resources are explicitly recommended by Santhosh Kumar Jampala's roadmap:

### 1. *"Incident Management for Operations"* by Rob Schnepp, Ron Vidal, & Chris Hawley
* Comprehensive guide applying FEMA Incident Command System (ICS) principles to tech operations.

### 2. Google SRE Book — Chapter on Incident Response
* [sre.google/sre-book/incident-response/](https://sre.google/sre-book/incident-response/)
* Managing incidents, triage, delegation, and retaining composure under operational pressure.

### 3. Atlassian Incident Management Handbook
* [atlassian.com/incident-management](https://www.atlassian.com/incident-management)
* Real-world workflows, templates for post-mortems, and on-call escalation guides.
`,
      lessonNote: ''
    },
    {
      id: 'f4a0013-0003-4000-a000-000000000001',
      title: '13. Incident Management & On-Call — Practice Projects & Exercises',
      type: 'markdown',
      resource: '',
      phaseId: 'phase-4',
      phaseTitle: 'Phase 4: Advanced SRE Concepts (Months 10–12)',
      topicId: 'p4-t13',
      topicTitle: '13. Incident Management & On-Call',
      kind: 'practice',
      estimatedMinutes: 60,
      order: 39,
      isCompleted: false,
      completeDate: null,
      createdAt: now,
      notes: `# 13. Incident Management: Practice Projects

**Roadmap Requirements:**
1. Write runbooks for common issues.
2. Conduct a mock incident drill.
3. Write a sample post-mortem.

---

### Step-by-Step Lab Instructions

#### Exercise 1: Production Runbook Authoring
Write an actionable runbook for: \`Alert: HighHTTP5xxRateOnPaymentService\`.
Must include:
1. Trigger condition and SLO impact.
2. 3 triage commands (log inspection, status query, pod restart).
3. Rollback procedure and failover to secondary gateway.

#### Exercise 2: Conducting a Mock Incident Drill & Blameless Post-Mortem
1. Simulate a database connection pool exhaustion incident.
2. Write a comprehensive, blameless post-mortem document including executive summary, customer impact (SLO error budget consumed), exact timeline (UTC), 5 Whys analysis, and preventive action items.
`,
      lessonNote: ''
    },

    // =========================================================================
    // PHASE 5: SPECIALIZATION & GROWTH (Month 13+)
    // =========================================================================

    // TOPIC 14: Choose Your Focus Areas
    {
      id: 'f5a0014-0001-4000-a000-000000000001',
      title: '14. Choose Your Focus Areas — Advanced Tracks & Architecture',
      type: 'markdown',
      resource: '',
      phaseId: 'phase-5',
      phaseTitle: 'Phase 5: Specialization & Growth (Month 13+)',
      topicId: 'p5-t14',
      topicTitle: '14. Choose Your Focus Areas',
      kind: 'concept',
      estimatedMinutes: 60,
      order: 40,
      isCompleted: false,
      completeDate: null,
      createdAt: now,
      notes: `# 14. Choose Your Focus Areas: SRE Specialization

**Why it matters:** Once foundational and core SRE skills are internalized, senior engineering paths diverge into specialized domains. Choosing focus areas allows you to build deep domain mastery and high leverage.

---

## 1. Focus Tracks Defined by the Roadmap

### Track A: Infrastructure & Platform Engineering
* **Advanced Kubernetes:** Custom Resource Definitions (CRDs), writing Kubernetes Operators in Go, Advanced Admission Controllers.
* **Service Mesh:** Istio or Linkerd (transparent mTLS encryption, traffic shifting, distributed circuit breaking).
* **Infrastructure as Code:** Advanced Terraform / Pulumi (state management, module registries, drift detection).
* **Multi-Cloud Strategies:** Designing workloads capable of running across AWS, GCP, and on-premise clusters.

### Track B: Observability & Performance Engineering
* **Distributed Tracing:** OpenTelemetry standard, Jaeger, and Tempo.
* **Performance Engineering:** Linux profiling with eBPF (\`bpftrace\`), kernel flame graphs, memory leak triage.
* **Chaos Engineering:** Chaos Mesh, LitmusChaos, injecting network delays and packet drops to validate resiliency.

### Track C: Security & Compliance (DevSecOps)
* **Secrets Management:** HashiCorp Vault (dynamic secrets, PKI engine, automated lease rotation).
* **Compliance Frameworks:** SOC 2, ISO 27001, CIS benchmarks.
* **Security Scanning:** Container image scanning, SBOMs, supply-chain security (Sigstore/Cosign).
`,
      lessonNote: ''
    },
    {
      id: 'f5a0014-0002-4000-a000-000000000001',
      title: '14. Choose Your Focus Areas — Recommended Resources',
      type: 'markdown',
      resource: 'https://landscape.cncf.io',
      phaseId: 'phase-5',
      phaseTitle: 'Phase 5: Specialization & Growth (Month 13+)',
      topicId: 'p5-t14',
      topicTitle: '14. Choose Your Focus Areas',
      kind: 'resource',
      estimatedMinutes: 30,
      order: 41,
      isCompleted: false,
      completeDate: null,
      createdAt: now,
      notes: `# 14. Focus Areas: Authoritative Resources

The following resources support Phase 5 specialization:

### 1. [CNCF Cloud Native Interactive Landscape](https://landscape.cncf.io/)
* Map of container orchestration, service mesh, observability, and security tools.

### 2. Istio & Linkerd Official Documentation
* [istio.io/latest/docs/](https://istio.io/latest/docs/)
* Architecture, Envoy proxy sidecars, and traffic management rules.

### 3. HashiCorp Vault Learn Portal
* [developer.hashicorp.com/vault/tutorials](https://developer.hashicorp.com/vault/tutorials)
* Dynamic secrets generation and Kubernetes pod integration.
`,
      lessonNote: ''
    },
    {
      id: 'f5a0014-0003-4000-a000-000000000001',
      title: '14. Choose Your Focus Areas — Practice Projects & Capstones',
      type: 'markdown',
      resource: '',
      phaseId: 'phase-5',
      phaseTitle: 'Phase 5: Specialization & Growth (Month 13+)',
      topicId: 'p5-t14',
      topicTitle: '14. Choose Your Focus Areas',
      kind: 'practice',
      estimatedMinutes: 60,
      order: 42,
      isCompleted: false,
      completeDate: null,
      createdAt: now,
      notes: `# 14. Focus Areas: Practice Projects

Implement an end-to-end focus track project:
1. **Platform Project:** Deploy a Service Mesh on your cluster and configure 90/10 canary traffic splitting between v1 and v2 with automatic mutual TLS.
2. **Observability Project:** Instrument a distributed microservice with OpenTelemetry and trace a transaction from ingress to database.
3. **Resilience Project:** Run a Chaos Engineering experiment injecting 300ms network latency into database queries and verify client timeout circuit breaking.
`,
      lessonNote: ''
    },

    // TOPIC 15: Soft Skills Development
    {
      id: 'f5a0015-0001-4000-a000-000000000001',
      title: '15. Soft Skills Development — Communication & Cross-Team Leadership',
      type: 'markdown',
      resource: '',
      phaseId: 'phase-5',
      phaseTitle: 'Phase 5: Specialization & Growth (Month 13+)',
      topicId: 'p5-t15',
      topicTitle: '15. Soft Skills Development',
      kind: 'concept',
      estimatedMinutes: 60,
      order: 43,
      isCompleted: false,
      completeDate: null,
      createdAt: now,
      notes: `# 15. Soft Skills Development: Engineering Leadership

**Why it matters:** SRE is collaborative and communication-heavy. You are negotiating reliability contracts (SLOs) with product managers, guiding developers during architectural reviews, leading stressful incident channels, and mentoring junior engineers.

---

## 1. What to Develop: Core Soft Skills

### A. Technical Writing & Design Docs
* Writing Request for Comments (RFCs) and Architecture Decision Records (ADRs).
* Structuring proposals: Problem statement, non-goals, alternatives considered, security implications, migration path, and rollback plan.

### B. Collaboration with Development Teams
* Shifting SRE from an "operations wall" to an enablement partner.
* Production Readiness Reviews (PRRs): Helping devs assess telemetry, failure modes, and capacity before launching services.

### C. Stakeholder Management & Negotiating SLOs
* Translating technical latency into business terms (conversion rate, revenue impact).
* Defending Error Budget policies constructively when product velocity threatens stability.

### D. Teaching, Mentoring & Socratic Guidance
* Pair debugging during on-call shadowing.
* Sharing knowledge via tech talks and internal workshops.
`,
      lessonNote: ''
    },
    {
      id: 'f5a0015-0002-4000-a000-000000000001',
      title: '15. Soft Skills Development — Recommended Resources',
      type: 'markdown',
      resource: 'https://developers.google.com/tech-writing',
      phaseId: 'phase-5',
      phaseTitle: 'Phase 5: Specialization & Growth (Month 13+)',
      topicId: 'p5-t15',
      topicTitle: '15. Soft Skills Development',
      kind: 'resource',
      estimatedMinutes: 30,
      order: 44,
      isCompleted: false,
      completeDate: null,
      createdAt: now,
      notes: `# 15. Soft Skills: Authoritative Resources

The following resources are explicitly recommended for technical communication:

### 1. [Google Technical Writing Courses](https://developers.google.com/tech-writing)
* **Technical Writing One & Two:** Free courses on clear sentences, active voice, document structure, and creating clear technical diagrams.

### 2. *"Staff Engineer: Leadership beyond the management track"* by Will Larson
* Navigation of influence, writing technical proposals, and cross-team alignment.
`,
      lessonNote: ''
    },
    {
      id: 'f5a0015-0003-4000-a000-000000000001',
      title: '15. Soft Skills Development — Practice Projects & Exercises',
      type: 'markdown',
      resource: '',
      phaseId: 'phase-5',
      phaseTitle: 'Phase 5: Specialization & Growth (Month 13+)',
      topicId: 'p5-t15',
      topicTitle: '15. Soft Skills Development',
      kind: 'practice',
      estimatedMinutes: 60,
      order: 45,
      isCompleted: false,
      completeDate: null,
      createdAt: now,
      notes: `# 15. Soft Skills: Practice Projects

**Roadmap Requirements:**
1. Author an Architecture Decision Record (ADR) or Production RFC proposing a new SRE standard (e.g. standardizing on structured JSON logging).
2. Facilitate a mock blameless post-mortem retrospective with team members.
`,
      lessonNote: ''
    }
  ],

  // =========================================================================
  // GRADED SRE TASKS & ASSIGNMENTS (One per topic)
  // =========================================================================
  tasks: [
    {
      id: 't1a00001-0001-4000-a000-000000000001',
      title: 'Assignment 1: Linux Process & Disk Alerting System (Hands-on SRE Lab)',
      phaseId: 'phase-1',
      phaseTitle: 'Phase 1: Foundation (Months 1–3)',
      topicId: 'p1-t1',
      topicTitle: '1. Linux Fundamentals',
      status: 'NOT STARTED',
      createdAt: now,
      question: `# Assignment 1: Linux Process & Disk Alerting System

### Production Scenario
You are on-call for an e-commerce platform. Several production database replica nodes suffered severe degradation because a logging process filled the root partition (\`/\`) to 100% capacity. When root is full, Linux cannot create temporary files or allocate socket buffers, causing services to crash hard.

To prevent this from recurring, your team requires an automated diagnostic and alerting script that monitors disk capacity and flags runaway processes before an outage occurs.

---

### Tasks to Submit

#### 1. Shell Implementation
Write a production-quality Bash script named \`sre_disk_alert.sh\` that:
- Inspects all mounted filesystems using standard Unix tools (\`df\`).
- Excludes virtual pseudo-filesystems (e.g. \`tmpfs\`, \`devtmpfs\`, \`squashfs\`).
- Flags any partition where usage exceeds a configurable threshold (default **80%**).
- For flagged partitions, identifies the top 3 largest directories/files.
- Emits structured log output with timestamps to standard error/syslog.
- Adheres to defensive bash programming standards.

#### 2. Technical Explanation Questions
Answer the following system questions:
1. **The \`/proc\` Mystery:** A junior engineer deleted a 50GB log file with \`rm /var/log/app.log\`, but \`df -h\` still shows the disk at 100% full. Why did this happen according to Linux filesystem semantics, and how do you locate and release the disk space without restarting the server using \`/proc\` or \`lsof\`?
2. **Signals in Production:** What is the critical difference between \`kill -15\` (\`SIGTERM\`) and \`kill -9\` (\`SIGKILL\`)? Why should an SRE avoid using \`kill -9\` as a primary troubleshooting step?
3. **Execution Scheduling:** Compare running this script via standard \`cron\` vs a \`systemd timer\`. What advantages does a systemd timer provide for production observability?`,
      instruction: `You are a Senior SRE Mentor evaluating a junior engineer's Linux Fundamentals assignment.

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
### 🚀 Next Steps`
    },
    {
      id: 't1a00002-0001-4000-a000-000000000001',
      title: 'Assignment 2: Network Packet Trace Analysis & DNS Triage Report',
      phaseId: 'phase-1',
      phaseTitle: 'Phase 1: Foundation (Months 1–3)',
      topicId: 'p1-t2',
      topicTitle: '2. Networking Basics',
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
1. Diagnostic steps cover DNS, Layer 3 (ping/traceroute), Layer 4 (ss/tcpdump), and Layer 7 (curl -v).
2. TCP trace explanation recognizes SYN without SYN-ACK indicates packet drop or firewall filtering.
3. DNS resolution analysis demonstrates clear understanding of resolv.conf, recursive resolver, and testing with 'dig +trace'.

OUTPUT FORMAT:
## Evaluation: [PASS or NEEDS REVISION]
### 🎯 Executive Summary
### 🔍 Technical Strengths
### ⚠️ Gaps & Edge Cases
### 💡 Socratic Hint & Question
### 🚀 Next Steps`
    },
    {
      id: 't1a00003-0001-4000-a000-000000000001',
      title: 'Assignment 3: Production Health Check CLI Tool with Timeout & SSL Expiry',
      phaseId: 'phase-1',
      phaseTitle: 'Phase 1: Foundation (Months 1–3)',
      topicId: 'p1-t3',
      topicTitle: '3. Basic Scripting (Bash)',
      status: 'NOT STARTED',
      createdAt: now,
      question: `# Assignment 3: Automated Backup, Health Check & Rotation Suite

### Objective
Write an automated Bash production utility suite that demonstrates professional automation practices:
1. **Automated Backup:** \`backup_service.sh\` that takes backup directories, archives with timestamp, checks tar integrity, and purges files older than 7 days.
2. **System Health Check:** \`health_check.sh\` monitoring load average, RAM, and disk, emitting warnings to syslog.
3. **Log Rotation Automation:** \`rotate_logs.sh\` that safely compresses logs > 100MB and sends \`SIGHUP\` to the running daemon without dropping open connections.

Explain how you implemented error handling (\`set -euo pipefail\`) and signal traps.`,
      instruction: `You are a Senior SRE Mentor evaluating a Bash Scripting automation assignment.

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
### 🚀 Next Steps`
    },
    {
      id: 't2a00004-0001-4000-a000-000000000001',
      title: 'Assignment 4: Git Collaboration, Rebase & Secret Remediation Lab',
      phaseId: 'phase-2',
      phaseTitle: 'Phase 2: Core Skills (Months 4–6)',
      topicId: 'p2-t4',
      topicTitle: '4. Version Control (Git)',
      status: 'NOT STARTED',
      createdAt: now,
      question: `# Assignment 4: Git Collaboration & Emergency Secret Purge

### Production Scenario
An engineer accidentally committed an AWS IAM Access Key and Secret into the Git repository in commit \`c89f2a1\`, which was pushed to the remote repository. Simply committing a change that deletes the file does NOT remove the secret from Git history!

---

### Tasks to Submit
1. **Secret Remediation:** Detail the exact sequential steps and commands needed to permanently eradicate the secret from the entire commit history (using tools like \`git filter-repo\` or BFG) and force-push safely.
2. **Interactive Rebase:** Explain how to use \`git rebase -i\` to squash 4 messy "wip" commits into a single conventional commit before submitting a pull request.
3. **Merge vs Rebase:** Explain the trade-offs between a merge commit and a rebase strategy for infrastructure repositories.`,
      instruction: `You are a Senior SRE Mentor evaluating a Git Version Control assignment.

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
### 🚀 Next Steps`
    },
    {
      id: 't2a00005-0001-4000-a000-000000000001',
      title: 'Assignment 5: Production Python HTTP Health Checker with TLS Expiry',
      phaseId: 'phase-2',
      phaseTitle: 'Phase 2: Core Skills (Months 4–6)',
      topicId: 'p2-t5',
      topicTitle: '5. Programming Fundamentals (Python)',
      status: 'NOT STARTED',
      createdAt: now,
      question: `# Assignment 5: Production Python HTTP & TLS Health Checker

### Objective
Write a production-ready Python CLI tool named \`sre_healthcheck.py\` that monitors HTTP/HTTPS endpoints and validates availability, latency, and TLS certificate expiration.

---

### Requirements
1. Accept URLs via CLI argument (\`--url\`) or config file.
2. Inspect HTTP status code, total response time in ms, and catch timeouts without crashing.
3. Extract TLS certificate expiration timestamp using Python \`ssl\`/\`socket\` libraries and calculate days remaining.
4. Support \`--format json\` and \`--format text\`.
5. Return exit code 0 if all targets healthy and TLS cert > 14 days valid; exit code 1 otherwise.`,
      instruction: `You are a Senior SRE Mentor evaluating a Python automation assignment.

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
### 🚀 Next Steps`
    },
    {
      id: 't2a00006-0001-4000-a000-000000000001',
      title: 'Assignment 6: Database Slow Query Triage & Backup Recovery Runbook',
      phaseId: 'phase-2',
      phaseTitle: 'Phase 2: Core Skills (Months 4–6)',
      topicId: 'p2-t6',
      topicTitle: '6. Databases Basics',
      status: 'NOT STARTED',
      createdAt: now,
      question: `# Assignment 6: Database Triage & Backup Recovery Runbook

### Scenario
Your Postgres database CPU spiked to 100%, causing connection pool starvation. You suspect an unindexed query on a table with 10 million records.

---

### Tasks to Submit
1. **Query Diagnostics:** Write the SQL query to inspect running queries in \`pg_stat_activity\` and find queries running longer than 30 seconds. Explain how to cancel a runaway query gracefully (\`pg_cancel_backend\`) vs forcefully (\`pg_terminate_backend\`).
2. **Execution Plan:** Explain the difference between \`Seq Scan\` and \`Index Scan\` in an \`EXPLAIN ANALYZE\` output.
3. **Backup Strategy:** Provide a shell script that performs an automated \`pg_dump\` backup, validates the backup file size, and outlines the step-by-step restoration verification process.`,
      instruction: `You are a Senior SRE Mentor evaluating a Database Administration assignment.

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
### 🚀 Next Steps`
    },
    {
      id: 't2a00007-0001-4000-a000-000000000001',
      title: 'Assignment 7: Hardened Multi-Stage Container & Compose Stack',
      phaseId: 'phase-2',
      phaseTitle: 'Phase 2: Core Skills (Months 4–6)',
      topicId: 'p2-t7',
      topicTitle: '7. Containerization (Docker)',
      status: 'NOT STARTED',
      createdAt: now,
      question: `# Assignment 7: Hardened Multi-Stage Container & Compose Stack

### Objective
Create a secure, production-grade Docker deployment for a multi-tier web service consisting of an application, a Redis cache, and an Nginx reverse proxy.

---

### Deliverables
1. **Hardened Dockerfile:** Multi-stage build, non-root user execution, explicit \`HEALTHCHECK\`, minimal base image (< 100MB final size).
2. **Docker Compose File:** Defines the web app, Redis, and Nginx with explicit resource constraints (CPU/memory limits via \`deploy.resources.limits\`), health check dependencies (\`depends_on.condition: service_healthy\`), and custom bridge network.
3. **Security Analysis:** Explain why running containers as root is dangerous, and how Linux namespaces and cgroups isolate this workload.`,
      instruction: `You are a Senior SRE Mentor evaluating a Docker Containerization assignment.

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
### 🚀 Next Steps`
    },
    {
      id: 't3a00008-0001-4000-a000-000000000001',
      title: 'Assignment 8: Multi-AZ Cloud Architecture & Disaster Recovery Plan',
      phaseId: 'phase-3',
      phaseTitle: 'Phase 3: Infrastructure & Cloud (Months 7–9)',
      topicId: 'p3-t8',
      topicTitle: '8. Cloud Platforms (AWS)',
      status: 'NOT STARTED',
      createdAt: now,
      question: `# Assignment 8: Multi-AZ Cloud Infrastructure Blueprint

### Objective
Design a highly available, fault-tolerant cloud architecture on AWS for a web application serving 10,000 requests per minute with strict 99.9% uptime requirement.

---

### Deliverables
1. **Network Topology:** Detailed CIDR allocation plan across 2 Availability Zones with public and private subnets, Internet Gateways, NAT Gateways, and Route Tables.
2. **Security & IAM:** Least-privilege IAM policies, Security Group rules (restricting database port 5432 strictly to application security group), and encrypted S3 bucket policy.
3. **Failure Mode Analysis:** Describe what happens when AZ-1 suffers a total power failure. How do the ALB, Auto Scaling Group, and Multi-AZ database maintain service availability?`,
      instruction: `You are a Senior SRE Mentor evaluating a Cloud Architecture assignment.

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
### 🚀 Next Steps`
    },
    {
      id: 't3a00009-0001-4000-a000-000000000001',
      title: 'Assignment 9: Idempotent Ansible Role for Infrastructure Provisioning',
      phaseId: 'phase-3',
      phaseTitle: 'Phase 3: Infrastructure & Cloud (Months 7–9)',
      topicId: 'p3-t9',
      topicTitle: '9. Configuration Management (Ansible)',
      status: 'NOT STARTED',
      createdAt: now,
      question: `# Assignment 9: Idempotent Ansible Role for Telemetry Provisioning

### Objective
Author an Ansible role named \`node_exporter\` that automatically provisions and manages the Prometheus node_exporter binary across Linux servers.

---

### Deliverables
1. **Role Structure:** Complete \`tasks/main.yml\`, \`handlers/main.yml\`, \`templates/node_exporter.service.j2\`, and \`defaults/main.yml\`.
2. **Idempotency Guarantee:** Explain how your tasks ensure idempotency (e.g. not re-downloading if binary already exists, triggering systemd reload only when template changes).
3. **Execution Verification:** Show the \`ansible-playbook\` run output proving 0 failed and 0 changed on second execution.`,
      instruction: `You are a Senior SRE Mentor evaluating an Ansible Configuration Management assignment.

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
### 🚀 Next Steps`
    },
    {
      id: 't4a0010-0001-4000-a000-000000000001',
      title: 'Assignment 10: Prometheus Alerting Ruleset & SLO Error Budget Policy',
      phaseId: 'phase-4',
      phaseTitle: 'Phase 4: Advanced SRE Concepts (Months 10–12)',
      topicId: 'p4-t10',
      topicTitle: '10. Monitoring & Observability',
      status: 'NOT STARTED',
      createdAt: now,
      question: `# Assignment 10: Prometheus Alerting & SLO Error Budget Policy

### Objective
Define an enterprise-grade monitoring, alerting, and error budget policy for a mission-critical checkout service.

---

### Deliverables
1. **SLO Specification:** Define SLI and SLO targets (e.g. 99.9% of requests return HTTP 2xx/3xx in < 250ms over rolling 30-day window). Calculate the exact monthly error budget in minutes.
2. **Prometheus Alerting Rules:** Provide production YAML alerting rules including:
   - High Error Rate (5xx > 1% over 5m)
   - Multi-window Error Budget Burn Rate alert (14.4x burn rate over 1h)
   - High Latency P99 alert using \`histogram_quantile\`
3. **Error Budget Policy:** Write a clear policy establishing what actions engineering takes when 50%, 75%, and 100% of the monthly error budget is burned.`,
      instruction: `You are a Senior SRE Mentor evaluating a Monitoring & Observability assignment.

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
### 🚀 Next Steps`
    },
    {
      id: 't4a0011-0001-4000-a000-000000000001',
      title: 'Assignment 11: Production CI/CD Pipeline with Automated Rollback',
      phaseId: 'phase-4',
      phaseTitle: 'Phase 4: Advanced SRE Concepts (Months 10–12)',
      topicId: 'p4-t11',
      topicTitle: '11. CI/CD Pipelines',
      status: 'NOT STARTED',
      createdAt: now,
      question: `# Assignment 11: Production CI/CD Pipeline with Rollback Gate

### Objective
Create a complete GitHub Actions or GitLab CI pipeline definition (\`.github/workflows/deploy.yml\`) incorporating automated testing, vulnerability scanning, and safe canary deployment.

---

### Deliverables
1. **Pipeline Workflow YAML:** Linting, automated unit/integration tests, Trivy container security vulnerability scanner, image build and push.
2. **Canary Deployment Stage:** Deploys new version to 10% canary traffic.
3. **Automated Rollback Logic:** Script or step that queries Prometheus; if 5xx error rate exceeds 1% during the canary window, halts deployment and initiates rollback immediately.`,
      instruction: `You are a Senior SRE Mentor evaluating a CI/CD Pipeline assignment.

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
### 🚀 Next Steps`
    },
    {
      id: 't4a0012-0001-4000-a000-000000000001',
      title: 'Assignment 12: Zero-Downtime Kubernetes Deployment with HPA & Probes',
      phaseId: 'phase-4',
      phaseTitle: 'Phase 4: Advanced SRE Concepts (Months 10–12)',
      topicId: 'p4-t12',
      topicTitle: '12. Kubernetes (Container Orchestration)',
      status: 'NOT STARTED',
      createdAt: now,
      question: `# Assignment 12: Resilient Kubernetes Microservice Architecture

### Objective
Write complete production Kubernetes manifests for a resilient web service deployed to a production cluster.

---

### Deliverables
1. **Deployment Manifest:** Must specify \`readinessProbe\`, \`livenessProbe\`, resource \`requests\` and \`limits\`, rolling update strategy (\`maxUnavailable: 0\`, \`maxSurge: 1\`), and pod anti-affinity.
2. **Horizontal Pod Autoscaler (HPA):** Scales pods between 3 and 10 based on 70% target CPU utilization.
3. **Pod Disruption Budget (PDB):** Ensures minimum available pods during node drain operations.
4. **Lifecycle Explanation:** Explain the difference between \`livenessProbe\` and \`readinessProbe\` failure outcomes.`,
      instruction: `You are a Senior SRE Mentor evaluating a Kubernetes assignment.

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
### 🚀 Next Steps`
    },
    {
      id: 't4a0013-0001-4000-a000-000000000001',
      title: 'Assignment 13: Production Incident Runbook & Blameless Post-Mortem',
      phaseId: 'phase-4',
      phaseTitle: 'Phase 4: Advanced SRE Concepts (Months 10–12)',
      topicId: 'p4-t13',
      topicTitle: '13. Incident Management & On-Call',
      status: 'NOT STARTED',
      createdAt: now,
      question: `# Assignment 13: Incident Runbook & Blameless Post-Mortem

### Scenario
A SEV-1 outage occurred where customer orders failed for 42 minutes due to a cascading connection pool failure between the web tier and payment database.

---

### Deliverables
1. **Actionable Production Runbook:** Create \`RUNBOOK_DB_CONNECTION_EXHAUSTION.md\` with symptoms, triage commands, mitigation steps (scaling connection pooler, killing idle connections), and escalation matrix.
2. **Complete Blameless Post-Mortem:** Must include:
   - Executive Summary & Customer Impact (downtime, requests dropped, error budget consumed)
   - High-resolution timestamped timeline (UTC)
   - 5 Whys Root Cause Analysis
   - What went well / What went poorly / Where we got lucky
   - Preventive Action Items with assigned owners and priority levels.`,
      instruction: `You are a Senior SRE Mentor evaluating an Incident Management assignment.

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
### 🚀 Next Steps`
    },
    {
      id: 't5a0014-0001-4000-a000-000000000001',
      title: 'Assignment 14: Specialized SRE Architecture Design Document',
      phaseId: 'phase-5',
      phaseTitle: 'Phase 5: Specialization & Growth (Month 13+)',
      topicId: 'p5-t14',
      topicTitle: '14. Choose Your Focus Areas',
      status: 'NOT STARTED',
      createdAt: now,
      question: `# Assignment 14: Focus Track Architecture Proposal

### Objective
Select one of the 3 focus tracks (Platform/Mesh, Observability/Tracing, or Security/Vault) and author an end-to-end technical architecture proposal for production implementation.

---

### Deliverables
1. **System Architecture Diagram & Overview:** Describe the chosen system (e.g. Istio Service Mesh, OpenTelemetry distributed tracing, or HashiCorp Vault dynamic database secrets).
2. **Implementation Specification:** Configuration manifests or code snippets demonstrating the core implementation.
3. **Operational Readiness:** Rollback plan, performance overhead assessment (CPU/memory latency impact), and failure recovery procedures.`,
      instruction: `You are a Senior SRE Mentor evaluating an Advanced SRE Architecture assignment.

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
### 🚀 Next Steps`
    },
    {
      id: 't5a0015-0001-4000-a000-000000000001',
      title: 'Assignment 15: Production RFC & Architecture Decision Record (ADR)',
      phaseId: 'phase-5',
      phaseTitle: 'Phase 5: Specialization & Growth (Month 13+)',
      topicId: 'p5-t15',
      topicTitle: '15. Soft Skills Development',
      status: 'NOT STARTED',
      createdAt: now,
      question: `# Assignment 15: Production RFC / Architecture Decision Record

### Objective
Demonstrate technical communication and engineering leadership by authoring a formal Architecture Decision Record (ADR) or Request for Comments (RFC) proposing an engineering-wide reliability standard.

---

### Deliverables
1. **Title & Status:** Proposed / Accepted.
2. **Context & Problem Statement:** Why this decision is necessary (e.g. standardizing on structured JSON logging with correlation IDs across all microservices).
3. **Decision & Proposed Standard:** The exact technical specification and guidelines.
4. **Alternatives Considered & Trade-Offs:** What other solutions were evaluated and why they were rejected.
5. **Rollout Plan & Cross-Team Impact:** How development teams will adopt this standard with minimal friction.`,
      instruction: `You are a Senior SRE Mentor evaluating a Technical Writing & Engineering Leadership assignment.

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
### 🚀 Next Steps`
    }
  ]
};

fs.writeFileSync(COURSE_FILE, JSON.stringify(course, null, 2), 'utf8');
console.log(`Successfully generated SRE Course: ${COURSE_FILE}`);
console.log(`Total Lessons: ${course.lessons.length}, Total Tasks: ${course.tasks.length}`);
