import { Component, ViewChild, OnInit } from '@angular/core';
import { AddDialogComponent } from './components/add-dialog/add-dialog.component';
import { UpdateDialogComponent } from './components/update-dialog/update-dialog.component';
import { ConfirmDeleteDialogComponent } from './components/confirm-delete-dialog/confirm-delete-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
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
  selected_tasks: any;
  search_query: any;
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
  }
  ngOnInit(): void {
    this.fetch_tasks();
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
  on_search() {
    const lower_query = this.search_query.toLowerCase();
    this.filtered_tasks = this.tasks.filter((task) =>
      task.task_topic.toLowerCase().includes(lower_query)
    );
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
    console.log(this.tasks);
    this.tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    this.filtered_tasks = this.tasks;
    console.log(this.tasks);
    console.log(this.filtered_tasks);
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
  delete_task(deleted_task: any) {
    const task_id = deleted_task.id;
    let updated_tasks = this.tasks.filter((task) => task.id !== task_id);
    localStorage.setItem('tasks', JSON.stringify(updated_tasks));
    this.fetch_tasks();
  }
  mark_complete(task: any) {
    const task_id = task.id; // Get the ID of the task to be completed
    let task_to_be_completed = this.tasks.find((t) => t.id === task_id); // Find the task by ID

    if (task_to_be_completed) {
      task_to_be_completed.status = 'Completed'; // Update the task's status

      // Save the updated tasks to localStorage
      localStorage.setItem('tasks', JSON.stringify(this.tasks)); // Update localStorage with current tasks
      this.fetch_tasks();
    }
  }

  delete_all() {
    if (this.selected_tasks && this.selected_tasks.length > 0) {
      const selected_ids = new Set(
        this.selected_tasks.map((task: any) => task.id)
      );

      // Filter out tasks that are in the selected_ids set
      this.tasks = this.tasks.filter((task) => !selected_ids.has(task.id));

      localStorage.setItem('tasks', JSON.stringify(this.tasks));

      this.fetch_tasks();
    }
  }

  mark_all_done() {
    this.selected_tasks.forEach((task: any) => {
      // Directly iterate over selected_tasks
      task.status = 'Completed';
    });

    localStorage.setItem('tasks', JSON.stringify(this.tasks));
    this.fetch_tasks();
  }

  open_add_dilog() {
    this.addDialogComponent.show_dialog();
  }
  open_update_dilog(task: any) {
    // Pass a copy of the task to the dialog
    this.updateDialogComponent.task_object = { ...task };

    // Convert the date strings to Date objects
    if (this.updateDialogComponent.task_object.created) {
      this.updateDialogComponent.task_object.created = new Date(
        this.updateDialogComponent.task_object.created
      );
    }
    if (this.updateDialogComponent.task_object.end_date) {
      this.updateDialogComponent.task_object.end_date = new Date(
        this.updateDialogComponent.task_object.end_date
      );
    }

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

    console.log(this.updateDialogComponent.task_object);
    this.updateDialogComponent.show_dialog();
  }

  open_confirm_delete_dialog(task: any = null) {
    if (task) {
      this.confirmDeleteDialogComponent.task_to_be_deleted = task;
    } else {
      this.confirmDeleteDialogComponent.is_selection_deletion = true;
    }
    this.confirmDeleteDialogComponent.show_dialog();
  }
}
