import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of, tap, throwError } from 'rxjs';
import { TaskModel } from '../models/task-model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class TaskApi {
  private readonly apiUrl = environment.apiUrl;
  private readonly url = this.apiUrl ? `${this.apiUrl}/tasks` : '';
  private http = inject(HttpClient);

  private tasksSubject = new BehaviorSubject<TaskModel[]>([]);
  public tasks$ = this.tasksSubject.asObservable();

  private localTasks: TaskModel[] = [
    { _id: '1', title: 'Configurar máquina', description: 'Configurar ambiente de dev', completed: true, createdAt: new Date() },
    { _id: '2', title: 'Codar', description: 'Criar componentes Angular', completed: false, createdAt: new Date() },
    { _id: '3', title: 'Estilizar', description: 'Estilizar a página principal', completed: false, createdAt: new Date() },
    { _id: '4', title: 'Testar', description: 'Testar a aplicação', completed: false, createdAt: new Date() },
  ];

  constructor() {
    this.loadTasks();
  }


  loadTasks(): void {
    if (this.apiUrl) {
      this.http.get<TaskModel[]>(this.url).subscribe({
        next: (tasks) => this.tasksSubject.next(tasks),
        error: (error) => console.error('Erro ao carregar tarefas da API:', error),
      });
    } else {
      console.warn('API URL não definida. Usando dados locais (mock).');
      this.tasksSubject.next(this.localTasks);
    }
  }

  getTask(id: string): Observable<TaskModel> {
    if (this.apiUrl) {
      return this.http.get<TaskModel>(`${this.url}/${id}`);
    } else {
      const task = this.localTasks.find((t) => t._id === id);
      return task ? of(task) : throwError(() => new Error('Tarefa não encontrada'));
    }
  }

  addTask(task: Omit<TaskModel, '_id'>): Observable<TaskModel> {
    if (this.apiUrl) {
      return this.http.post<TaskModel>(this.url, task).pipe(
        tap(() => this.loadTasks())
      );
    } else {
      const newTask: TaskModel = {
        _id: Date.now().toString(),
        ...task,
      };
      this.localTasks.push(newTask);
      this.tasksSubject.next([...this.localTasks]);
      return of(newTask);
    }
  }

  updateTask(id: string, taskUpdate: Partial<TaskModel>): Observable<TaskModel> {
    if (this.apiUrl) {
      return this.http.put<TaskModel>(`${this.url}/${id}`, taskUpdate).pipe(
        tap(() => this.loadTasks())
      );
    } else {
      const taskIndex = this.localTasks.findIndex((t) => t._id === id);
      if (taskIndex > -1) {
        const updatedTask = { ...this.localTasks[taskIndex], ...taskUpdate };
        this.localTasks[taskIndex] = updatedTask;
        this.tasksSubject.next([...this.localTasks]);
        return of(updatedTask);
      }
      return throwError(() => new Error('Tarefa não encontrada para atualização'));
    }
  }

  deleteTask(id: string): Observable<any> {
    if (this.apiUrl) {
      return this.http.delete(`${this.url}/${id}`).pipe(
        tap(() => this.loadTasks())
      );
    } else {
      this.localTasks = this.localTasks.filter((t) => t._id !== id);
      this.tasksSubject.next([...this.localTasks]);
      return of({ message: 'Tarefa deletada com sucesso' });
    }
  }
}
