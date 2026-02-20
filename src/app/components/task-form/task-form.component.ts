import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Task } from '../../interfaces/task.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  template: `
    <form [formGroup]="taskForm" (ngSubmit)="onSubmit()" class="task-form">
      <div class="form-group">
        <label for="title">Título</label>
        <input
          id="title"
          type="text"
          formControlName="title"
          placeholder="¿Qué necesitas hacer?"
        />
        <div
          *ngIf="
            taskForm.get('title')?.invalid &&
            (taskForm.get('title')?.dirty || taskForm.get('title')?.touched)
          "
          class="error"
        >
          El título es obligatorio
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="priority">Prioridad</label>
          <select id="priority" formControlName="priority">
            <option value="Low">Baja</option>
            <option value="Medium">Media</option>
            <option value="High">Alta</option>
          </select>
        </div>

        <div class="form-group checkbox-group">
          <label>
            <input type="checkbox" formControlName="completed" />
            Completada
          </label>
        </div>
      </div>

      <button type="submit" [disabled]="taskForm.invalid">Agregar Tarea</button>
    </form>
  `,
  styles: [
    `
      .task-form {
        display: flex;
        flex-direction: column;
        gap: 1.25rem;
        background: #f8f9fa;
        padding: 1.5rem;
        border-radius: 8px;
      }
      .form-group {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }
      .form-row {
        display: flex;
        gap: 1rem;
        align-items: flex-end;
      }
      .form-row .form-group {
        flex: 1;
      }
      label {
        font-weight: 500;
        color: #444;
        font-size: 0.9rem;
      }
      input[type='text'],
      select {
        padding: 0.75rem;
        border: 1px solid #ddd;
        border-radius: 6px;
        font-size: 1rem;
        transition: border-color 0.2s;
      }
      input[type='text']:focus,
      select:focus {
        border-color: #007bff;
        outline: none;
      }
      .checkbox-group {
        justify-content: center;
        height: 100%;
      }
      .checkbox-group label {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        cursor: pointer;
      }
      button {
        padding: 0.75rem;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 6px;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        transition: background-color 0.2s;
      }
      button:hover:not(:disabled) {
        background-color: #0056b3;
      }
      button:disabled {
        background-color: #ccc;
        cursor: not-allowed;
      }
      .error {
        color: #dc3545;
        font-size: 0.8rem;
      }
    `,
  ],
})
export class TaskFormComponent {
  @Output() taskAdded = new EventEmitter<Task>();
  taskForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      priority: ['Medium', Validators.required],
      completed: [false],
    });
  }

  onSubmit() {
    if (this.taskForm.valid) {
      this.taskAdded.emit(this.taskForm.value);
      this.taskForm.reset({ priority: 'Medium', completed: false });
    }
  }
}
