{
  let tasks = [];
  let hideDoneTasks = false;

  const addNewTask = (newTaskContent) => {
    tasks = [...tasks, { content: newTaskContent }];
    render();
  };

  const removeTask = (taskIndex) => {
    tasks = [...tasks.slice(0, taskIndex), ...tasks.slice(taskIndex + 1)];
    render();
  };

  const toggleTaskDone = (index) => {
    tasks = [
      ...tasks.slice(0, index),
      { ...tasks[index], done: !tasks[index].done },
      ...tasks.slice(index + 1),
    ];
    render();
  };

  const markAllTasksDone = () => {
    tasks = tasks.map((task) => ({
      ...task,
      done: true,
    }));
    render();
  };

  const toggleHideDoneTasks = () => {
    hideDoneTasks = !hideDoneTasks;
    render();
  };

  const bindRemoveEvents = () => {
    const removeButtons = document.querySelectorAll(".js-remove");

    removeButtons.forEach((removeButton, index) => {
      removeButton.addEventListener("click", () => {
        removeTask(index);
      });
    });
  };

  const bindToggleDoneEvents = () => {
    const toggleDoneButtons = document.querySelectorAll(".js-done");

    toggleDoneButtons.forEach((toggleDoneButton, index) => {
      toggleDoneButton.addEventListener("click", () => {
        toggleTaskDone(index);
      });
    });
  };

  const renderTasks = () => {
    const taskToHTML = (task) =>
      `<li class="task__item${
        task.done && hideDoneTasks ? " tasks__item--hidden" : ""
      }">
       <button class="list__doneBtn js-done">${task.done ? "✔" : ""}</button>
       <p class="list__task" ${
         task.done ? ' style="text-decoration: line-through"' : ""
       } >${task.content}</p>
       <button class="list__removeBtn js-remove">🗑</button>
    </li>
    `;

    const tasksElement = document.querySelector(".js-tasks");
    tasksElement.innerHTML = tasks.map(taskToHTML).join("");
  };

  const renderButtons = () => {
    const buttonsElement = document.querySelector(".js-buttons");

    if (!tasks.length) {
      buttonsElement.innerHTML = "";
      return;
    }

    buttonsElement.innerHTML = `
     <button class="buttons__button js-toggleHideDoneTasks">
      ${hideDoneTasks ? "Pokaż" : "Usuń"} ukończone
     </button>
     <button class="buttons__button js-markAllDone"
      ${tasks.every(({ done }) => done) ? "disabled" : ""}>
      Ukończ wszystkie
     </button>
     
    `;
  };

  const bindButtonsEvents = () => {
    const markAllDoneButton = document.querySelector(".js-markAllDone");

    if (markAllDoneButton) {
      markAllDoneButton.addEventListener("click", markAllTasksDone);
    }

    const toggleHideDoneTasksButton = document.querySelector(
      ".js-toggleHideDoneTasks"
    );

    if (toggleHideDoneTasksButton) {
      toggleHideDoneTasksButton.addEventListener("click", toggleHideDoneTasks);
    }
  };

  const render = () => {
    renderTasks();
    bindRemoveEvents();
    bindToggleDoneEvents();

    renderButtons();
    bindButtonsEvents();
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    const newTaskContent = document.querySelector(".js-newTask").value.trim();

    if (newTaskContent !== "") {
      addNewTask(newTaskContent);
      document.querySelector(".js-form").reset();
    } else {
      document.querySelector(".js-newTask").focus();
    }
  };

  const init = () => {
    render();

    const form = document.querySelector(".js-form");

    form.addEventListener("submit", onFormSubmit);
  };

  init();
}
