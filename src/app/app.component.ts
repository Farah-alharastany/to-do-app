import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  columns: Array<{ field: string; header: string }> = [];
  tasks: Array<{
    id: any;
    task_topic: string;
    status: string;
    priority: string;
    created: Date;
    end_date: Date;
  }> = [];
  selectedTasks: any;
  constructor() {
    this.columns = [
      { field: 'task_topic', header: 'Task Topic' },
      { field: 'status', header: 'Status' },
      { field: 'priority', header: 'Priority' },
      { field: 'created', header: 'Created' },
      { field: 'end_date', header: 'End Date' },
      { field: 'actions', header: 'Actions' },
    ];
    this.tasks = [
      {
        id:1,
        task_topic: 'hello',
        status: 'Completed',
        priority: 'High',
        created: new Date('05/14/2022'),
        end_date: new Date('05/14/2022'),
      },
      {
        id:2,
        task_topic: 'hello',
        status: 'Completed',
        priority: 'High',
        created: new Date('05/14/2022'),
        end_date: new Date('05/14/2022'),
      },
    ];
  }
  title = 'to-do-app';
}
