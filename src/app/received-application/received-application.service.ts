import { Injectable } from '@angular/core';
import { CognitoService } from './../cognito.service';
import { HttpClient } from '@angular/common/http';
import { ReceivedApplicationItem } from './received-application-datasource';

@Injectable({
  providedIn: 'root',
})
export class ReceivedApplicationService {
  constructor(
    private http: HttpClient,
    private cognitoService: CognitoService
  ) {}

  private receivedArray: ReceivedApplicationItem[] = [];

  get getRecievedArray(): ReceivedApplicationItem[] {
    return this.receivedArray;
  }

  set setRecievedArray(receivedArray: ReceivedApplicationItem[]) {
    this.receivedArray = receivedArray;
  }

  async getRecievdApplication(postId: string) {
    const jwt = await this.cognitoService.getJwt();
    return this.http.get<any>(
      `https://l9wzcaf3xc.execute-api.ca-central-1.amazonaws.com/dev/myposts/${postId}`,
      {
        headers: {
          Authorization: `${jwt}`,
        },
      }
    );
  }

  async updateMark(id: string) {
    const jwt = await this.cognitoService.getJwt();
    return this.http.put(
      'https://l9wzcaf3xc.execute-api.ca-central-1.amazonaws.com/dev/bookmarkReceived',
      {
        id,
      },
      {
        headers: {
          Authorization: `${jwt}`,
        },
      }
    );
  }

  async updateReadApplications(postId: string) {
    const jwt = await this.cognitoService.getJwt();
    return this.http.put(
      'https://l9wzcaf3xc.execute-api.ca-central-1.amazonaws.com/dev/notifications',
      {
        postId,
      },
      {
        headers: {
          Authorization: `${jwt}`,
        },
      }
    );
  }
}
