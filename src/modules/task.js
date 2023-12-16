export default class Task {
    constructor(name, notes, dueDate, priority) {
      this.name = name;
      this.notes = notes;
      this.dueDate = dueDate;
      this.priority = priority;
      this.complete = false;
    }
  
    setName(name) {
        this.name = name;
    }
    
    getName() {
        return this.name;
    }

    setNotes(notes) {
        this.notes = notes;
    }
    
    getNotes() {
        return this.notes;
    }
  
    setDate(dueDate) {
        this.dueDate = dueDate;
    }
  
    getDate() {
        return this.dueDate;
    }

    setPriority(priority) {
        this.priority = priority;
    }

    getPriority() {
        return this.priority;
    }

    setComplete(complete) {
        this.complete = complete;
    }

    getComplete() {
        return this.complete;
    }

    getAllValues(newValues) {
        this.name = newValues.name;
        this.notes = newValues.notes;
        this.dueDate = newValues.dueDate;
        this.priority = newValues.priority;
    }
  
    getDateFormatted() {
        const day = this.dueDate.split('/')[0]
        const month = this.dueDate.split('/')[1]
        const year = this.dueDate.split('/')[2]
        return `${month}/${day}/${year}`
    }
}

