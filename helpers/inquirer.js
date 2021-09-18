require("colors");
const inquirer = require("inquirer");

const questions = [
  {
    type: "list",
    name: "opcion",
    message: "What do you want to do?",
    choices: [
      {
        value: "1",
        name: `${"1.".green} Create task`,
      },
      {
        value: "2",
        name: `${"2.".green} List tasks`,
      },
      {
        value: "3",
        name: `${"3.".green} List completed tasks`,
      },
      {
        value: "4",
        name: `${"4.".green} List pending tasks`,
      },
      {
        value: "5",
        name: `${"5.".green} Complete a task(s)`,
      },
      {
        value: "6",
        name: `${"6.".green} Delete task`,
      },
      {
        value: "0",
        name: `${"Exit".green}`,
      },
    ],
  },
];

const inquirerMenu = async () => {
  console.clear();
  console.log("===========================".green);
  console.log("  TODO Console   ".grey);
  console.log("===========================\n".green);

  const { opcion } = await inquirer.prompt(questions);

  return opcion;
};

const pause = async () => {
  const pausePrompt = {
    type: "confirm",
    name: "pauseConfirm",
    message: "Sure you want to continue?",
    default: true,
  };

  console.log("\n");
  const { pauseConfirm } = await inquirer.prompt(pausePrompt);

  return pauseConfirm;
};

const deleteConfirmation = async () => {
  const pausePrompt = {
    type: "confirm",
    name: "deleteConfirm",
    message: "Sure you want to delete the selected task?",
    default: false,
  };

  console.log("\n");
  const { deleteConfirm } = await inquirer.prompt(pausePrompt);

  return deleteConfirm;
};

const readInput = async (message) => {
  const question = [
    {
      type: "input",
      name: "desc",
      message,
      validate(value) {
        if (value.length === 0) {
          return "Please set a value";
        }
        return true;
      },
    },
  ];

  const { desc } = await inquirer.prompt(question);
  return desc;
};

const listTaskToDelete = async (tasks = []) => {
  const choices = tasks.map((task, i) => {
    const idx = `${i + 1}.`.green;
    return {
      value: task.id,
      name: `${idx} ${task.desc}`,
    };
  });

  choices.push({
    value: 0,
    name: "Cancel".red,
  });

  const questions = [
    {
      type: "list",
      name: "id",
      message: "Delete",
      choices,
    },
  ];
  const { id } = await inquirer.prompt(questions);
  return id;
  // {
  //   value: task.id,
  //   name: task.desc,
  // }
};

const checklistToChangeTaskState = async (tasks = []) => {
  // const choices = tasks.map((task, i) => {
  //   const idx = `${i + 1}.`.green;
  //
  //     return {
  //       value: task.id,
  //       name: `${idx} ${task.desc}`,
  //       checked: true,
  //     };
  //
  // });
  const choices = [];
  tasks.forEach((task, i) => {
    const idx = `${i + 1}.`.green;
    if (!task.completedAt) {
      choices.push({
        value: task.id,
        name: `${idx} ${task.desc}`,
        checked: true,
      });
    }
  });

  const questions = [
    {
      type: "checkbox",
      name: "ids",
      message: "Select",
      choices,
    },
  ];
  const { ids } = await inquirer.prompt(questions);
  return ids;
  // {
  //   value: task.id,
  //   name: task.desc,
  // }
};

module.exports = {
  inquirerMenu,
  pause,
  readInput,
  listTaskToDelete,
  deleteConfirmation,
  checklistToChangeTaskState,
};
