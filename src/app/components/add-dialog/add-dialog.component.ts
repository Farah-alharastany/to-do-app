import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Task } from '../../models/task';
import { DropdownOptions } from '../../models/dropdown-options';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.css'],
  providers: [MessageService],
})
export class AddDialogComponent implements OnInit {
  visible: boolean;
  task_object: Task[] = [];
  status_values: DropdownOptions[] = [];
  priorities_values: DropdownOptions[] = [];
  task_form: FormGroup;

  @Output() task_added = new EventEmitter<any>();

  constructor(private messageService: MessageService) {
    // Initialize form controls directly
    this.task_form = new FormGroup({
      id: new FormControl(0),
      task_topic: new FormControl('', Validators.required),
      status: new FormControl({ name: 'Pending', code: 'Pending' }), // Default value set to 'Pending'
      priority: new FormControl('', Validators.required),
      created: new FormControl('', Validators.required),
      end_date: new FormControl('', Validators.required),
    });

    this.visible = false;
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

  extract_priority_value() {
    // Get the selected priority's name and set it in the form control
    const selected_priority_name =
      this.task_form.get('priority')?.value?.name || null;
    this.task_form.get('priority')?.setValue(selected_priority_name);
  }

  extract_status_value() {
    // Get the selected status's name and set it in the form control
    const selected_status_name =
      this.task_form.get('status')?.value?.name || null;
    this.task_form.get('status')?.setValue(selected_status_name);
  }
  add_task() {
    this.extract_priority_value();
    this.extract_status_value();

    // Create the task object from the form values
    const new_task = {
      task_topic: this.task_form.get('task_topic')?.value,
      status: this.task_form.get('status')?.value,
      priority: this.task_form.get('priority')?.value,
      created: this.task_form.get('created')?.value,
      end_date: this.task_form.get('end_date')?.value,
    };

    // Check for missing fields and create an error message
    const missing_fields = [];
    if (!new_task.task_topic) missing_fields.push('Task Topic');
    if (!new_task.priority) missing_fields.push('Priority');
    if (!new_task.created) missing_fields.push('Created Date');
    if (!new_task.end_date) missing_fields.push('End Date');

    // If there are missing fields, display an error message
    if (missing_fields.length > 0) {
      console.error('Form is invalid:', new_task);
      this.messageService.add({
        severity: 'error',
        summary: 'Task Incompletion',
        detail: `Please fill out the following required fields: ${missing_fields.join(
          ', '
        )}.`,
      });
      return;
    }

    // Emit the task object
    this.task_added.emit(new_task);
    this.close_dialog(); // Close the dialog after emitting
  }
}
