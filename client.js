const button = document.querySelector("button");
const task = document.getElementById("task");
const description = document.getElementById("description");
const list = document.getElementById("list");
// const fa = document.querySelectorAll(".fa");

function getList() {
  fetch("http://localhost:3000/todos", {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      data.forEach((object) => {
        const eachTask = document.createElement("div");
        eachTask.classList.add("each-task");
        const h2 = document.createElement("h2");
        h2.innerHTML = object.task + ` #${object.id}`;
        const p = document.createElement("p");
        p.innerHTML = object.description;
        eachTask.appendChild(h2);
        eachTask.appendChild(p);
        const bin = document.createElement("i");
        bin.classList.add("fa");
        bin.classList.add("fa-trash");
        eachTask.appendChild(bin);
        eachTask.id = object.id;
        list.appendChild(eachTask);

        bin.addEventListener("click", (event) => {
          const id = event.target.parentElement.id;
          fetch("http://localhost:3000/todos/" + id, {
            method: "DELETE",
          }).then((response) => {
            getList();
          });
        });
      });
    })
    .catch((err) => {
      throw new Error("Error ocurred: " + err);
    });
}

button.addEventListener("click", () => {
  const obj = {
    task: task.value,
    description: description.value,
  };

  fetch("http://localhost:3000/todos", {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("HTTP error status: " + response.status);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Data added! " + JSON.stringify(data));
    })
    .catch((err) => {
      console.error("Error creating todo: " + err);
    });

  getList();
});

getList();
