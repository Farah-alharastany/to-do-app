import { Component, ViewChild, OnInit, Renderer2 } from '@angular/core';
import { AddDialogComponent } from './components/add-dialog/add-dialog.component';
import { UpdateDialogComponent } from './components/update-dialog/update-dialog.component';
import { ConfirmDeleteDialogComponent } from './components/confirm-delete-dialog/confirm-delete-dialog.component';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [MessageService],
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
  is_dark_mode: boolean;
  constructor(
    private renderer: Renderer2,
    private messageService: MessageService
  ) {
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
    this.is_dark_mode = false;
  }
  ngOnInit(): void {
    this.fetch_tasks();
    // Check the current mode dark/light
    const dark_mode = localStorage.getItem('dark_mode');

    if (dark_mode === 'true') {
      this.is_dark_mode = true;
      this.renderer.addClass(document.body, 'dark-mode');
    } else {
      this.is_dark_mode = false;
      this.renderer.removeClass(document.body, 'dark-mode');
    }
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
    if (!new_task) {
      this.messageService.add({
        severity: 'error',
        summary: 'Task Incompletion',
        detail:
          'Please ensure that all required task details are filled out before proceeding.',
      });
      // Early exit if new_task is undefined
      return;
    }

    // Generate a new id for the task if it's not provided
    if (!new_task.id) {
      const last_task =
        this.tasks.length > 0 ? this.tasks[this.tasks.length - 1] : null;
      new_task.id = last_task ? last_task.id + 1 : 1; // Generate new id
    }

    this.tasks.push(new_task);
    localStorage.setItem('tasks', JSON.stringify(this.tasks));

    this.fetch_tasks();
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Task successfully added',
    });
  }

  update_task(updated_task: any) {
    if (!updated_task) {
      this.messageService.add({
        severity: 'error',
        summary: 'Task Incompletion',
        detail:
          'Please ensure that all required task details are filled out before proceeding.',
      });
    }
    console.log('Task updated');
    const task_id = updated_task.id;
    console.log(task_id);

    const task_index = this.tasks.findIndex((task) => task.id === task_id);
    if (task_index !== -1) {
      this.tasks[task_index] = { ...updated_task };
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Task successfully updated',
      });
    }
  }
  delete_task(deleted_task: any) {
    const task_id = deleted_task.id;
    let updated_tasks = this.tasks.filter((task) => task.id !== task_id);
    localStorage.setItem('tasks', JSON.stringify(updated_tasks));
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Task successfully deleted',
    });
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
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Selected tasks successfully deleted',
      });
      this.fetch_tasks();
      // Clear the selected tasks array
      this.selected_tasks = [];
    }
  }

  mark_all_done() {
    if (this.selected_tasks && this.selected_tasks.length > 0) {
      this.selected_tasks.forEach((task: any) => {
        // Directly iterate over selected_tasks
        task.status = 'Completed';
      });

      localStorage.setItem('tasks', JSON.stringify(this.tasks));

      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Selected tasks have been marked as completed.',
      });
      this.fetch_tasks();

      // Clear the selected tasks array
      this.selected_tasks = [];
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'No Tasks Selected',
        detail: 'Please select at least one task before proceeding.',
      });
    }
  }

  open_add_dilog() {
    this.addDialogComponent.show_dialog();
  }
  open_update_dialog(task: any) {
    // Update the form controls with the task data
    this.updateDialogComponent.update_form.patchValue({
      id: task.id,
      task_topic: task.task_topic,
      status:
        this.updateDialogComponent.status_values.find(
          (s: any) => s.name === task.status
        ) || null,
      priority:
        this.updateDialogComponent.priorities_values.find(
          (p: any) => p.name === task.priority
        ) || null,
      created: task.created ? new Date(task.created) : null,
      end_date: task.end_date ? new Date(task.end_date) : null,
    });

    // Show the dialog
    this.updateDialogComponent.show_dialog();
  }

  open_confirm_delete_dialog(task: any = null) {
    if (task) {
      this.confirmDeleteDialogComponent.task_to_be_deleted = task;
      this.confirmDeleteDialogComponent.show_dialog();
    } else {
      if (this.selected_tasks && this.selected_tasks.length > 0) {
        this.confirmDeleteDialogComponent.is_selection_deletion = true;
        this.confirmDeleteDialogComponent.show_dialog();
      } else {
        this.messageService.add({
          severity: 'warn',
          summary: 'No Tasks Selected',
          detail: 'Please select at least one task before proceeding.',
        });
      }
    }
  }
  toggle_dark_mode() {
    this.is_dark_mode = !this.is_dark_mode;

    if (this.is_dark_mode) {
      this.renderer.addClass(document.body, 'dark-mode');
      localStorage.setItem('dark_mode', 'true'); // Store dark mode state
    } else {
      this.renderer.removeClass(document.body, 'dark-mode');
      localStorage.setItem('dark_mode', 'false'); // Store light mode state
    }
  }
}
