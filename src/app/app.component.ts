import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TaskControlsComponent } from './components/task-controls/task-controls.component';
import { TaskCardComponent } from './components/task-card/task-card.component';
import { TaskService } from './services/task.service';
import { Task } from './interfaces/task.interface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    TaskFormComponent,
    TaskControlsComponent,
    TaskCardComponent,
  ],
  template: `
    <div class="container">
      <h1>Gestor de Tareas</h1>

      <app-task-form (taskAdded)="addTask($event)"></app-task-form>

      <div class="divider"></div>

      <app-task-controls (filter)="setFilter($event)"></app-task-controls>

      <div class="task-list">
        @for (task of filteredTasks(); track task.title) {
          <app-task-card [task]="task" (toggleCompletion)="toggleTask($event)">
          </app-task-card>
        } @empty {
          <p class="empty-state">No hay tareas. ¡Agrega una arriba!</p>
        }
      </div>

      <footer>
        <p>
          Make with ❤️ by
          <a href="https://github.com/vanegasdiego">@vanegasdev</a>
        </p>
      </footer>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        background-color: #f5f7fa;
        min-height: 100vh;
        padding: 2rem;
        box-sizing: border-box;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        background: white;
        padding: 2rem;
        border-radius: 12px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      }
      h1 {
        text-align: center;
        color: #333;
        margin-bottom: 2rem;
      }
      .divider {
        height: 1px;
        background-color: #e1e4e8;
        margin: 2rem 0;
      }
      .task-list {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
      .empty-state {
        text-align: center;
        color: #666;
        font-style: italic;
      }
      footer {
        margin-top: 3rem;
        text-align: center;
        color: #888;
        font-size: 0.9rem;
        border-top: 1px solid #eee;
        padding-top: 1rem;
      }
    `,
  ],
})
export class AppComponent {
  private taskService = inject(TaskService);
  filterSignal = signal<'all' | 'completed' | 'pending'>('all');

  tasks = this.taskService.tasks;

  filteredTasks = computed(() => {
    const filter = this.filterSignal();
    const tasks = this.tasks();
    if (filter === 'completed') {
      return tasks.filter((t) => t.completed);
    } else if (filter === 'pending') {
      return tasks.filter((t) => !t.completed);
    }
    return tasks;
  });

  addTask(task: Task) {
    this.taskService.addTask(task);
  }

  toggleTask(task: Task) {
    this.taskService.toggleTaskCompletion(task);
  }

  setFilter(filter: 'all' | 'completed' | 'pending') {
    this.filterSignal.set(filter);
  }
}
