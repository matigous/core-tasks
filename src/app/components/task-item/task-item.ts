import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TaskModel } from '../../shared/models/task-model';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.html',
  styleUrls: ['./task-item.scss'],
  standalone: false
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
