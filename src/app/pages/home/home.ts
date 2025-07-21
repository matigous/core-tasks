import { Component } from '@angular/core';
import { TaskApi } from '../../shared/services/task-service';
import { TaskModel } from '../../shared/models/task-model';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrl: './home.scss',
  standalone: false,
})
export class Home {
  tasks: TaskModel[] = [];
  private destroy$ = new Subject<void>();

  constructor(private taskApi: TaskApi) { }

  ngOnInit(): void {
    this.taskApi.tasks$
      .pipe(takeUntil(this.destroy$))
      .subscribe(tasks => this.tasks = tasks);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onTaskAdded(taskData: { title: string, description: string }): void {
    const newTask: Omit<TaskModel, '_id'> = {
      title: taskData.title,
      description: taskData.description,
      completed: false,
      createdAt: new Date()
    };

    this.taskApi.addTask(newTask).subscribe({
      next: () => this.taskApi.loadTasks(),
      error: (error) => console.error('Erro ao adicionar tarefa:', error)
    });
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
