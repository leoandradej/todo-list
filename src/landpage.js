const createHeader = () => {
    const header = document.createElement("header");
    header.className = "header";
    
    const logoContainer = document.createElement("div");
    logoContainer.className = "logo-container";

    const logoIcon = document.createElement("i");
    logoIcon.className = "fa-solid fa-list logo-icon";

    const logo = document.createElement("h1");
    logo.className = "logo"; 
    logo.textContent = "SIT&SORT";

    logoContainer.appendChild(logoIcon);
    logoContainer.appendChild(logo);

    const login = document.createElement("button");
    login.className = "login";

    const loginIcon = document.createElement("i");
    loginIcon.className = "fa-solid fa-circle-user login-icon";

    login.appendChild(loginIcon);

    header.appendChild(logoContainer);
    header.appendChild(login);

    return header;
}

const createNav = () => {
    const nav = document.createElement("nav");
    nav.className = "nav";

    const tasks = document.createElement("div");
    tasks.className = "tasks";

    const inboxBtn  = document.createElement("div");
    inboxBtn.className = "btn inbox";
    inboxBtn.addEventListener("click", () => {
        loadInbox();
    });

    const inboxIcon = document.createElement("i");
    inboxIcon.className = "fa-solid fa-inbox";

    const inbox = document.createElement("div");
    inbox.textContent = "Inbox";

    inboxBtn.appendChild(inboxIcon);
    inboxBtn.appendChild(inbox);

    const todayBtn  = document.createElement("div");
    todayBtn.className = "btn today";
    todayBtn.addEventListener("click", () => {
        loadToday();
    });

    const todayIcon = document.createElement("i");
    todayIcon.className = "fa-solid fa-calendar-day";

    const today = document.createElement("div");
    today.textContent = "Today";

    todayBtn.appendChild(todayIcon);
    todayBtn.appendChild(today);

    const upcomingBtn  = document.createElement("div");
    upcomingBtn.className = "btn upcoming";
    upcomingBtn.addEventListener("click", () => {
        loadUpcoming();
    });

    const upcomingIcon = document.createElement("i");
    upcomingIcon.className = "fa-solid fa-calendar-week";

    const upcoming = document.createElement("div");
    upcoming.textContent = "Upcoming";

    upcomingBtn.appendChild(upcomingIcon);
    upcomingBtn.appendChild(upcoming);

    tasks.appendChild(inboxBtn);
    tasks.appendChild(todayBtn);
    tasks.appendChild(upcomingBtn);

    const projects = document.createElement("div");
    projects.className = "projects";

    const projectsHeader = document.createElement("h3");
    projectsHeader.className = "projects-header";
    projectsHeader.textContent = "Projects";

    const newProjectBtn = document.createElement("div");
    newProjectBtn.className = "btn add-project";
    newProjectBtn.addEventListener("click", () => {
        createProjectItem();
    })

    const addIcon = document.createElement("i");
    addIcon.className = "fa-solid fa-plus";

    const newProject = document.createElement("div");
    newProject.textContent = "New Project";

    newProjectBtn.appendChild(addIcon);
    newProjectBtn.appendChild(newProject);

    projects.appendChild(projectsHeader);
    projects.appendChild(newProjectBtn);

    nav.appendChild(tasks);
    nav.appendChild(projects);

    return nav;
}

