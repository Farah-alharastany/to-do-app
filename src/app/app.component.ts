import { Component, ViewChild } from '@angular/core';
import { AddDialogComponent } from './components/add-dialog/add-dialog.component';
import { UpdateDialogComponent } from './components/update-dialog/update-dialog.component';
import { ConfirmDeleteDialogComponent } from './components/confirm-delete-dialog/confirm-delete-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  @ViewChild(AddDialogComponent) addDialogComponent!: AddDialogComponent;
  @ViewChild(UpdateDialogComponent)
  updateDialogComponent!: UpdateDialogComponent;
  @ViewChild(ConfirmDeleteDialogComponent)
  confirmDeleteDialogComponent!: ConfirmDeleteDialogComponent;

  selected_status: String = '';
  task_status_filter: Array<string> = [];
  columns: Array<{ field: string; header: string }> = [];
  tasks: Array<{
    id: any;
    task_topic: string;
    status: string;
    priority: string;
    created: Date;
    end_date: Date;
  }> = [];
  filtered_tasks: Array<{
    id: any;
    task_topic: string;
    status: string;
    priority: string;
    created: Date;
    end_date: Date;
  }> = [];
  selectedTasks: any;
  constructor() {
    // To store user selected status for filteration
    this.selected_status = 'All Task';
    // All tasks' status
    this.task_status_filter = ['All Task', 'Pending', 'Completed'];
    // Table columns
    this.columns = [
      { field: 'task_topic', header: 'Task Topic' },
      { field: 'status', header: 'Status' },
      { field: 'priority', header: 'Priority' },
      { field: 'created', header: 'Created' },
      { field: 'end_date', header: 'End Date' },
      { field: 'actions', header: 'Actions' },
    ];
    // Initlaize tasks array
    this.tasks = [
      {
        id: 1,
        task_topic: 'hello',
        status: 'Completed',
        priority: 'High',
        created: new Date('05/14/2022'),
        end_date: new Date('05/14/2022'),
      },
      {
        id: 2,
        task_topic: 'hello',
        status: 'Pending',
        priority: 'Medium',
        created: new Date('05/14/2022'),
        end_date: new Date('05/14/2022'),
      },
      {
        id: 3,
        task_topic: 'hello',
        status: 'Pending',
        priority: 'Low',
        created: new Date('05/14/2022'),
        end_date: new Date('05/14/2022'),
      },
    ];
    // Initialize the filtered tasks array with the same data in the tasks array
    this.filtered_tasks = this.tasks;
  }
  title = 'To Do App';

  // To handle user click on the status in the filter part
  handle_status_selection(status: String) {
    this.selected_status = status;
    this.filter_tasks();
  }
  // To update filtered tasks array
  filter_tasks() {
    if (this.selected_status === 'All Task') {
      this.filtered_tasks = this.tasks;
    } else {
      this.filtered_tasks = this.tasks.filter(
        (task) => task.status === this.selected_status
      );
    }
  }
  // To get the background color of the priorty value
  get_priorty_class(priority: String) {
    if (priority === 'High') {
      return 'high-priority';
    } else if (priority === 'Medium') {
      return 'medium-priority';
    } else if (priority === 'Low') {
      return 'low-priority';
    } else {
      return '';
    }
  }
  fetch_tasks() {
    this.tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    this.filtered_tasks = this.tasks;
  }
  add_task(new_task: any) {
    // Get the last task id, to generate a new id for the new task before addition
    const last_task =
      this.tasks.length > 0 ? this.tasks[this.tasks.length - 1] : null;
    const new_id = last_task ? last_task.id + 1 : 1;
    new_task.id = new_id;

    this.tasks.push(new_task);
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
    this.fetch_tasks();
  }
  update_task(updated_task: any) {
    const task_id = updated_task.id;
    const task_index = this.tasks.findIndex((task) => task.id === task_id);
    if (task_index !== -1) {
      this.tasks[task_index] = { ...updated_task };
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
  }
  delete_task(task_id: number) {
    this.fetch_tasks();
    let updated_tasks = this.tasks.filter((task) => task.id !== task_id);
    localStorage.setItem('tasks', JSON.stringify(updated_tasks));
    this.fetch_tasks();
  }
  open_add_dilog() {
    this.addDialogComponent.show_dialog();
  }
  open_apdate_dilog(task: any) {
    // Pass a copy of the task to the dialog
    this.updateDialogComponent.task_object = { ...task };
    // Find the corresponding priority object from the list
    const priority = this.updateDialogComponent.priorities_values.find(
      (p: any) => p.name === task.priority
    );
    this.updateDialogComponent.task_object.priority = priority || null;

    // Find the corresponding status object from the list
    const status = this.updateDialogComponent.status_values.find(
      (s: any) => s.name === task.status
    );
    this.updateDialogComponent.task_object.status = status || null;

    this.updateDialogComponent.show_dialog();
  }

  open_confirm_delete_dialog() {
    this.confirmDeleteDialogComponent.show_dialog();
  }
}
