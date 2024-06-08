import { WebsocketService } from './../websocket.service';
import { NotificationService, Notification } from './../notification.service';
import { Component } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss',
})
export class NotificationsComponent {
  isLoading: boolean = false;
  constructor(
    public dialog: MatDialog,
    private notificationService: NotificationService,
    private WebsocketService: WebsocketService,
    private router: Router
  ) {}
  notifications: Notification[] = [];

  async ngOnInit() {
    this.notificationService.getLoadingStatus().subscribe((status) => {
      this.isLoading = status;
    });
    this.notificationService.fetchAndSetNotifications();
    this.notificationService.getNotifications().subscribe((notifications) => {
      console.log(notifications);
      this.notifications = notifications;
    });
  }

  navigateToReceivedApplication(notification: any) {
    this.router.navigate([`received-application/${notification.post.id}`]);
    this.dialog.closeAll();
  }
}
