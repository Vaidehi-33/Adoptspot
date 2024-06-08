import { CognitoService } from './../cognito.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
})
export class LandingComponent {
  isAuthenticated: boolean = true;

  constructor(private router: Router, private cognitoService: CognitoService) {}

  async ngOnInit() {
    this.isAuthenticated = await this.cognitoService.isAuthenticated();
  }

  onExplore() {
    this.router.navigateByUrl('/home');
  }
}
