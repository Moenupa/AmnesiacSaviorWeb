<!-- Use preprocessors via the lang attribute! e.g. <template lang="pug"> -->
<template>
	<div id="app" class="container">
    <div id="calendar">
      <date-picker v-model="curTargetDate" placeholder="Select Date"></date-picker>
    </div>
		<div id="todo-list" v-if="this.curTargetDate" v-cloak>
      <div id="todo-header">
        <time>
          <b>{{ months[curTargetDate.getMonth()] }} {{ curTargetDate.getDate() }}{{ getDateAppendix() }}</b>
          <br />
          <span>{{ days[curTargetDate.getDay()] }}</span>
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
          <span v-for="(task, index) in tasks" :key="index">
            <article v-if="isTargetDate(index)" transition="task">
              <button v-show="!task.description" v-on:click="deleteTask($index)">+</button>
              <label v-show="task.description" transition="task">
                <input type="checkbox" v-model="task.finished" v-on:change="writeToFirestore()" />
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
              <time>{{ getDate(task.addDate) }}</time>
            </article>
          </span>
        </section>
      </div>
    </div>
	</div>
</template>

<script>
import DatePicker from 'vue2-datepicker';
export default {
  components: { DatePicker },
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
      curTargetDate: null
    }
	},
  async fetch () {
    const messageRef = this.$fire.firestore.collection('todolist').doc('qvhvIWuafQf2y9SVFJIe');
    try {
      const messageDoc = await messageRef.get();
      this.tasks = messageDoc.data().tasks;
    } catch (e) {
      console.log(e);
      return;
    }
  },
	methods: {
    async writeToFirestore() {
      const messageRef = this.$fire.firestore.collection('todolist').doc('qvhvIWuafQf2y9SVFJIe');
      try {
        await messageRef.set({tasks:this.tasks});
      } catch (e) {
        console.log(e);
        return;
      }
    },
		addTask() {
			if (this.newTask) {
				var task = {
					description: this.newTask,
          targetDate: this.curTargetDate.getTime(),
					addDate: new Date().getTime(),
					finished: false
				};

				this.tasks.push(task);
				this.newTask = "";
        this.writeToFirestore();
			}
		},
		deleteTask(index) {
			this.tasks.splice(index, 1);
      this.writeToFirestore();
		},
		clearList() {
      var updated = false;
			for (var i = this.tasks.length - 1; i > -1; i--)
				if (this.tasks[i].finished) 
        {
          updated = true;
          this.tasks.splice(i, 1);
        }
      if (updated)
        this.writeToFirestore();
		},
    taskChecked() {
			for (var i = 0; i < this.tasks.length; i++)
				if (this.tasks[i].finished) return true;
		},
    isTargetDate(index) {
      if (this.tasks[index].targetDate === this.curTargetDate.getTime())
        return true;
    },
    getDateAppendix() {
      switch (this.curTargetDate.getDate()) {
        case 1:
        case 21:
          return "st";
        case 2:
        case 22:
          return "nd";
        case 3:
        case 23:
          return "rd";
        default:
          return "th";
      }
    },
    getDate(datetime) {
      var d = new Date(datetime),
					y = d.getFullYear(),
					mo = d.getMonth() + 1,
					da = d.getDate(),
					h = d.getHours(),
					m = ("0" + d.getMinutes()).slice(-2),
					s;
				h > 12 ? ((h -= 12), (s = "PM")) : ((h = h), (s = "AM"));
      return y+"-"+mo+"-"+da+" "+h+":"+m+" "+s;
    }
	}
};
</script>

