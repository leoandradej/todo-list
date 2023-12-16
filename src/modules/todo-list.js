import Project from './projects'
import Task from './task'

export default class TodoList {
    constructor() {
        this.projects = [];
        this.projects.push(new Project("Inbox"));
        this.projects.push(new Project("Today"));
        this.projects.push(new Project("Upcoming"));
    }

    setProjects(projects) {
        this.projects = projects;
    }

    getProjects() {
        return this.projects;
    }

    getProject(projectName) {
        return this.projects.find(project => project.getName() === projectName);
    }

    contains(projectName) {
        return this.projects.some(project => project.getName() === projectName);
    }

    addProject(newProject) {
        if (this.projects.find(project => project.name === newProject.name)) return;
        this.projects.push(newProject);
    }

    deleteProject(projectName) {
        const projectToDelete = this.projects.find(project => project.getName() === projectName);
        this.projects.splice(this.projects.indexOf(projectToDelete), 1);
    }

    updateTodayProject() {
        this.getProject("Today").tasks = [];

        this.projects.forEach(project => {
            if (project.getName() === "Today" || project.getName() === "Upcoming") return;

            const todayTasks = project.getTodayTasks();
            todayTasks.forEach(task => {
                const taskName = `${task.getName()} (${project.getName()})`
                this.getProject("Today").addTask(new Task(taskName, task.getNotes(), task.getDate(), task.getPriority()));
            });
        })
    }

    updateUpcomingProject() {
        this.getProject("Upcoming").tasks = [];

        this.projects.forEach(project => {
            if (project.getName() === "Today" || project.getName() === "Upcoming") return;

            const upcomingTasks = project.getUpcomingTasks();
            upcomingTasks.forEach(task => {
                const taskName = `${task.getName()} (${project.getName()})`
                this.getProject("Upcoming").addTask(new Task(taskName, task.getNotes(), task.getDate(), task.getPriority()));
            });
        })

        const sortTasksByDate = (taskA, taskB) => {
            return new Date(taskA.dueDate).valueOf() - new Date(taskB.dueDate).valueOf();
        }

        this.getProject("Upcoming").setTasks(this.getProject("Upcoming").getTasks().sort(sortTasksByDate));
    }
}