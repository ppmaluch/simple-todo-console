const {
  inquirerMenu,
  pause,
  readInput,
  listTaskToDelete,
  deleteConfirmation,
  checklistToChangeTaskState,
} = require("./helpers/inquirer");
const { saveToFile, readFile } = require("./helpers/dataAccess");

const Tasks = require("./models/tareas");

const main = async () => {
  let opt = "";
  const tasks = new Tasks();

  const tasksDb = readFile();

  if (tasksDb) {
    tasks.loadTaskIntoArray(tasksDb);
  }

  do {
    // Imprimir menu
    opt = await inquirerMenu();

    switch (opt) {
      case "1":
        //crear opcion
        const desc = await readInput("Description:");
        tasks.createNewTask(desc);
        break;
      case "2":
        tasks.taskFullList();
        break;
      case "3":
        tasks.listTaskByStatus();
        break;
      case "4":
        tasks.listTaskByStatus(false);
        break;
      case "5":
        const ids = await checklistToChangeTaskState(tasks.listArr);
        tasks.completeTasks(ids);
        break;
      case "6":
        const id = await listTaskToDelete(tasks.listArr);
        if (id !== 0) {
          const confirmation = await deleteConfirmation();
          if (confirmation) {
            tasks.deleteTask(id);
            console.log("Tarea borrada");
          }
        }
        break;
      default:
        break;
    }

    saveToFile(tasks.listArr);

    if (opt !== "0") {
      if (!(await pause())) opt = "0";
    }
  } while (opt !== "0");
};

main();
