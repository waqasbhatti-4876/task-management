import { Component, OnInit } from '@angular/core';
import {Task} from '../task.model';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {

  title: string = '';
  assignedTo: number = 0;
  employees:any[] = [];

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.taskService.allEmployees.subscribe(employees => {
      this.employees = employees;
    })
  }

  createTask(): void {
    const task: Task = {
      id: 0,
      title: this.title,
      assignedTo: this.assignedTo,
      completed: false,
      status:"Pending",
      name:' '
    };
    console.log(task);
    this.taskService.addTask(task);
    this.title = '';
    this.assignedTo = 0;
    this.taskService.fetchTasks();
  }

  onChange(event: any){
    this.assignedTo = parseInt(event.target.value);
  }
}