const createMain = () => {
    const main = document.createElement("main");
    main. className = "main";

    const sectionName = document.createElement("div");
    sectionName.className = "section-name";
    sectionName.textContent = "";

    const addTaskBtn = document.createElement("div")
    addTaskBtn.className = "btn add-task";
    addTaskBtn.addEventListener("click", () => {

    });

    const addIcon = document.createElement("i");
    addIcon.className = "fa-solid fa-plus";

    const addTask = document.createElement("div");
    addTask.textContent = "Add Task";

    addTaskBtn.appendChild(addIcon);
    addTaskBtn.appendChild(addTask);

    const modal = document.createElement("div");
    modal.className = "modal";
    modal.id = "modal";

    const modalContent = document.createElement("div");
    modalContent.className = "modal-content";

    const closeIcon = document.createElement("i");
    closeIcon.className = "fa-solid fa-xmark";
    closeIcon.addEventListener("click", () => {
        modal.style.display = "none";
    })

    const modalForm = document.createElement("div");
    modalForm.className = "modal-form";

    const formTitle = document.createElement("h1");
    formTitle.className = "form-title";
    formTitle.textContent = "Edit Task";

    const taskForm = document.createElement("form");
    taskForm.className = "task-form";

    const taskField = document.createElement("div");
    taskField.className = "modal-input-field";

    const taskLabel = document.createElement("label");
    taskLabel.setAttribute("for", "task-info");
    taskLabel.textContent = "Task:";

    const taskInput = document.createElement("input");
    taskInput.className = "modal-form-input";
    taskInput.id = "task-title";
    taskInput.setAttribute("type", "text");
    taskInput.setAttribute("name", "task-title");

    taskField.appendChild(taskLabel);
    taskField.appendChild(taskInput);

    const notesField = document.createElement("div");
    notesField.className = "modal-input-field";

    const notesLabel = document.createElement("label");
    notesLabel.setAttribute("for", "notes");
    notesLabel.textContent = "Notes:";

    const notesInput = document.createElement("textarea");
    notesInput.className = "modal-form-input";
    notesInput.id ="notes";
    notesInput.setAttribute("name", "notes");

    notesField.appendChild(notesLabel);
    notesField.appendChild(notesInput);

    const dateField = document.createElement("div");
    dateField.className = "modal-input-field";

    const dateLabel = document.createElement("label");
    dateLabel.setAttribute("for", "due-date");
    dateLabel.textContent = "Due Date:";

    const dateInput = document.createElement("input");
    dateInput.className = "modal-form-input";
    dateInput.id = "due-date";
    dateInput.setAttribute("type", "date");
    dateInput.setAttribute("name", "due-date");

    dateField.appendChild(dateLabel);
    dateField.appendChild(dateInput);

    const priorityField = document.createElement("div");
    priorityField.className = "modal-input-field priority-box";

    const priorityLabel = document.createElement("div");
    priorityLabel.className = "edit-priority";
    priorityLabel.textContent = "Priority:";

    const priorityBox = document.createElement("div");
    priorityBox.className = "cb-container";

    const priorityInput = document.createElement("input");
    priorityInput.className = "checkmark";
    priorityInput.id = "edit-priority";
    priorityInput.setAttribute("type", "checkbox");
    priorityInput.setAttribute("name", "edit-priority");

    const checkboxLabel = document.createElement("label");
    checkboxLabel.setAttribute("for", "");

    priorityBox.appendChild(priorityInput);
    priorityBox.appendChild(checkboxLabel);

    priorityField.appendChild(priorityLabel);
    priorityField.appendChild(priorityBox);

    const submitField = document.createElement("div");
    submitField.className = "submit-modal-form";

    const submitBtn = document.createElement("button");
    submitBtn.className = "form-button";
    submitBtn.setAttribute("type", "submit");
    submitBtn.textContent = "Done";
    submitBtn.addEventListener("click", () => {

    });

    submitField.appendChild(submitBtn);

    taskForm.appendChild(taskField);
    taskForm.appendChild(notesField);
    taskForm.appendChild(dateField);
    taskForm.appendChild(priorityField);
    taskForm.appendChild(submitField);

    modalForm.appendChild(formTitle);
    modalForm.appendChild(taskForm);

    modalContent.appendChild(closeIcon);
    modalContent.appendChild(modalForm);

    modal.appendChild(modalContent);

    main.appendChild(sectionName);
    main.appendChild(addTaskBtn);
    main.appendChild(modal);

    return main;
}

const initializePage = () => {
    const content = document.querySelector("#content");
    content.appendChild(createHeader());
    content.appendChild(createNav());
    content.appendChild(createMain());
}

export default initializePage;