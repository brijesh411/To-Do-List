let tasker = {
  construct: function () {
    tasker.selectElements();
    tasker.bindEvents();
    tasker.scanTaskList();
  },
  selectElements: function () {
    this.taskInput = document.getElementById("input");
    this.taskList = document.getElementById("tasksContainer");
    this.taskListChildren = this.taskList.children;
    this.submitBtn = document.getElementById("submit");
  },
  buildTask: function () {
    let taskListItem,
      taskMarkContainer,
      taskCompleted,
      taskValueContainer,
      taskValue,
      taskDeleteContainer,
      taskDelete;
    taskListItem = document.createElement("li");

    taskMarkContainer = document.createElement("span");
    taskMarkContainer.setAttribute("class", "mark");

    taskCompleted = document.createElement("input");
    taskCompleted.setAttribute("type", "checkbox");
    taskCompleted.setAttribute("class", "checkbox");

    taskMarkContainer.appendChild(taskCompleted);

    taskValueContainer = document.createElement("div");
    taskValueContainer.setAttribute("class", "list");
    taskValue = document.createElement("p");
    taskValue.innerHTML = this.taskInput.value;
    taskValueContainer.appendChild(taskValue);

    taskDeleteContainer = document.createElement("span");
    taskDeleteContainer.setAttribute("class", "delete");
    taskDelete = document.createElement("i");
    taskDelete.setAttribute("class", "las la-trash-alt");
    taskDeleteContainer.appendChild(taskDelete);

    taskListItem.appendChild(taskMarkContainer);
    taskListItem.appendChild(taskValueContainer);
    taskListItem.appendChild(taskDeleteContainer);

    this.taskList.appendChild(taskListItem);
  },

  addTask: function () {
    let taskValue = this.taskInput.value;
    const alertMessage = document.querySelector(".alert");
    const placeholder = document.querySelector(".placeholder");
    if (taskValue === "") {
      alertMessage.style.display = "block";

      function hideAlert() {
        alertMessage.style.display = "none";
      }
      setTimeout(hideAlert, 2000);
    } else {
      
      this.buildTask();
      this.taskInput.value = "";

      placeholder.style.display = "none";

      alertMessage.style.display = "none";

      this.scanTaskList();
    }
  },
  enterKey: function (event) {
    if (event.keyCode === 13 || event.which === 13) {
      this.addTask();
    }
  },
  bindEvents: function () {
   
    this.submitBtn.onclick = this.addTask.bind(this);

    this.taskInput.onkeypress = this.enterKey.bind(this);
  },
  scanTaskList: function () {
    let taskListItem, markIcon, deleteIcon;

    for (i = 0; i < this.taskListChildren.length; i++) {
      taskListItem = this.taskListChildren[i];

      markIcon = taskListItem.getElementsByClassName("checkbox")[0];
      deleteIcon = taskListItem.getElementsByClassName("delete")[0];

      markIcon.onclick = this.completeTask.bind(this, taskListItem, markIcon);

      deleteIcon.onclick = this.deleteTask.bind(this, i);
    }
  },
  completeTask: function (taskListItem, markIcon) {
    if (markIcon.checked) {
      taskListItem.style.textDecoration = "line-through";
    } else {
      taskListItem.style.textDecoration = "none";
    }
  },
  deleteTask: function (i) {
    this.taskListChildren[i].remove();
    this.scanTaskList();
  },
};


var formContainer = document.querySelector(".form-container");
var addTask = document.querySelector(".add svg");
var showInput = false;

addTask.addEventListener("click", function () {
  showInput = !showInput;
  if (showInput === true) {
    formContainer.style.display = "block";
   
    document.querySelector("#input").focus();
  } else {
    formContainer.style.display = "none";
  }
});


var today = new Date();

var date =
  today.getDate() +
  " " +
  today.toLocaleString("default", {
    month: "short",
  }) +
  ", " +
  today.getFullYear();

function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
  console.log("Working");
}
setInterval(function () {
  document.querySelector(".date").innerHTML = date;
  document.querySelector(".time").innerHTML = formatAMPM(new Date());
}, 100);

