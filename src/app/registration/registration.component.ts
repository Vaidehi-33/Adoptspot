import { UserNameService } from './../verification/user-name.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { signUp } from 'aws-amplify/auth';
import { CognitoService, IUser } from '../cognito.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent {
  isConfirm: boolean;
  user: IUser;
  isSubmitClicked: boolean = false;

  constructor(
    private router: Router,
    private cognitoService: CognitoService,
    private userNameService: UserNameService
  ) {
    this.isConfirm = false;
    this.user = {} as IUser;
  }

  public signUp(event: any): void {
    event.preventDefault();
    // console.log(this.user);
    this.isSubmitClicked = true;
    this.cognitoService
      .signUp(this.user)
      .then((data) => {
        console.log(data);
        this.isSubmitClicked = false;
        this.userNameService.setName(this.user.email);
        this.router.navigate(['/register/verification']);
        Swal.fire(
          'OTP Sent',
          'Check your inbox (including spam) for the OTP.',
          'success'
        );
      })
      .catch((err) => {
        console.log(err);
        this.isSubmitClicked = false;
        Swal.fire('Error', err.message, 'error');
      });
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }
}
