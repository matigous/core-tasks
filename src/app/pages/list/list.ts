import { Component, inject } from '@angular/core';
import { TaskApi } from '../../shared/services/task-service';
import { TaskModel } from '../../shared/models/task-model';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.html',
  styleUrl: './list.scss',
  standalone: false,
})
export class List {
  private taskApi = inject(TaskApi);
  private destroy$ = new Subject<void>();
  tasks: TaskModel[] = [];

  constructor() { }

  ngOnInit(): void {
    this.taskApi.tasks$
      .pipe(takeUntil(this.destroy$))
      .subscribe(tasks => this.tasks = tasks);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onTaskToggled(task: TaskModel): void {
    if (task._id) {
      this.taskApi.updateTask(task._id, { completed: task.completed })
        .subscribe({
          next: () => this.taskApi.loadTasks(),
          error: (error) => console.error('Erro ao atualizar tarefa:', error)
        });
    }
  }

  onTaskDeleted(taskId: string): void {
    this.taskApi.deleteTask(taskId).subscribe({
      next: () => this.taskApi.loadTasks(),
      error: (error) => console.error('Erro ao remover tarefa:', error)
    });
  }
}
