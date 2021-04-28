<!-- Use preprocessors via the lang attribute! e.g. <template lang="pug"> -->
<template>
	<div id="app" class="container">
		<nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
			navbar
		</nav>
		<div id="title" class="card">This is the title</div>
		<div id="calendar" class="card">this is a calendar</div>
		<div id="todo-list" v-cloak>
      <div id="todo-header">
        <time>
          <b>{{ days[day] }},</b>
          {{ date }}{{ ord }}
          <br />
          <span>{{ months[month] }}</span>
        </time>
        <p>
          <b>{{ tasks.length }}</b>
          Tasks
        </p>
        <button v-show="taskChecked()" transition="button" v-on:click="clearList()">
          CLEAR LIST
        </button>
      </div>
      <div id="todo-body">
        <input
          type="text"
          placeholder="Type your task and Press enter"
          v-model="newTask"
          v-on:keyup.enter="addTask"
        />
        <section v-if="tasks.length">
          <article v-for="(task, index) in tasks" transition="task" :key="index">
            <button v-show="!task.description" v-on:click="deleteTask($index)">+</button>
            <label v-show="task.description" transition="task">
              <input type="checkbox" v-model="task.finished" />
              <span></span>
            </label>
            <input
              type="text"
              placeholder="New task"
              value="task.description"
              v-model="task.description"
              v-bind:class="{ finished: task.finished }"
              v-bind:disabled="task.finished"
            />
            <time>{{ task.date }}</time>
          </article>
        </section>
      </div>
    </div>
	</div>
</template>

<script>
export default {
	data() {
    return {
      newTask: "",
      tasks: [],
      days: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ],
      day: new Date().getDay(),
      date: new Date().getDate(),
      month: new Date().getMonth(),
      ord: ""
    }
	},
	methods: {
		addTask: function () {
			if (this.newTask) {
				var d = new Date(),
					y = d.getFullYear(),
					mo = d.getMonth() + 1,
					da = d.getDate(),
					h = d.getHours(),
					m = ("0" + d.getMinutes()).slice(-2),
					s;
				h > 12 ? ((h -= 12), (s = "PM")) : ((h = h), (s = "AM"));

				var task = {
					description: this.newTask,
					date: y + "-" + mo + "-" + da + " " + h + ":" + m + " " + s,
					finished: false
				};

				this.tasks.push(task);
				this.newTask = "";
			}
		},
		deleteTask: function (index) {
			this.tasks.splice(index, 1);
		},
		clearList: function () {
			for (var i = this.tasks.length - 1; i > -1; i--)
				if (this.tasks[i].finished) this.tasks.splice(i, 1);
		},
    taskChecked: function () {
			for (var i = 0; i < this.tasks.length; i++)
				if (this.tasks[i].finished) return true;
		}
	},
	created() {
		switch (this.date) {
			case 1:
			case 21:
				this.ord = "st";
				break;
			case 2:
			case 22:
				this.ord = "nd";
				break;
			case 3:
			case 23:
				this.ord = "rd";
				break;
			default:
				this.ord = "th";
		}
	}
};
</script>

<!-- Use preprocessors via the lang attribute! e.g. <style lang="scss"> -->
<style>
::selection {
	background-color: #d6d6e4;
}

#todo-list * {
	position: relative;
	padding: 0;
	margin: 0;
	cursor: default;
	font-family: sans-serif;
	line-height: 1;
	font-weight: 400;
	text-decoration: none;
	list-style: none;
	outline: none;
	box-sizing: border-box;
}

#todo-header button,
#todo-header button:after,
#todo-body article button,
#todo-body article:before,
#todo-list label span:before,
#todo-list label span:after,
#todo-list .task-transition,
#todo-list .task-enter,
#todo-list .task-leave,
#todo-list .button-transition,
#todo-list .button-enter,
#todo-list .button-leave,
#todo-list .finished {
	transition: all 200ms linear;
}

body {
	min-height: 100vh;
}

#todo-list div {
	display: block;
	width: 100%;
	min-width: 280px;
	max-width: 480px;
	background-color: #fefeff;
	border-radius: 8px;
	overflow: hidden;
	box-shadow: 0 15px 150px rgba(0, 0, 0, 0.15);
}

#todo-header {
	height: 130px;
	width: 100%;
	padding: 30px 120px 30px 30px;
	background: #fff;
	background: -webkit-linear-gradient(to bottom, #fff, #fafaff);
	background: -moz-linear-gradient(to bottom, #fff, #fafaff);
	background: -o-linear-gradient(to bottom, #fff, #fafaff);
	background: linear-gradient(to bottom, #fff, #fafaff);
	border-bottom: 1px solid #e0e9f1;
}
#todo-header b {
	font-weight: 500;
}

#todo-header time {
	font-size: 30px;
	color: #666afb;
	letter-spacing: 0.8;
}
#todo-header time span {
	display: block;
	margin-top: 15px;
	font-size: 20px;
	color: #a8a9ca;
	letter-spacing: 0.4;
}

#todo-header p {
	position: absolute;
	top: 42px;
	right: 30px;
	font-size: 16px;
	color: #a8a9ca;
	letter-spacing: 0.4;
}

#todo-header button {
	position: absolute;
	bottom: 28px;
	right: 30px;
	width: 100px;
	height: 32px;
	text-align: center;
	color: #fff;
	padding: 8px;
	font-size: 11px;
	font-weight: 500;
	letter-spacing: 0.4;
	text-transform: uppercase;
	border: none;
	outline: none;
	border-radius: 4px;
	background-color: #fb6f70;
	overflow: hidden;
	cursor: pointer;
}

