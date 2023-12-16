import Storage from './storage'
import Project from './projects'
import Task from './task'

export default class UI {
    // LOADING CONTENT

    static loadHomepage() {
        UI.openProject("Inbox", document.querySelector(".folder-inbox"));
        const modal = document.querySelector("#modal");
        const closeModalBtn = document.querySelector(".fa-xmark");
        closeModalBtn.addEventListener("click", () => {
            modal.style.display = "none";
        });
        UI.loadProjects();
        UI.initProjectButtons();
        UI.addTaskForm();
    }

    static loadProjects() {
        const inboxCount = document.querySelector("[data-inbox-count]");
        const todayCount = document.querySelector("[data-today-count]");
        const upcomingCount = document.querySelector("[data-upcoming-count]");

        inboxCount.textContent = Storage.getTodoList().getProject("Inbox").totalTasks();
        todayCount.textContent = Storage.getTodoList().getProject("Today").totalTasks();
        upcomingCount.textContent = Storage.getTodoList().getProject("Upcoming").totalTasks();

        Storage.getTodoList().getProjects().forEach(project => {
            if (project.name !== "Inbox" && project.name !== "Today" && project.name !== "Upcoming") {
                UI.renderProject(project.name);
            }
        })

        const newProjectForm = document.querySelector("[data-new-project-form]");
        newProjectForm.addEventListener("submit", e => {
            e.preventDefault();
            const newProjectInput = document.querySelector("[data-new-project-input]");
            const projectName = newProjectInput.value;

            if (projectName === null || projectName === "") {
                alert("Please, set a name to your Project.");
                return;
            }

            if (Storage.getTodoList().contains(projectName)) {
                newProjectInput.value = "";
                alert("Project already exists!");
                return;
            }

            newProjectForm.reset();
            Storage.addProject(new Project(projectName));
            UI.renderProject(projectName);
        });
    }

    static loadTasks(projectName) {
        const inboxCount = document.querySelector("[data-inbox-count]");
        const todayCount = document.querySelector("[data-today-count]");
        const upcomingCount = document.querySelector("[data-upcoming-count]");

        inboxCount.textContent = Storage.getTodoList().getProject("Inbox").totalTasks();
        todayCount.textContent = Storage.getTodoList().getProject("Today").totalTasks();
        upcomingCount.textContent = Storage.getTodoList().getProject("Upcoming").totalTasks();

        Storage.getTodoList().getProject(projectName).getTasks().forEach(task => UI.renderTask(task.name, task.notes, notes.dueDate, task.priority, task.complete));
    }

    // RENDERING CONTENT

    static renderTodoList(projectName) {
        const todoListContainer = document.querySelector("[data-todo-display-container]");
        todoListContainer.innerHTML = `
            <div class="todo-header">
                <h2 class="project-name" data-project-name>${projectName}</h2>
            </div>

            <div class="todo-content">
                <div class="tasks" data-tasks></div>
            </div>
            <div class="clear">
                <button class="btn delete" data-clear-completed-tasks-button>Clear Completed Tasks</button>
                <button class="btn delete" data-delete-project-button>Delete Project</button>
            </div>`

        if (projectName !== "Today" && projectName !== "Upcoming") {
            const todoContent = document.querySelector(".todo-content");
            todoContent.innerHTML = `
                <div class="tasks" data-tasks></div>

                <div class="new-task-btn">
                    <i class="fa-solid fa-plus"></i>
                    <button class="btn add-task">
                        New Task
                    </button>
                </div>`
        }

        UI.initAddTaskButton();
        UI.initClearAndDeleteButtons();
        UI.loadTasks(projectName);
    }

    static renderProject(name) {
        const userProjects = document.querySelector("[data-projects]");
        const projectElement = document.createElement("li");
        projectElement.className = "project-item";
        projectElement.textContent = name;

        userProjects.appendChild(projectElement);

        UI.initProjectButtons();
    }

