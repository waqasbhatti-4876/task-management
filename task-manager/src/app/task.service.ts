import { Injectable } from '@angular/core';
import { Task } from './task.model';
import { TaskApiService } from './task-api.service';
import {BehaviorSubject,Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks = new BehaviorSubject<Task[]>([]);
  allTasks = this.tasks.asObservable();

  employees = new BehaviorSubject<any[]>([]);
  allEmployees = this.employees.asObservable();

  constructor(private taskApiService: TaskApiService) {
    this.getEmployees();
   }

  fetchTasks(): void {
    this.taskApiService.getTasks().subscribe(tasks => {
      this.tasks.next(tasks);
    });
  }

  getEmployees(): void {
    this.taskApiService.getEmployees().subscribe(employees => {
      this.employees.next(employees);
    });
  }

  addTask(task: Task): void {
    this.taskApiService.addTask(task).subscribe(newTask => {
      this.tasks.next(newTask);
    });
  }

  assignTask(task: Task): void {
      this.taskApiService.updateTask(task).subscribe(tasks => {
        this.tasks.next(tasks);
      });
  }

  updateTask(task: Task): void {
      this.taskApiService.updateTask(task).subscribe(tasks => {
        this.tasks.next(tasks);
      });
  }

  completeTask(task: any): void {

      task.completed = true;
      this.taskApiService.updateTask(task).subscribe();
  }

  deleteTask(taskId: number): void {
      this.taskApiService.deleteTask(taskId).subscribe(tasks => {
        this.tasks.next(tasks);
      });

  }
}
