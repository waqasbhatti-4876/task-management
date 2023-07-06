import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from './task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskApiService {
  private apiUrl = 'https://localhost:7146/api/tasks'; // Update with your API endpoint URL

  constructor(private http: HttpClient) { }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  getEmployees(): Observable<any> {
    const url = `${this.apiUrl}/employees`;
    return this.http.get<any>(url);
  }

  addTask(task: Task): Observable<Task[]> {
    return this.http.post<Task[]>(this.apiUrl, task);
  }

  updateTask(task: Task): Observable<Task[]> {
    const url = `${this.apiUrl}`;
    return this.http.put<Task[]>(url, task);
  }

  deleteTask(taskId: number): Observable<Task[]> {
    const url = `${this.apiUrl}/${taskId}`;
    return this.http.delete<Task[]>(url);
  }
}
