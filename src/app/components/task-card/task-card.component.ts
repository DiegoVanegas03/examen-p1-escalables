import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../interfaces/task.interface';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="task-card" [ngClass]="getPriorityClass(task.priority)">
      <div class="content" [class.completada]="task.completed">
        <h3>{{ task.title }}</h3>
        <span class="badge"
          >Prioridad {{ getPriorityLabel(task.priority) }}</span
        >
      </div>
      <button
        class="action-btn"
        (click)="toggleCompletion.emit(task)"
        [attr.aria-label]="
          task.completed ? 'Marcar como pendiente' : 'Marcar como completada'
        "
      >
        <span *ngIf="task.completed">↩</span>
        <span *ngIf="!task.completed">✓</span>
      </button>
    </div>
  `,
  styles: [
    `
      .task-card {
        padding: 1.25rem;
        border-radius: 10px;
        margin-bottom: 0.75rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        transition:
          transform 0.2s,
          box-shadow 0.2s;
        background: white;
        border: 1px solid transparent;
      }
      .task-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
      }
      .content h3 {
        margin: 0 0 0.25rem 0;
        font-size: 1.1rem;
        color: #333;
      }
      .badge {
        font-size: 0.75rem;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        color: #666;
      }
      .completada .content h3 {
        text-decoration: line-through;
        color: #aaa;
      }
      .completada .badge {
        color: #bbb;
      }
      .action-btn {
        background: rgba(0, 0, 0, 0.05);
        border: none;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        color: #555;
        transition: all 0.2s;
      }
      .action-btn:hover {
        background: rgba(0, 0, 0, 0.1);
        transform: scale(1.1);
      }

      /* Priority Styles in Spanish as requested */
      .prioridad-alta {
        border-left: 5px solid #dc3545;
        background-color: #fff5f5;
      }
      .prioridad-alta .badge {
        color: #dc3545;
        font-weight: bold;
      }

      .prioridad-media {
        border-left: 5px solid #fd7e14;
        background-color: #fff9f2;
      }
      .prioridad-media .badge {
        color: #fd7e14;
        font-weight: bold;
      }

      .prioridad-baja {
        border-left: 5px solid #28a745;
        background-color: #f0fff4;
      }
      .prioridad-baja .badge {
        color: #28a745;
        font-weight: bold;
      }
    `,
  ],
})
export class TaskCardComponent {
  @Input({ required: true }) task!: Task;
  @Output() toggleCompletion = new EventEmitter<Task>();

  getPriorityClass(priority: string): string {
    switch (priority) {
      case 'High':
        return 'prioridad-alta';
      case 'Medium':
        return 'prioridad-media';
      case 'Low':
        return 'prioridad-baja';
      default:
        return '';
    }
  }

  getPriorityLabel(priority: string): string {
    switch (priority) {
      case 'High':
        return 'Alta';
      case 'Medium':
        return 'Media';
      case 'Low':
        return 'Baja';
      default:
        return priority;
    }
  }
}
