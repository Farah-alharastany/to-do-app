import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
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
        id: 2,
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
}
