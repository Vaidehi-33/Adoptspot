import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CognitoService } from './cognito.service';
import { Profile, updateProfile } from './profile/profile.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private getProfileUrl = 'https://l9wzcaf3xc.execute-api.ca-central-1.amazonaws.com/dev/profile';
  private updateProfileUrl = 'https://l9wzcaf3xc.execute-api.ca-central-1.amazonaws.com/dev/putprofile';

  constructor(
    private httpClient: HttpClient,
    private cognitoService: CognitoService
  ) {}

  async getProfile() {
    try {
      const jwt = await this.cognitoService.getJwt();
      return this.httpClient.get(this.getProfileUrl, {
        headers: {
          Authorization: `${jwt}`,
        },
      }).toPromise();
    } catch (error: any) {
      throw new Error('Error fetching profile: ' + error.message);
    }
  }

  async updateProfile(profileData: updateProfile) {
    try {
      const jwt = await this.cognitoService.getJwt();
      return this.httpClient.put(this.updateProfileUrl, profileData, {
        headers: {
          Authorization: `${jwt}`,
        },
      }).toPromise();
    } catch (error: any) {
      throw new Error('Error updating profile: ' + error.message);
    }
  }
}
