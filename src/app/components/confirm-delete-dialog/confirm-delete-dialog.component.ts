import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-delete-dialog',
  templateUrl: './confirm-delete-dialog.component.html',
  styleUrls: ['./confirm-delete-dialog.component.css'],
})
export class ConfirmDeleteDialogComponent implements OnInit {
  visible: boolean;
  is_selection_deletion: boolean;
  task_to_be_deleted: Object;
  @Output() task_deleted = new EventEmitter<any>();
  @Output() selected_task_deleted = new EventEmitter<any>();
  constructor() {
    this.visible = false;
    this.is_selection_deletion = false;
    this.task_to_be_deleted = {};
  }

  ngOnInit() {}
  show_dialog() {
    this.visible = true;
  }
  close_dialog() {
    this.visible = false;
  }
  delete_task() {
    if (this.is_selection_deletion) {
      this.selected_task_deleted.emit();
    } else {
      this.task_deleted.emit(this.task_to_be_deleted); // Emit the task object
    }
    this.close_dialog(); // Close the dialog after emitting
  }
}
