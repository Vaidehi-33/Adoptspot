import { Injectable } from '@angular/core';
import { CognitoService } from './../cognito.service';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class MyApplicationService {

  constructor(
    private http: HttpClient,
    private cognitoService: CognitoService
  ) { }

  async getMyApplication() {
    const jwt = await this.cognitoService.getJwt();
    return this.http.get(
      `https://l9wzcaf3xc.execute-api.ca-central-1.amazonaws.com/dev/my-applications`,
      {
        headers: {
          Authorization: `${jwt}`,
        },
      }
    );
  }
  async deleteFromMyApplication(id: string) {
    const jwt = await this.cognitoService.getJwt();
    return this.http.delete(
      'https://l9wzcaf3xc.execute-api.ca-central-1.amazonaws.com/dev/my-applications',
      {
        headers: {
          Authorization: `${jwt}`,
        },
        body: {
          id,
        },
      }
    );
  }
}