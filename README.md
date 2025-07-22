# 📝 CoreTasks

A modern to-do list application developed in Angular 20, demonstrating the framework's fundamental concepts through an elegant interface with Material Design and full CRUD functionalities.

## 🚀 Features

### Core Features

  - ✅ **Add Tasks**: Input field with validation to create new tasks.
  - 👀 **View Tasks**: Dynamic list with detailed information for each task.
  - ✏️ **Mark as Completed**: Toggle to switch completion status.
  - 🗑️ **Remove Tasks**: Individual deletion of tasks.
  - 📊 **Dynamic Counters**: Real-time statistics (total/completed).

### Extra Features

  - 🌙 **Dark/Light Mode**: Toggle to switch between themes with persistence.
  - 💾 **Data Persistence**: Integration with CrudCrud API for storage.
  - 🎨 **Material Design**: Modern and responsive interface.
  - ⚡ **Reactivity**: Real-time updates without a page reload.
  - 🔄 **Animations**: Smooth transitions between states.

## 🛠️ Technologies Used

### Core

  - **Angular 20**: Main framework.
  - **TypeScript**: Development language.
  - **Angular Material**: UI component library.
  - **RxJS**: Reactive programming.
  - **SCSS**: CSS pre-processor.

### APIs and Tools

  - **CrudCrud API**: Backend-as-a-Service for persistence.
  - **Angular Reactive Forms**: Reactive forms with validation.
  - **Angular Router**: Routing system (prepared for expansion).
  - **Angular CLI**: Development tool.

## 🏗️ Architecture and Concepts Demonstrated

### Fundamental Angular Concepts

| Concept | Implementation | Description |
|---|---|---|
| **@Input** | `TaskList`, `TaskItem` | Passing data from parent to child component. |
| **@Output** | All child components | Emitting events from child to parent. |
| **Interpolation** | `{{ task.title }}`, `{{ totalTasks }}` | Dynamic display of data in the template. |
| **Property Binding** | `[checked]="task.completed"` | Binding of HTML/Angular properties. |
| **Event Binding** | `(click)="onDelete()"` | Capturing user events. |

## 🚦 How to Run

### Prerequisites

  - Node.js (v18+)
  - npm or yarn
  - Angular CLI (`npm install -g @angular/cli`)

### Installation and Configuration

1.  **Clone the repository**

<!-- end list -->

```bash
git clone <repository-url>
cd todo-app
```

2.  **Install dependencies**

<!-- end list -->

```bash
npm install
```

3.  **Configure the API**

<!-- end list -->

  - Go to [CrudCrud.com](https://crudcrud.com)
  - Copy your unique API key.
  - Replace `your-api-key` in `src/app/services/task.service.ts`:

<!-- end list -->

```typescript
private apiUrl = 'https://crudcrud.com/api/YOUR_API_KEY_HERE/tasks';
```

4.  **Run the application**

<!-- end list -->

```bash
ng serve
```

5.  **Access in the browser**

<!-- end list -->

```
http://localhost:4200
```

## 🎯 Use Cases

### User Adds a Task

1.  The user types in the "Task Title" field.
2.  Form validation occurs in real-time.
3.  The user clicks "Add Task".
4.  `AddTask` emits an event via @Output.
5.  `App` receives it and calls `TaskService.addTask()`.
6.  The API persists the data and returns a response.
7.  The list updates automatically via an Observable.

## 🧪 Testing Concepts (Preparation)

The structure is ready for testing:

  - **@Input/@Output Communication**: Verify that data flows correctly.
  - **Reactive Forms**: Validate form behavior.
  - **Services**: Test HTTP calls and business logic.
  - **Theme Service**: Check persistence and theme application.

## 🎓 Educational Objectives

This project was developed to demonstrate:

1.  **Component Communication**: How data flows in an Angular application.
2.  **Reactive Programming**: Use of Observables and BehaviorSubject.
3.  **Material Design**: Implementation of modern UI/UX.
4.  **Form Handling**: Reactive forms with validation.
5.  **State Management**: Managing state without external libraries.
6.  **HTTP Client**: Integration with REST APIs.
7.  **Theming**: A dynamic theme system.

## 📚 Resources Used

  - [Angular Documentation](https://angular.io/docs)
  - [Angular Material](https://material.angular.io/)
  - [CrudCrud API](https://crudcrud.com/)
  - [RxJS Documentation](https://rxjs.dev/)
  - [Material Design Guidelines](https://material.io/design)

## 📄 License

This project is under the MIT license. Feel free to use it as a study base or expand it with new functionalities.

-----

**Developed by Matheus Vilela Diniz Maia to demonstrate the fundamental concepts of Angular**
