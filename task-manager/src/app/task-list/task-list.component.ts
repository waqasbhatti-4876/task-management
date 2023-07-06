import { Component, OnInit } from '@angular/core';
import {Task} from '../task.model';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  tasks: Task[] = [];
  editTaskId: number | null;
  editedTask: Task = {} as Task;
  employees:any[] = [];
  showTasks: Task[] = [];
  status:string = "";
  statuses = ["Pending","In Progress","Completed","Cancelled"]

  constructor(private taskService: TaskService) {
    this.editTaskId = null;
    this.taskService.fetchTasks();
   }

  ngOnInit(): void {

    this.taskService.allTasks.subscribe(tasks => {
      this.tasks = tasks;
    });
    this.taskService.allEmployees.subscribe(employees => {
      this.employees = employees;
    });
    this.editedTask = {} as Task;
  }

  editTask(task: Task): void {
    this.editTaskId = task.id;
    this.editedTask = { ...task };
  }

  updateTask(): void {
    this.taskService.updateTask(this.editedTask);
    this.cancelEdit();
  }

  cancelEdit(): void {
    this.editTaskId = null;
    this.editedTask = {} as Task;
  }

  deleteTask(taskId: number): void {
    this.taskService.deleteTask(taskId);
  }

  onChange(event: any){
    this.editedTask.assignedTo = parseInt(event.target.value);
  }
}
