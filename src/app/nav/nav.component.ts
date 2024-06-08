import { NotificationService } from './../notification.service';
import { CognitoService } from './../cognito.service';
import { Component, HostListener } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NotificationsComponent } from '../notifications/notifications.component';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
  isPageScroll: boolean = false;
  isAuthenticated: boolean = true;
  notificationsLength!: number;
  isMenuOpen: boolean = false;

  constructor(
    private router: Router,
    private cognitoService: CognitoService,
    public dialog: MatDialog,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.cognitoService.isAuthenticated().then((res) => {
      this.isAuthenticated = res;
      this.notificationService.getNotifications().subscribe((notifications) => {
        this.notificationsLength = notifications.length;
      });
    });
  }

  navigateToMyProfile() {
    this.router.navigateByUrl('/profile');
  }

  navigateToHome() {
    this.router.navigateByUrl('/home');
  }

  navigateToMyPosts() {
    this.router.navigateByUrl('/my-posts');
  }

  navigateToMyAppliedPosts() {
    this.router.navigateByUrl('/my-application');
  }

  navigateToMyFavorites() {
    this.router.navigateByUrl('/favorites');
  }
  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }

  logout() {
    this.cognitoService
      .signOut()
      .then(() => {
        this.router.navigateByUrl('/landing');
      })
      .catch(() => {
        console.log('Something went wrong with logout');
      });
  }

  @HostListener('document:scroll')
  onScrollHandler() {
    this.isPageScroll =
      document.body.scrollTop > 0 || document.documentElement.scrollTop > 0
        ? true
        : false;
  }
  notification() {
    const dialogConfig: MatDialogConfig = {
      width: '34.375rem',
      height: '19.75rem',
    };

    const dialogRef = this.dialog.open(NotificationsComponent, dialogConfig);
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
