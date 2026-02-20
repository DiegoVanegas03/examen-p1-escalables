import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-task-controls',
  standalone: true,
  template: `
    <div class="controls">
      <button class="btn btn-secondary" (click)="filter.emit('all')">
        Todas
      </button>
      <button class="btn btn-success" (click)="filter.emit('completed')">
        Completadas
      </button>
      <button class="btn btn-warning" (click)="filter.emit('pending')">
        Pendientes
      </button>
    </div>
  `,
  styles: [
    `
      .controls {
        display: flex;
        justify-content: center;
        gap: 0.75rem;
        margin-bottom: 1rem;
      }
      .btn {
        padding: 0.5rem 1.25rem;
        border: none;
        border-radius: 20px;
        font-size: 0.9rem;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s;
      }
      .btn:hover {
        transform: translateY(-1px);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }
      .btn-secondary {
        background-color: #e2e6ea;
        color: #495057;
      }
      .btn-secondary:hover {
        background-color: #dbe0e5;
      }
      .btn-success {
        background-color: #d4edda;
        color: #155724;
      }
      .btn-success:hover {
        background-color: #c3e6cb;
      }
      .btn-warning {
        background-color: #fff3cd;
        color: #856404;
      }
      .btn-warning:hover {
        background-color: #ffeeba;
      }
    `,
  ],
})
export class TaskControlsComponent {
  @Output() filter = new EventEmitter<'all' | 'completed' | 'pending'>();
}
