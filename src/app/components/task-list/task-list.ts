import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TaskModel } from '../../shared/models/task-model';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { TaskItem } from '../task-item/task-item';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.html',
  styleUrls: ['./task-list.scss'],
  imports: [
    CommonModule,
    MatCardModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatListModule,
    TaskItem
  ]
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
