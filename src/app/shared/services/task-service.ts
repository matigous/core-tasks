import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { TaskModel } from '../models/task-model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class TaskApi {
  private readonly url = `${environment.apiUrl}/tasks`;
  private http = inject(HttpClient);
  private tasksSubject = new BehaviorSubject<TaskModel[]>([]);
  public tasks$ = this.tasksSubject.asObservable();

  constructor() {
    this.loadTasks();
  }

  loadTasks(): void {
    this.http.get<TaskModel[]>(this.url).subscribe({
      next: (tasks) => this.tasksSubject.next(tasks),
      error: (error) => console.error('Erro ao carregar tarefas:', error)
    });
  }

  getTask(id: string): Observable<TaskModel> {
    return this.http.get<TaskModel>(`${this.url}/${id}`);
  }

  addTask(task: Omit<TaskModel, '_id'>): Observable<TaskModel> {
    return this.http.post<TaskModel>(this.url, task);
  }

  updateTask(id: string, task: Partial<TaskModel>): Observable<TaskModel> {
    return this.http.put<TaskModel>(`${this.url}/${id}`, task);
  }

  deleteTask(id: string): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }
}
