import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.html',
  styleUrls: ['./add-task.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class AddTask {
  @Output() taskAdded = new EventEmitter<{ title: string, description: string }>();

  taskForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      this.taskAdded.emit({
        title: this.taskForm.get('title')?.value,
        description: this.taskForm.get('description')?.value
      });
      this.taskForm.reset();
    }
  }

  get isTitleInvalid(): boolean {
    const titleControl = this.taskForm.get('title');
    return titleControl ? titleControl.invalid && titleControl.touched : false;
  }

  get isDescriptionInvalid(): boolean {
    const descriptionControl = this.taskForm.get('description');
    return descriptionControl ? descriptionControl.invalid && descriptionControl.touched : false;
  }
}
