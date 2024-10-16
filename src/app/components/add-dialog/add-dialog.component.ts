import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.css'],
})
export class AddDialogComponent implements OnInit {
  visible: boolean;
  task_object: any;
  status_values: any;
  priorities_values: any;
  // Create an output event emitter to send task_object to the parent component
  @Output() task_added = new EventEmitter<any>();

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
  add_task() {
    this.extract_priority_value();
    this.extract_status_value();
    this.task_added.emit(this.task_object); // Emit the task object
    this.close_dialog(); // Close the dialog after emitting
  }
}