const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
const employees = JSON.parse(fs.readFileSync("./employees.json", "utf-8"));

app.get("/", (req, res) => {
  res.send(employees);
});

app.get("/employees/:id", (req, res) => {
  const id = parseInt(req.params.id);
  for (let i = 0; i < employees.length; i++) {
    if (employees[i].id === id) {
      return res.send(employees[i]);
    }
  }
  res.status(404).send("Unable to locate the employee with that ID");
});

app.delete("/employees/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const filteredEmployees = employees.filter(employee => employee.id !== id);
  if (filteredEmployees.length === employees.length) {
    return res.status(404).send("Unable to locate the employee with that ID");
  }
  fs.writeFileSync("./employees.json", JSON.stringify(filteredEmployees));
  res.send(filteredEmployees);
});

app.post("/employees/", (req, res) => {
  const { name, department, id, salary } = req.body;
  if (name && department && id && salary) {
    const newEmployee = {
      name,
      department,
      id,
      salary
    };
    employees.push(newEmployee);
    fs.writeFileSync("./employees.json", JSON.stringify(employees));
    res.send(employees);
  } else {
    return res.status(422).send("Unable to add Employee");
  }
});

app.put("/employees/:id", (req, res) => {
  const testid = parseInt(req.params.id);
  const { name, department, id, salary } = req.body;
  for (let i = 0; i < employees.length; i++) {
    if (employees[i].id === testid) {
      if (name && department && id && salary) {
        const newEmployee = {
          name,
          department,
          id,
          salary
        };
        employees[i] = newEmployee;
        fs.writeFileSync("./employees.json", JSON.stringify(employees));
        res.send(employees);
      } else {
        return res.status(400).send("Unable to Update Employee");
      }
    } else {
      return res.status(422).send("Unable to Update Employee");
    }
  }
});

app.listen(3001);
