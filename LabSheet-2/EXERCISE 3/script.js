function allowDrop(ev) { ev.preventDefault(); }

function drag(ev) { ev.dataTransfer.setData("text", ev.target.id); }

function drop(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text");
    const task = document.getElementById(data);
    const target = ev.target.closest('.column');

    if (target) {
        target.appendChild(task);
        if (target.id === 'completed') {
            task.classList.add('done');
            alert("Task Completed Successfully");
        } else {
            task.classList.remove('done');
        }
    }
}

function addTask() {
    const input = document.getElementById('taskInput');
    if (!input.value) return;

    const id = "t-" + Date.now();
    const date = new Date().toLocaleDateString();

    const div = document.createElement('div');
    div.className = 'task-card';
    div.id = id;
    div.draggable = true;
    div.ondragstart = drag;
    div.innerHTML = `<strong>${input.value}</strong><br><small>${date}</small>`;

    document.getElementById('todo').appendChild(div);
    input.value = "";
}