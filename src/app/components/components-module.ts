import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { AddTask } from "./add-task/add-task";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatChipsModule } from "@angular/material/chips";
import { MatListModule } from "@angular/material/list";
import { TaskItem } from "./task-item/task-item";
import { TaskList } from "./task-list/task-list";

@NgModule({
  declarations: [AddTask, TaskItem, TaskList],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatChipsModule,
    MatListModule
  ],
  exports: [AddTask, TaskItem, TaskList],
})
export class ComponentsModule { }
