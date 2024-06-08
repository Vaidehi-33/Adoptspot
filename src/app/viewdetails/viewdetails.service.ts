import { CognitoService } from './../cognito.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ViewdetailsService {
  constructor(
    private http: HttpClient,
    private cognitoService: CognitoService
  ) {}

  async getDetails(postId: string) {
    const jwt = await this.cognitoService.getJwt();
    return this.http.get(
      `https://l9wzcaf3xc.execute-api.ca-central-1.amazonaws.com/dev/posts/${postId}`,
      {
        headers: {
          Authorization: `${jwt}`,
        },
      }
    );
  }

  async applyToPost(postId: string, message: string,petOwnerUserId:string,dogName:string) {
    const jwt = await this.cognitoService.getJwt();
    return this.http.post(
      `https://l9wzcaf3xc.execute-api.ca-central-1.amazonaws.com/dev/posts/apply`,
      {
          postId,
          message,
          petOwnerUserId,
          dogName
      },
      {
        headers: {
          Authorization: `${jwt}`,
        },
      }
    );
  }
  async addToFavorites(postId: string) {
    const jwt = await this.cognitoService.getJwt();
    return this.http.post(
      'https://l9wzcaf3xc.execute-api.ca-central-1.amazonaws.com/dev/posts/addtofavorites',
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
