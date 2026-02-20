import { Injectable, signal, computed } from '@angular/core';
import { Task } from '../interfaces/task.interface';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasksSignal = signal<Task[]>([]);

  readonly tasks = this.tasksSignal.asReadonly();

  addTask(task: Task) {
    this.tasksSignal.update((tasks) => [...tasks, task]);
  }

  toggleTaskCompletion(task: Task) {
    this.tasksSignal.update((tasks) =>
      tasks.map((t) => (t === task ? { ...t, completed: !t.completed } : t)),
    );
  }
}
