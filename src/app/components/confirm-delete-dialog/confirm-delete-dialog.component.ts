import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirm-delete-dialog',
  templateUrl: './confirm-delete-dialog.component.html',
  styleUrls: ['./confirm-delete-dialog.component.css'],
})
export class ConfirmDeleteDialogComponent implements OnInit {
  visible: boolean;
  constructor() {
    this.visible = false;
  }

  ngOnInit() {}
  show_dialog() {
    this.visible = true;
  }
}
