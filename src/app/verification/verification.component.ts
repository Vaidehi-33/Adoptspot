import { UserNameService } from './user-name.service';
import { Component } from '@angular/core';
import { CognitoService, IUser } from '../cognito.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrl: './verification.component.scss',
})
export class VerificationComponent {
  user: IUser;
  isSubmitClicked: boolean = false;

  constructor(
    private router: Router,
    private cognitoService: CognitoService,
    private userNameService: UserNameService
  ) {
    this.user = {} as IUser;
    this.user.email = this.userNameService.getName();
  }

  public confirmSignUp(event: any): void {
    event.preventDefault();
    this.isSubmitClicked = true;
    this.cognitoService
      .confirmSignUp(this.user)
      .then(() => {
        this.isSubmitClicked = false;
        this.router.navigate(['/login']);
        Swal.fire(
          'Success',
          'Registration successfully .Please Login with Credentials',
          'success'
        );
      })
      .catch((err) => {
        this.isSubmitClicked = false;
        Swal.fire('Error', 'Incorrect OTP', 'error');
      });
  }
}