    static  renderTask(name, notes, dueDate, priority, isComplete) {
        const tasksList = document.querySelector("[data-tasks]");

        const taskTemplate = document.querySelector("#task-template");
        const taskElement = document.importNode(taskTemplate.content, true);
        const checkbox = taskElement.querySelector("input");
        checkbox.id = name;
        checkbox.checked = isComplete;
        const label = taskElement.querySelector("label");
        label.htmlFor = name;
        label.append(name);
        const editTask = taskElement.querySelector(".edit-icon");
        editTask.addEventListener("click", () => {
            const newTaskForm = document.querySelector("[data-new-task-form]");
            const modal = document.querySelector("#modal");
            const formTitle = document.querySelector(".form-title");
            const formTaskName = document.querySelector("[data-new-task-name]");
            const formTaskNotes = document.querySelector("[data-new-task-notes]");
            const formTaskDueDate = document.querySelector("[data-new-task-due-date]");
            const formTaskPriority = document.querySelector("[data-new-task-priority]");

            modal.style.display = "block";
            formTitle.textContent = "Edit Task";
            newTaskForm.id = name;
            formTaskName.value = name;
            formTaskNotes.value = notes;
            formTaskDueDate.value = dueDate;
            formTaskPriority.checked = priority;
        });

        if (priority === true) {
            const icons = taskElement.querySelector(".icons");
            const priorityIcon = document.createElement("i");
            priorityIcon.className = "fa-solid fa-flag priority-icon";
            icons.appendChild(priorityIcon);
        }

        tasksList.appendChild(taskElement);

        const taskItems = document.querySelectorAll(".task-item");
        taskItems.forEach(task => task.addEventListener("click", UI.handleTaskElement));
    }

    // CLEAR ELEMENTS

    static clear() {
        UI.clearTodoDisplay()
        UI.clearProjects()
        UI.clearTasks()
    }

    static clearTodoDisplay() {
        const projectName = document.querySelector("[data-project-name]");
        projectName.textContent = "";
        const tasksList = document.querySelector("[data-tasks]");
        tasksList.textContent = "";
    }

    static clearProjects() {
        const projectsList = document.querySelector("[data-projects]");
        projectsList.textContent = "";
    }

    static clearTasks() {
        const tasksList = document.querySelector("[data-tasks]");
        tasksList.textContent = "";
    }

    // PROJECT EVENT LISTENERS

    static initProjectButtons() {
        const inbox = document.querySelector(".folder-inbox");
        const today = document.querySelector(".folder-today");
        const upcoming = document.querySelector(".folder-upcoming");
        const userProjects = document.querySelectorAll(".project-item");

        inbox.addEventListener("click", UI.renderInboxTasks);
        today.addEventListener("click", UI.renderTodayTasks);
        upcoming.addEventListener("click", UI.renderUpcomingTasks);
        userProjects.forEach(project => project.addEventListener("click", UI.handleProjectButton));
    }

    static renderInboxTasks() {
        UI.openProject("Inbox", this);
    }

    static renderTodayTasks() {
        Storage.updateTodayProject();
        UI.openProject("Today", this);
    }

    static renderUpcomingTasks() {
        Storage.updateUpcomingProject();
        UI.openProject("Upcoming", this);
    }

    static handleProjectButton(e) {
        const projectName = this.textContent;

        if (e.target.classList.contains("fas fa-times")) {
            UI.deleteProject(projectName, this);
            return;
        }

        UI.openProject(projectName, this);
    }

    static openProject(projectName, projectFolder) {
        const defaultProjects = document.querySelectorAll("[data-folder]");
        const userProjects = document.querySelectorAll(".project-item");
        const allProjects = [...defaultProjects, ...userProjects];

        allProjects.forEach(project => project.classList.remove("active"));
        projectFolder.classList.add("active");

        UI.renderTodoList(projectName);
    }

    static deleteProject(projectName, project) {
        if (project.classList.contains("active")) UI.clearTodoDisplay();
        Storage.deleteProject(projectName);
        UI.clearProjects();
        UI.loadProjects();
    }

    // TASK EVENT LISTENERS

