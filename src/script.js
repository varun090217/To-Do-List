document.addEventListener("DOMContentLoaded", () => {
  const toDoInput = document.getElementById("to-do-input");
  const toDoBtn = document.getElementById("to-do-btn");
  const listItem = document.getElementById("list-item");

  let tasks = JSON.parse(localStorage.getItem("task")) || [];

  if (tasks) {
    tasks.forEach((task) => renderTask(task));
  }

  toDoBtn.addEventListener("click", () => {
    const taskText = toDoInput.value.trim();
    if (taskText === "") return;

    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false,
    };

    tasks.push(newTask);
    saveTaks(tasks);
    toDoInput.value = ""; //clear input

    renderTask(newTask)
  });

  function renderTask(task) {
    const li = document.createElement("li");
    if(li.completed) li.classList.add('completed');
    li.setAttribute("data-id", task.id);
    li.innerHTML = `
    <span>${task.text}</span>
    <button>delete</button>`;

    li.addEventListener('click', (e) => {
        if(e.target.tagName === "BUTTON") return;
        task.completed = !task.completed;
        li.classList.toggle('completed');
        saveTaks();
    })

    li.querySelector('button').addEventListener('click', (e) => {
        e.stopPropagation() // prevent toggle for firing
        tasks = tasks.filter((t) => t.id !== task.id);
        li.remove();
        saveTaks();
    })
    listItem.append(li);
  }

  function saveTaks() {
    localStorage.setItem("task", JSON.stringify(tasks));
  }
});
