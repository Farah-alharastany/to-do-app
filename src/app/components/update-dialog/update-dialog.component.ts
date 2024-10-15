import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-update-dialog',
  templateUrl: './update-dialog.component.html',
  styleUrls: ['./update-dialog.component.css'],
})
export class UpdateDialogComponent implements OnInit {
  visible: boolean;
  task_object: any;
  status_values: any;
  priorities_values: any;
  // Create an output event emitter to send task_object to the parent component
  @Output() task_updated = new EventEmitter<any>();

  constructor() {
    this.visible = false;
    this.task_object = {
      task_topic: null,
      status: null,
      priority: null,
      created: null,
      end_date: null,
    };
    this.status_values = [
      { name: 'Completed', code: 'Completed' },
      { name: 'Pending', code: 'Pending' },
    ];
    this.priorities_values = [
      { name: 'High', code: 'High' },
      { name: 'Medium', code: 'Medium' },
      { name: 'Low', code: 'Low' },
    ];
  }

  ngOnInit() {}

  show_dialog() {
    this.visible = true;
  }

  close_dialog() {
    this.visible = false;
  }
  // Extract the name of the priority
  extract_priority_value() {
    this.task_object.priority = this.task_object.priority?.name;
  }

  // Extract the name of the status
  extract_status_value() {
    this.task_object.status = this.task_object.status?.name;
  }

  // Emit the task_object when "Save" button is clicked
  update_task() {
    this.extract_priority_value();
    this.extract_status_value();
    this.task_updated.emit(this.task_object); // Emit the task object
    this.close_dialog(); // Close the dialog after emitting
  }
}
