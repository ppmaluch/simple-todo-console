const fs = require("fs");

const file = "./data/data.json";
const saveToFile = (data) => {
  fs.writeFileSync(file, JSON.stringify(data));
};

const readFile = () => {
  if (!fs.existsSync(file)) return null;

  const fileInfo = fs.readFileSync(file, { encoding: "utf8" });
  if (fileInfo === "") return null;
  const data = JSON.parse(fileInfo);
  return data;
};

module.exports = { saveToFile, readFile };
