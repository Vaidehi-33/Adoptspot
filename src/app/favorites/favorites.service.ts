import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CognitoService } from '../cognito.service';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  constructor(
    private http: HttpClient,
    private cognitoService: CognitoService
  ) {}

  async fetchFavoritesHandler() {
    const jwt = await this.cognitoService.getJwt();
    return this.http.get(
      'https://l9wzcaf3xc.execute-api.ca-central-1.amazonaws.com/dev/favorites',
      {
        headers: {
          Authorization: `${jwt}`,
        },
      }
    );
  }

  async deleteFromMyFavorites(id: string) {
    const jwt = await this.cognitoService.getJwt();
    return this.http.delete(
      'https://l9wzcaf3xc.execute-api.ca-central-1.amazonaws.com/dev/favorites/delete',
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
