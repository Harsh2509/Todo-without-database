const express = require("express");
const app = express();
const fs = require("fs");
const cors = require("cors");
const PORT_NO = 3000;

function findIndex(obj, id) {
  let index = -1;
  obj.forEach((element, i) => {
    if (element.id === id) {
      index = i;
    }
  });
  return index;
}

app.use(cors());
app.use(express.json());

app.get("/todos", (req, res) => {
  fs.readFile("./todo.json", "utf-8", (err, data) => {
    if (err) {
      res.sendStatus(500);
    }
    res.json(JSON.parse(data));
  });
});

app.post("/todos", (req, res) => {
  const objToAdd = req.body;
  console.log(objToAdd);
  const id = parseInt(Math.random() * 100000);
  objToAdd["id"] = id;
  fs.readFile("./todo.json", "utf-8", (err, data) => {
    if (err) {
      res.sendStatus(500);
    }
    const oldObj = JSON.parse(data);
    oldObj.push(objToAdd);

    fs.writeFile("./todo.json", JSON.stringify(oldObj), (err) => {
      if (err) res.sendStatus("500");
      res.send(objToAdd);
    });
  });
});

app.delete("/todos/:id", (req, res) => {
  const todoId = req.params.id;
  fs.readFile("./todo.json", "utf-8", (err, data) => {
    if (err) {
      res.sendStatus(500);
    }
    const oldObj = JSON.parse(data);
    const index = findIndex(oldObj, parseInt(todoId));
    oldObj.splice(index, 1);
    fs.writeFile("./todo.json", JSON.stringify(oldObj), (err) => {
      if (err) {
        res.sendStatus(500);
      }
      res.send("Deleted id: " + todoId);
    });
  });
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.listen(PORT_NO, () => {
  console.log("Listening at port " + PORT_NO);
});
