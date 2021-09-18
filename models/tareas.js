const Task = require("./tarea.js");
require("colors");

/**
 * _list:
 *      {'uuid-123123213--241231-3123':{id: 12, desc: sad, completedAt:23133}},
 *      {'uuid-123123213--241231-3123':{id: 12, desc: sad, completedAt:23133}},
 *      {'uuid-123123213--241231-3123':{id: 12, desc: sad, completedAt:23133}},
 */

class Tasks {
  // esto no es necesario declararlo pues en JS las propiedades se declaran en el constructor. Esto es solo una referencia
  _list = {};

  get listArr() {
    const list = [];
    Object.keys(this._list).forEach((key) => {
      list.push(this._list[key]);
    });
    return list;
  }

  constructor() {
    this._list = {};
  }

  loadTaskIntoArray(tasks = []) {
    tasks.forEach((task) => {
      this._list[task.id] = task;
    });
  }

  createNewTask(desc = "") {
    const task = new Task(desc);
    this._list[task.id] = task;
  }

  completeTasks(ids = []) {
    ids.forEach((id) => {
      this._list[id].completedAt = new Date().toISOString();
    });
  }

  taskFullList() {
    // for (let index = 0; index < this.listArr.length; index++) {
    //   const element = this.listArr[index];
    //   console.log(
    //     `${(index + 1 + ".").green} ${element.desc} :: ${
    //       element.completedAt ? "Completed".green : "Pending".red
    //     }`
    //   );
    // }

    this.listArr.forEach((task, index) => {
      const idx = `${index + 1 + "."}`.green;
      const { desc, completedAt } = task;
      const status = completedAt ? "Completed".green : "Pending".red;

      console.log(`${idx} ${desc} :: ${status}`);
    });
  }

  listTaskByStatus(completed = true) {
    let contador = 0;

    this.listArr.forEach((task) => {
      const { desc, completedAt } = task;
      const status = completedAt ? "Completed".green : "Pending".red;
      if (completed) {
        if (completedAt) {
          contador += 1;
          console.log(
            `${(contador + ".").green} ${desc} :: ${completedAt.green}`
          );
        }
      } else {
        if (!completedAt) {
          contador += 1;
          console.log(`${(contador + ".").green} ${desc} :: ${status}`);
        }
      }
    });
  }

  deleteTask(id) {
    if (this._list[id]) {
      delete this._list[id];
    }
  }
}

module.exports = Tasks;