<!-- Use preprocessors via the lang attribute! e.g. <style lang="scss"> -->
<style>
:root {
  --width: 480px;
}
* {
  border-radius: 8px;
}
.mx-icon-left:before,
.mx-icon-right:before,
.mx-icon-double-left:before,
.mx-icon-double-right:before,
.mx-icon-double-left:after,
.mx-icon-double-right:after {
  content: "";
  position: relative;
  top: -1px;
  display: inline-block;
  width: 10px;
  height: 10px;
  vertical-align: middle;
  border-style: solid;
  border-color: currentColor;
  border-width: 2px 0 0 2px;
  border-radius: 1px;
  box-sizing: border-box;
  transform-origin: center;
  transform: rotate(-45deg) scale(0.7);
}
.mx-icon-double-left:after {
  left: -4px;
}
.mx-icon-double-right:before {
  left: 4px;
}
.mx-icon-right:before,
.mx-icon-double-right:before,
.mx-icon-double-right:after {
  transform: rotate(135deg) scale(0.7);
}
.mx-btn {
  box-sizing: border-box;
  line-height: 1;
  font-size: 14px;
  font-weight: 500;
  padding: 7px 15px;
  margin: 0;
  cursor: pointer;
  background-color: transparent;
  outline: none;
  border: 1px solid rgba(0, 0, 0, 0.1);
  color: #73879c;
  white-space: nowrap;
}
.mx-btn:hover {
  border-color: #1284e7;
  color: #1284e7;
}
.mx-btn-text {
  border: 0;
  padding: 0 4px;
  text-align: left;
  line-height: inherit;
}
.mx-scrollbar {
  height: 100%;
}
.mx-scrollbar:hover .mx-scrollbar-track {
  opacity: 1;
}
.mx-scrollbar-wrap {
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
}
.mx-scrollbar-track {
  position: absolute;
  top: 2px;
  right: 2px;
  bottom: 2px;
  width: 6px;
  z-index: 1;
  opacity: 0;
  transition: opacity 0.24s ease-out;
}
.mx-scrollbar-track .mx-scrollbar-thumb {
  position: absolute;
  width: 100%;
  height: 0;
  cursor: pointer;
  background-color: rgba(144, 147, 153, 0.3);
  transition: background-color 0.3s;
}
.mx-zoom-in-down-enter-active,
.mx-zoom-in-down-leave-active {
  opacity: 1;
  transform: scaleY(1);
  transition: opacity 0.3s cubic-bezier(0.23, 1, 0.32, 1), -webkit-transform 0.3s cubic-bezier(0.23, 1, 0.32, 1);
  transition: transform 0.3s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.3s cubic-bezier(0.23, 1, 0.32, 1);
  transition: transform 0.3s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.3s cubic-bezier(0.23, 1, 0.32, 1), -webkit-transform 0.3s cubic-bezier(0.23, 1, 0.32, 1);
  transform-origin: center top;
}
.mx-zoom-in-down-enter,
.mx-zoom-in-down-leave-to {
  opacity: 0;
  transform: scaleY(0);
}
.mx-datepicker {
  padding: 8px 30px;
  position: relative;
  background: #f9f9f9;
}
.mx-datepicker svg {
  width: 1em;
  height: 1em;
  border-radius: 0;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
.mx-datepicker-range {
  width: 320px;
}
.mx-datepicker-inline {
  width: auto;
}
.mx-input-wrapper {
  position: relative;
}
.mx-input-wrapper .mx-icon-clear {
  display: none;
}
.mx-input-wrapper:hover .mx-icon-clear {
  display: block;
}
.mx-input-wrapper:hover .mx-icon-clear + .mx-icon-calendar {
  display: none;
}
.mx-input {
  box-sizing: border-box;
  width: 100%;
  height: 34px;
  padding: 6px 30px;
  padding-left: 10px;
  font-size: 14px;
  line-height: 1.4;
  color: #555;
  text-align: center;
  border: none;
}
.mx-input:hover,
.mx-input:focus {
  border-color: #409aff;
}
.mx-input:disabled,
.mx-input.disabled {
  color: #ccc;
  background-color: #f3f3f3;
  border-color: #ccc;
  cursor: not-allowed;
}
.mx-input:focus {
  outline: none;
}
.mx-input::-ms-clear {
  display: none;
}
.mx-icon-calendar,
.mx-icon-clear {
  position: absolute;
  top: 50%;
  right: 8px;
  transform: translateY(-50%);
  font-size: 16px;
  line-height: 1;
  color: rgba(0, 0, 0, 0.5);
  vertical-align: middle;
}
.mx-icon-clear {
  cursor: pointer;
}
.mx-icon-clear:hover {
  color: rgba(0, 0, 0, 0.8);
}
.mx-datepicker-main {
  font: 14px/1.5 sans-serif;
  color: #73879c;
  background-color: #fff;
  border: 0;
}
.mx-datepicker-popup {
  left: unset !important;
  position: absolute;
  margin: 4px auto;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
  z-index: 2001;
}
.mx-datepicker-sidebar {
  float: left;
  box-sizing: border-box;
  width: 100px;
  padding: 6px;
  overflow: auto;
}
.mx-datepicker-sidebar + .mx-datepicker-content {
  margin-left: 100px;
  border-left: 1px solid #e8e8e8;
}
.mx-datepicker-body {
  position: relative;
  user-select: none;
}
.mx-btn-shortcut {
  display: block;
  padding: 0 6px;
  line-height: 24px;
}
.mx-range-wrapper {
  display: flex;
}
@media (max-width: 750px) {
  .mx-range-wrapper {
    flex-direction: column;
  }
}
.mx-datepicker-header {
  padding: 6px 8px;
  border-bottom: 1px solid #e8e8e8;
}
.mx-datepicker-footer {
  padding: 6px 8px;
  text-align: right;
  border-top: 1px solid #e8e8e8;
}
.mx-calendar {
  box-sizing: border-box;
  width: 248px;
  padding: 6px 12px;
}
.mx-calendar + .mx-calendar {
  border-left: 1px solid #e8e8e8;
}
.mx-calendar-header,
.mx-time-header {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  height: 34px;
  line-height: 34px;
  text-align: center;
  overflow: hidden;
}
.mx-btn-icon-left,
.mx-btn-icon-double-left {
  float: left;
}
.mx-btn-icon-right,
.mx-btn-icon-double-right {
  float: right;
}
.mx-calendar-header-label {
  font-size: 14px;
}
.mx-calendar-decade-separator {
  margin: 0 2px;
}
.mx-calendar-decade-separator:after {
  content: "~";
}
.mx-calendar-content {
  position: relative;
  height: 224px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.mx-calendar-content .cell {
  cursor: pointer;
}
.mx-calendar-content .cell:hover {
  color: #73879c;
  background-color: #f3f9fe;
}
.mx-calendar-content .cell.active {
  color: #fff;
  background-color: #1284e7;
}
.mx-calendar-content .cell.in-range,
.mx-calendar-content .cell.hover-in-range {
  color: #73879c;
  background-color: #dbedfb;
}
.mx-calendar-content .cell.disabled {
  cursor: not-allowed;
  color: #ccc;
  background-color: #f3f3f3;
}
.mx-calendar-week-mode .mx-date-row {
  cursor: pointer;
}
.mx-calendar-week-mode .mx-date-row:hover {
  background-color: #f3f9fe;
}
.mx-calendar-week-mode .mx-date-row.mx-active-week {
  background-color: #dbedfb;
}
.mx-calendar-week-mode .mx-date-row .cell:hover {
  color: inherit;
  background-color: transparent;
}
.mx-calendar-week-mode .mx-date-row .cell.active {
  color: inherit;
  background-color: transparent;
}
.mx-week-number {
  opacity: 0.5;
}
.mx-table {
  table-layout: fixed;
  border-collapse: separate;
  border-spacing: 0;
  width: 100%;
  height: 100%;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  text-align: center;
  vertical-align: middle;
}
.mx-table th {
  padding: 0;
  font-weight: 500;
}
.mx-table td {
  padding: 0;
}
.mx-table-date td,
.mx-table-date th {
  height: 32px;
  font-size: 12px;
}
.mx-table-date .today {
  color: #2a90e9;
}
.mx-table-date .cell.not-current-month {
  color: #ccc;
  background: none;
}
.mx-time {
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  width: 224px;
  background: #fff;
}
.mx-time + .mx-time {
  border-left: 1px solid #e8e8e8;
}
.mx-calendar-time {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.mx-time-header {
  border-bottom: 1px solid #e8e8e8;
}
.mx-time-content {
  height: 224px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  overflow: hidden;
}
.mx-time-columns {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.mx-time-column {
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  position: relative;
  border-left: 1px solid #e8e8e8;
  text-align: center;
}
.mx-time-column:first-child {
  border-left: 0;
}
.mx-time-column .mx-time-list {
  margin: 0;
  padding: 0;
  list-style: none;
}
.mx-time-column .mx-time-list::after {
  content: "";
  display: block;
  height: 192px;
}
.mx-time-column .mx-time-item {
  cursor: pointer;
  font-size: 12px;
  height: 32px;
  line-height: 32px;
}
.mx-time-column .mx-time-item:hover {
  color: #73879c;
  background-color: #f3f9fe;
}
.mx-time-column .mx-time-item.active {
  color: #1284e7;
  background-color: transparent;
  font-weight: 700;
}
.mx-time-column .mx-time-item.disabled {
  cursor: not-allowed;
  color: #ccc;
  background-color: #f3f3f3;
}
.mx-time-option {
  cursor: pointer;
  padding: 8px 10px;
  font-size: 14px;
  line-height: 20px;
}
.mx-time-option:hover {
  color: #73879c;
  background-color: #f3f9fe;
}
.mx-time-option.active {
  color: #1284e7;
  background-color: transparent;
  font-weight: 700;
}
.mx-time-option.disabled {
  cursor: not-allowed;
  color: #ccc;
  background-color: #f3f3f3;
}

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

#todo-list > div,
#calendar {
	display: block;
  width: var(--width);
	background-color: #fefeff;
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
  margin: 4px 0;
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
</style>
