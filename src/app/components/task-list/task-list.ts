import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TaskModel } from '../../shared/models/task-model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.html',
  styleUrls: ['./task-list.scss'],
  standalone: false,
})
export class TaskList {
  @Input() tasks: TaskModel[] = [];

  @Output() taskToggled = new EventEmitter<TaskModel>();
  @Output() taskDeleted = new EventEmitter<string>();

  onTaskToggled(task: TaskModel): void {
    this.taskToggled.emit(task);
  }

  onTaskDeleted(taskId: string): void {
    this.taskDeleted.emit(taskId);
  }

  get completedTasks(): number {
    return this.tasks.filter(task => task.completed).length;
  }

  get totalTasks(): number {
    return this.tasks.length;
  }
}