#todo-header button:after {
	display: block;
	position: absolute;
	content: "";
	top: -1px;
	left: 27px;
	width: 30px;
	height: 30px;
	background-color: #fff;
	border-radius: 30px;
	filter: alpha(opacity=0);
	opacity: 0;
}

#todo-header button:hover:after {
	top: -28px;
	left: 0px;
	width: 100px;
	height: 100px;
	filter: alpha(opacity=15);
	opacity: 0.15;
}

#todo-body {
	background-color: #fff;
}

#todo-body article {
	overflow: hidden;
}

#todo-body article:after {
	display: block;
	position: absolute;
	content: "";
	bottom: 0px;
	left: 0px;
	width: 100%;
	height: 30px;
	background: transparent;
	background: linear-gradient(
		to bottom,
		rgba(255, 255, 255, 0),
		rgba(255, 255, 255, 1)
	);
	z-index: 3;
	pointer-events: none;
}

#todo-body article:before {
	display: block;
	position: absolute;
	content: "";
	top: 0px;
	left: 0px;
	width: 0px;
	height: 100%;
	background-color: transparent;
	z-index: 4;
}

#todo-body article:hover:before {
	width: 6px;
	background-color: #fb6f70;
}

#todo-body:before {
	content: "+";
	position: absolute;
	top: 30px;
	left: 30px;
	width: 24px;
	height: 24px;
	font-size: 40px;
	font-weight: 300;
	line-height: 0.6;
	text-align: center;
	color: rgba(168, 169, 202, 0.8);
	z-index: 1;
}

#todo-body input:nth-child(1) {
	padding: 0px 30px 0px 80px;
}
#todo-body input::-ms-clear {
	display: none;
}
#todo-body input,
#todo-body input:disabled {
	position: relative;
	width: 100%;
	height: 85px;
	padding: 0px 130px 0px 80px;
	font-size: 20px;
	color: #82829c;
	letter-spacing: 0.4;
	border: none;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	word-wrap: normal;
	word-break: break-all;
	background-color: #fff;
	border-bottom: 1px solid #eef3f8;
	cursor: text;
}
#todo-body input:disabled {
	opacity: 1;
}

#todo-body .finished {
	text-decoration: line-through;
}

#todo-body article button,
#todo-body article button:active,
#todo-body article button:focus {
	position: absolute;
	display: block;
	border: none;
	outline: none;
	top: 30px;
	left: 30px;
	width: 24px;
	height: 24px;
	font-size: 40px;
	font-weight: 300;
	line-height: 0.6;
	text-align: center;
	color: rgba(168, 169, 202, 0.8);
	background-color: transparent;
	transform: rotate(45deg);
	z-index: 1;
	cursor: pointer;
}

#todo-body article button:hover {
	color: rgba(130, 130, 156, 1);
}

#todo-body article time {
	position: absolute;
	top: 36px;
	right: 30px;
	font-size: 16px;
	color: #d6d6e4;
	letter-spacing: 0.4;
	text-transform: uppercase;
}

#todo-body article label {
	position: absolute;
	top: 0px;
	left: 0px;
	height: 100%;
	width: 80px;
	z-index: 2;
}

#todo-body article label span {
	display: block;
	position: absolute;
	top: 0px;
	left: 0px;
	width: 100%;
	height: 100%;
	cursor: pointer;
}

#todo-body article label input {
	display: none;
}

#todo-body article label input + span:before {
	content: "";
	display: block;
	position: absolute;
	top: 30px;
	left: 30px;
	border-radius: 4px;
	width: 20px;
	height: 20px;
	border: 2px solid #d6d6e4;
	background-color: #fff;
}

#todo-body article label input:checked + span:before {
	border: 2px solid #fb6f70;
	background-color: #fb6f70;
}

#todo-body article label input + span:after {
	content: "";
	display: block;
	top: 33px;
	left: 38px;
	width: 6px;
	height: 12px;
	border-bottom: 2px solid #fff;
	border-right: 2px solid #fff;
	position: absolute;
	pointer-events: none;
	transform: scale(0.6, 0.6) rotate(45deg);
}

#todo-body article label input:checked + span:after {
	transform: scale(1, 1) rotate(45deg);
}

#todo-list .task-transition {
	height: 85px;
	filter: alpha(opacity=100);
	opacity: 1;
}

#todo-list .task-enter,
#todo-list .task-leave {
	height: 0;
	filter: alpha(opacity=0);
	opacity: 0;
}

#todo-list .button-transition {
	filter: alpha(opacity=100);
	opacity: 1;
}

#todo-list .button-enter,
#todo-list .button-leave {
	filter: alpha(opacity=0);
	opacity: 0;
}

@media (max-width: 430px) {
	#todo-header {
		padding-top: 35px;
	}
	#todo-header time {
		font-size: 24px;
	}
	#todo-header time span {
		margin-top: 5px;
	}
}

[v-cloak] {
	display: none;
}

#title {
	grid-area: title;
	min-height: 10vh;
	margin-top: 5vh;
	background-color: #999999;
}
#calendar {
	grid-area: calendar;
	min-height: 70vh;
	background-color: #ff8080;
}
#todo-list {
	grid-area: todolist-wrapper;
	min-height: 70vh;
	background-color: #8080ff;
}
#todo-list {
	min-height: 60vh;
}
body {
	min-height: 100vh;
}
#app {
	display: grid !important;
	grid: auto-flow dense/ repeat(auto-fit, minmax(5rem, auto));
	grid-gap: 1rem;
	grid-template-areas: "title title title" "calendar todolist-wrapper todolist-wrapper";
	text-align: center;
}
body,
#title,
#calendar,
#todo-list {
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
}
</style>
