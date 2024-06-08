import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { WebsocketService } from './websocket.service';
import { NotificationService } from './notification.service';
import { CognitoService } from './cognito.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  showNavbar: boolean = true;
  showFooter: boolean = true;
  isProfilePage: boolean = false;

  constructor(
    private router: Router,
    private webSocketService: WebsocketService,
    private notificationService: NotificationService,
    private cognitoService: CognitoService
  ) {}
  async ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showNavbar = ![
          '/home',
          '/landing',
          '/login',
          '/register',
          '/register/verification',
          '/',
        ].includes(event.url);
        this.showFooter = ![
          '/login',
          '/register',
          '/register/verification',
        ].includes(event.url);

        this.isProfilePage = event.url == '/profile';
      }
    });

    const isAuthenticated = await this.cognitoService.isAuthenticated();
    if (isAuthenticated) {
      this.webSocketService.connect();
      this.notificationService.fetchAndSetNotifications();
    }
    this.webSocketService.messageReceived.subscribe((data: any) => {
      data = JSON.parse(data);
      if (data.action === 'sendNotification') {
        this.notificationService.setNotifications({
          post: data.post,
          user: data.user,
        });
      }
    });
  }
  ngOnDestroy() {
    console.log('app component destroy');
  }
}
