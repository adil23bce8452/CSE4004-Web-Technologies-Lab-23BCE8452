let activityStore = [];
    const logList = document.getElementById('activityLog');
    const alertBox = document.getElementById('alertBox');
    
    const CLICK_THRESHOLD = 5; // Max clicks within 2 seconds
    let clickTimestamps = [];

    const parent = document.getElementById('parentZone');

    parent.addEventListener('focusin', (e) => {
        logActivity('FOCUS', e.target.id, 'CAPTURING');
    }, true);

    parent.addEventListener('click', (e) => {
        const targetId = e.target.id || e.target.tagName;
        logActivity('CLICK', targetId, 'BUBBLING');
        checkSuspiciousClicks();
    });

    parent.addEventListener('keydown', (e) => {
        logActivity('KEYPRESS', e.key, 'BUBBLING');
    });

    function logActivity(type, value, phase) {
        const entry = {
            timestamp: new Date().toLocaleTimeString(),
            type: type,
            target: value,
            phase: phase
        };
        
        activityStore.push(entry);
        
        const li = document.createElement('li');
        li.className = 'log-entry';
        li.innerHTML = `[${entry.timestamp}] <span style="color:#00afff">${type}</span>: ${value} (${phase})`;
        
        logList.insertBefore(li, logList.firstChild);
        document.getElementById('eventCount').textContent = activityStore.length;
    }

    function checkSuspiciousClicks() {
        const now = Date.now();
        clickTimestamps.push(now);
        
        clickTimestamps = clickTimestamps.filter(t => now - t < 2000);
        
        if (clickTimestamps.length > CLICK_THRESHOLD) {
            alertBox.textContent = "⚠️ SUSPICIOUS ACTIVITY DETECTED: EXCESSIVE CLICKS";
        } else {
            alertBox.textContent = "";
        }
    }

    function resetLog() {
        activityStore = [];
        logList.innerHTML = "";
        clickTimestamps = [];
        alertBox.textContent = "";
        document.getElementById('eventCount').textContent = "0";
    }

    function exportLog() {
        if (activityStore.length === 0) return alert("Nothing to export.");
        
        const formattedText = activityStore.map(e => 
            `${e.timestamp} | TYPE: ${e.type.padEnd(8)} | TARGET: ${e.target.padEnd(15)} | PHASE: ${e.phase}`
        ).join('\n');
        
        const blob = new Blob([formattedText], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'activity_report.txt';
        a.click();
    }