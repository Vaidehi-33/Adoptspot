import { WebsocketService } from './../websocket.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CognitoService, IUser } from '../cognito.service';
import Swal from 'sweetalert2';
import { Profile } from '../profile/profile.model';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  user: IUser;
  data: Profile = {} as Profile;
  userName: string = '';
  isLoginClicked: boolean = false;
  constructor(
    private router: Router,
    private cognitoService: CognitoService,
    private profileService: ProfileService,
    private websocketService: WebsocketService
  ) {
    this.user = {} as IUser;
  }

  public signIn(event: any): void {
    event.preventDefault();
    this.isLoginClicked = true;
    this.cognitoService
      .signOut()
      .then(() => {
        this.cognitoService
          .signIn(this.user)
          .then(() => {
            // Assuming getUserInfo returns an observable or a promise
            this.cognitoService
              .getUser()
              .then(async (userInfo) => {
                try {
                  this.websocketService.connect();
                  this.data =
                    (await this.profileService.getProfile()) as Profile;
                  this.isLoginClicked = false;
                  this.userName = this.data.firstName;
                  console.log(this.data);
                } catch (error) {
                  console.error('Error fetching data :(', error);
                }
                this.router.navigate(['/home']);
                Swal.fire(
                  `Welcome to AdoptSpot, ${this.userName}.`,
                  ' We are here to help you find the perfect pet.',
                  'success'
                );
              })
              .catch((err) => {
                this.isLoginClicked = false;
                console.log(err);
                Swal.fire('Error', 'Incorrect Username or Password', 'error');
              });
          })
          .catch((err) => {
            this.isLoginClicked = false;
            console.log(err);
            Swal.fire('Error', 'Incorrect Username or Password', 'error');
          });
      })
      .catch((error) => {
        this.isLoginClicked = false;
        Swal.fire('Error', 'Incorrect Username or Password', 'error');
      });
  }

  navigateToRegistration() {
    this.router.navigate(['/register']);
  }
}
