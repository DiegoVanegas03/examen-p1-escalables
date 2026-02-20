# Task Manager

Este proyecto es una pequeña aplicación para gestionar tareas, construida con Angular.

## Objetivo

Construir una app para gestionar tareas demostrando el uso de Signals, Control Flow y comunicación entre componentes.

## Requerimientos

### 1️⃣ Mostrar tareas

- Usar `@for` y `track`.
- Las tareas deben venir de un `TaskService`.
- El estado debe estar manejado con **Signals**.

### 2️⃣ Agregar tarea

- Crear un `TaskFormComponent` con:
  - **Reactive Forms**.
  - Validación requerida para el título.
  - Select para prioridad (Alta, Media, Baja).
  - Checkbox para completado.
  - Mensaje de error si el título está vacío.
  - Emitir evento al padre (`Task` added).

### 3️⃣ Controles

- Crear `TaskControlsComponent` con botones:
  - "Show All" (Todas)
  - "Show Completed" (Completadas)
  - "Show Pending" (Pendientes)
- Debe comunicarse de hijo → padre para filtrar la lista.

### 4️⃣ CSS condicional obligatorio

- Tareas completadas se ven tachadas.
- Prioridad **High** (Alta) se ve en rojo.
- Prioridad **Medium** (Media) se ve en naranja.
- Prioridad **Low** (Baja) se ve en verde.

## Estructura

- `TaskService`
- `TaskFormComponent`
- `TaskControlsComponent`
- `TaskCardComponent`

## Interfaz

```typescript
export interface Task {
  title: string;
  priority: "Low" | "Medium" | "High";
  completed: Boolean;
}
```

## Desarrollado por

Hecho con ❤️ por [@vanegasdev](https://github.com/vanegasdiego)
