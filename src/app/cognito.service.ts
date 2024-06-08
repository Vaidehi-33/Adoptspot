import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Amplify } from 'aws-amplify';
import {
  signUp,
  confirmSignUp,
  signIn,
  signOut,
  fetchUserAttributes,
  fetchAuthSession,
} from 'aws-amplify/auth';
import { environment } from '../environments/environments';

export interface IUser {
  email: string;
  password: string;
  code: string;
  firstName: string;
  lastName: string;
  mobileNumber: string;
  city: string;
  state: string;
  country: string;
  address: string;
}

@Injectable({
  providedIn: 'root',
})
export class CognitoService {
  private authenticationSubject: BehaviorSubject<any>;
  constructor() {
    Amplify.configure({
      Auth: {
        Cognito: environment.cognito,
      },
    });
    this.authenticationSubject = new BehaviorSubject<boolean>(false);
  }
  public signUp(user: IUser): Promise<any> {
    return signUp({
      username: user.email,
      password: user.password,
      options: {
        userAttributes: {
          'custom:firstName': user.firstName,
          'custom:lastName': user.lastName,
          'custom:mobileNumber': user.mobileNumber,
          'custom:city': user.city,
          'custom:state': user.state,
          'custom:country': user.country,
          'custom:address': user.address,
        },
      },
    });
  }

  public confirmSignUp(user: IUser): Promise<any> {
    return confirmSignUp({ username: user.email, confirmationCode: user.code });
  }

  public signIn(user: IUser): Promise<any> {
    return signIn({ username: user.email, password: user.password }).then(
      () => {
        this.authenticationSubject.next(true);
      }
    );
  }
  public signOut(): Promise<any> {
    return signOut().then(() => {
      this.authenticationSubject.next(false);
    });
  }

  public getUser(): Promise<any> {
    return fetchUserAttributes();
  }

  public async getJwt() {
    const { idToken } =
      (await fetchAuthSession({ forceRefresh: true })).tokens ?? {};
    return idToken?.toString();
  }

  public isAuthenticated(): Promise<boolean> {
    if (this.authenticationSubject.value) {
      return Promise.resolve(true);
    } else {
      return this.getUser()
        .then((user: any) => {
          if (user) {
            return true;
          } else {
            return false;
          }
        })
        .catch(() => false);
    }
  }
}
