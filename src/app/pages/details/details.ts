import { Component, inject } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { TaskModel } from '../../shared/models/task-model';
import { TaskApi } from '../../shared/services/task-service';

@Component({
  selector: 'app-details',
  templateUrl: './details.html',
  styleUrl: './details.scss',
  standalone: false,
})
export class Details {
  private _route = inject(ActivatedRoute);
  private _taskApi = inject(TaskApi);
  private _location = inject(Location);
  task!: TaskModel;
  taskId: string | null = null;
  locationState: unknown | null = null;

  constructor() {
    this.taskId = this._route.snapshot.paramMap.get('id');
    this.locationState = this._location.getState();
  }

  loadTask(): void {
    if (this.taskId) {
      this._taskApi.getTask(this.taskId).subscribe({
        next: (task) => this.task = task,
        error: (error) => console.error('Erro ao carregar tarefa:', error)
      });
    }
  }

  onTaskToggled(task: TaskModel): void {
    if (task._id) {
      this._taskApi.updateTask(task._id, { completed: task.completed })
        .subscribe({
          next: () => this._taskApi.loadTasks(),
          error: (error) => console.error('Erro ao atualizar tarefa:', error)
        });
    }
  }

  onTaskDeleted(taskId: string): void {
    this._taskApi.deleteTask(taskId).subscribe({
      next: () => this._taskApi.loadTasks(),
      error: (error) => console.error('Erro ao remover tarefa:', error)
    });
  }
}
