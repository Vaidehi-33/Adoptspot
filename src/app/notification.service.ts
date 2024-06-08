import { CognitoService } from './cognito.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { BehaviorSubject } from 'rxjs';

export interface Notification {
  post: {
    name: string;
  };
  user: {
    firstName: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(
    private http: HttpClient,
    private cognitoService: CognitoService
  ) {}
  notificationSubject = new BehaviorSubject<Notification[]>([]);
  notifications = this.notificationSubject.asObservable();
  isloadingSubject = new BehaviorSubject<boolean>(false);
  isLoading = this.isloadingSubject.asObservable();

  async fetchAndSetNotifications() {
    this.isloadingSubject.next(true);
    const jwt = await this.cognitoService.getJwt();
    await this.http
      .get(
        'https://l9wzcaf3xc.execute-api.ca-central-1.amazonaws.com/dev/notifications',
        {
          headers: {
            Authorization: `${jwt}`,
          },
        }
      )
      .subscribe(
        (response: any) => {
          this.notificationSubject.next(
            response.notifications as Notification[]
          );
          this.isloadingSubject.next(false);
        },
        (error) => {
          console.log(error);
          this.isloadingSubject.next(false);
        }
      );
  }

  getLoadingStatus() {
    return this.isLoading;
  }

  getNotifications() {
    return this.notifications;
  }

  setNotifications(notifications: Notification): void {
    const oldNotifications = this.notificationSubject.value;
    this.notificationSubject.next([notifications, ...oldNotifications]);
  }

  setNotificationsDirectly(notifications: Notification[]): void {
    this.notificationSubject.next(notifications);
  }
}
