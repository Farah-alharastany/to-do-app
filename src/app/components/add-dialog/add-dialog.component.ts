import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.css'],
})
export class AddDialogComponent implements OnInit {
  visible: boolean;
  task_object: any;
  status_values: any;
  constructor() {
    this.visible = false;
    this.task_object = {
      task_topic: '',
      task_status: '',
      start_date: null,
      end_date: null,
    };
    this.status_values = [
      { name: 'Completed', code: 'Completed' },
      { name: 'Pending', code: 'Pending' },
    ];
  }

  ngOnInit() {}
  show_dialog() {
    this.visible = true;
  }
}
