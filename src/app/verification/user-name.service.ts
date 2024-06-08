import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserNameService {
  userName: string = '';
  constructor() {}
  setName(userName: string): void {
    this.userName = userName;
  }

  getName() {
    return this.userName;
  }
}
