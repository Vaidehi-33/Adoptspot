import { CognitoService } from './../cognito.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(
    private http: HttpClient,
    private cognitoService: CognitoService
  ) {}

  async fetchPostsHandler() {
    const url =
      'https://l9wzcaf3xc.execute-api.ca-central-1.amazonaws.com/dev/posts';
    const jwt = await this.cognitoService.getJwt();
    return this.http.get(url, {
      headers: {
        Authorization: `${jwt}`,
      },
    });
  }
  async getSearchData(searchTerm: string): Promise<Observable<any>> {
    const jwt = await this.cognitoService.getJwt();
    return this.http.get(
      `https://l9wzcaf3xc.execute-api.ca-central-1.amazonaws.com/dev/search/${searchTerm}`,
      {
        headers: {
          Authorization: `${jwt}`,
        },
      }
    );
  }

  getSearchSuggestions(text: string) {
    const suggestions = ['Cat', 'Dog'];
    if (text.trim() === '') {
      return suggestions;
    }
    return suggestions.filter((suggestion) =>
      suggestion.toLowerCase().includes(text.toLowerCase())
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
