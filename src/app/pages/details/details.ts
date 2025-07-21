import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskItem } from '../../components/task-item/task-item';
import { CommonModule } from '@angular/common';
import { TaskModel } from '../../shared/models/task-model';
import { TaskApi } from '../../shared/services/task-api';

@Component({
  selector: 'app-details',
  imports: [
    CommonModule,
    TaskItem
  ],
  templateUrl: './details.html',
  styleUrl: './details.scss'
})
export class Details {
  private route = inject(ActivatedRoute);
  private taskApi = inject(TaskApi);
  task!: TaskModel;
  taskId: string | null = null;

  constructor() {
    this.taskId = this.route.snapshot.paramMap.get('id');
  }

  loadTask(): void {
    if (this.taskId) {
      this.taskApi.getTask(this.taskId).subscribe({
        next: (task) => this.task = task,
        error: (error) => console.error('Erro ao carregar tarefa:', error)
      });
    }
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