    static initAddTaskButton() {
        const projectName = document.querySelector("[data-project-name]").textContent;
        if (projectName !== "Today" && projectName !== "Upcoming") {
            const newTaskBtn = document.querySelector(".new-task-btn");
            newTaskBtn.addEventListener("click", () => {
                const modal = document.querySelector("#modal");
                modal.style.display = "block";
            });
        }
    }

    static handleTaskElement(e) {
        if (e.target.tagName.toLowerCase() === "input") {
            UI.setTaskComplete(this);
            return;
        }
        if (e.target.classList.contains("delete-icon")) {
            UI.deleteTask(this);
            return;
        }
    }

    static setTaskComplete(taskItem) {
        const projectName = document.querySelector("[data-project-name]").textContent;
        const completedTask = Storage.getTodoList().getProject(projectName).getTask(taskItem.children[0].id);
        completedTask.complete = taskItem.children[0].checked;
        Storage.updateTaskStatus(projectName, taskItem.children[0].id, completedTask.complete);
    }

    static deleteTask(taskItem) {
        const projectName = document.querySelector("[data-project-name]").textContent;
        const taskName = taskItem.children[1].innerText;

        if (projectName === "Today" || projectName === "Upcoming") {
            const mainProjectName = taskName.split('(')[1].split(')')[0];
            Storage.deleteTask(mainProjectName, taskName);
        }
        Storage.deleteTask(projectName, taskName);
        UI.clearTasks();
        UI.loadTasks(projectName);
    }

    static initClearAndDeleteButtons() {
        const projectName = document.querySelector("[data-project-name]").textContent;
        const clearCompletedTasksBtn = document.querySelector("[data-clear-completed-tasks-button]");
        const deleteProjectBtn = document.querySelector("[data-delete-project-button]");

        clearCompletedTasksBtn.addEventListener("click", () => {
            const completedTasks = Storage.getTodoList().getProject(projectName).getTasks().filter(task => task.complete);

            completedTasks.forEach(task => Storage.deleteTask(projectName, task.name));
            UI.clearTasks();
            UI.loadTasks(projectName);
        });

        deleteProjectBtn.addEventListener("click", () => {
            if (projectName !== "Inbox" && projectName !== "Today" && projectName !== "Upcoming") {
                Storage.deleteProject(projectName);
                UI.clear();
                UI.loadProjects();
            }
        });
    }

    // TASKS FORM

    static addTaskForm() {
        const newTaskForm = document.querySelector("[data-new-task-form]");
        const formTitle = document.querySelector(".form-title");
        const projectName = document.querySelector("[data-project-name]").textContent;

        newTaskForm.addEventListener("submit", e => {
            e.preventDefault();

            const data = new FormData(e.target);
            let newTask = {};

            for (let [name, value] of data) {
                if (name === "priority") {
                    newTask["priority"] = true;
                } else {
                    newTask[name] = value || "";
                }
            }

            if (!newTask["priority"]) {
                newTask["priority"] = false;
            }

            if (newTask["task-title"] === "") {
                alert("Task Name Can't be Empty!");
                return;
            }
            if (Storage.getTodoList().getProject(projectName).contains(newTask["task-title"])) {
                alert('Task Already Exists!')
                return;
            }

            if (formTitle.textContent === "Edit Task") {
                const projectName = document.querySelector("[data-project-name]").textContent;
                let editTask = Storage.getTodoList().getProject(projectName).getTask(e.target.id);
                editTask.name = newTask["task-title"];
                editTask.notes = newTask["notes"];
                editTask.dueDate = newTask["due-date"];
                editTask.priority = newTask["priority"];
                Storage.updateTask(projectName, e.target.id, editTask);
                UI.clearTasks();
                UI.loadTasks(projectName);
            } else {
                const projectName = document.querySelector("[data-project-name]").textContent;
                Storage.addTask(projectName, new Task(newTask["task-title"], newTask["notes"], newTask["due-date"], newTask["priority"]));
                UI.clearTasks();
                UI.loadTasks(projectName);
            }

            newTaskForm.reset();
            modal.style.display = "none";
        });
    }
}