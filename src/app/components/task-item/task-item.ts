import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TaskModel } from '../../shared/models/task-model';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.html',
  styleUrls: ['./task-item.scss'],
  imports: [
    CommonModule,
    MatCardModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatListModule
  ]
})
export class TaskItem {
  @Input() task!: TaskModel;
  @Output() taskToggled = new EventEmitter<TaskModel>();
  @Output() taskDeleted = new EventEmitter<string>();

  onToggleComplete(): void {
    this.taskToggled.emit({
      ...this.task,
      completed: !this.task.completed
    });
  }

  onDelete(): void {
    if (this.task._id) {
      this.taskDeleted.emit(this.task._id);
    }
  }
}
