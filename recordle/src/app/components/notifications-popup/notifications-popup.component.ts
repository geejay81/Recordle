import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-notifications-popup',
  templateUrl: './notifications-popup.component.html',
  styleUrls: ['./notifications-popup.component.sass']
})
export class NotificationsPopupComponent implements OnInit {

  @Output() closeNotifications = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  closeClicked() {
    this.closeNotifications.emit();
  }

}
