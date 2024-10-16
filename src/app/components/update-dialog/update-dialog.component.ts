import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-dialog',
  templateUrl: './update-dialog.component.html',
  styleUrls: ['./update-dialog.component.css'],
})
export class UpdateDialogComponent implements OnInit {
  visible: boolean;
  update_form: FormGroup; // Use FormGroup for reactive forms
  status_values: any;
  priorities_values: any;

  @Output() task_updated = new EventEmitter<any>();

  constructor() {
    this.visible = false;

    // Initialize the form group
    this.update_form = new FormGroup({
      id: new FormControl(0),
      task_topic: new FormControl('', Validators.required),
      status: new FormControl('Pending'), // Default value for status
      priority: new FormControl('', Validators.required),
      created: new FormControl('', Validators.required),
      end_date: new FormControl('', Validators.required),
    });

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
    this.update_form.reset(); // Reset the form when closing
  }
  extract_priority_value() {
    // Get the selected priority's name and set it in the form control
    const selected_priority_name =
      this.update_form.get('priority')?.value?.name || null;
    this.update_form.get('priority')?.setValue(selected_priority_name);
  }

  extract_status_value() {
    // Get the selected status's name and set it in the form control
    const selected_status_name =
      this.update_form.get('status')?.value?.name || null;
    this.update_form.get('status')?.setValue(selected_status_name);
  }
  update_task() {
    if (this.update_form.invalid) {
      // Handle the case where the form is invalid
      return;
    }
    this.extract_status_value();
    this.extract_priority_value();
    
    const updated_task = {
      ...this.update_form.value, // Get the updated values
    };

    this.task_updated.emit(updated_task); // Emit the task object
    this.close_dialog(); // Close the dialog after emitting
  }
}
