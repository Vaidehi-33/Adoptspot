import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes,
  provideRouter,
  withComponentInputBinding,
} from '@angular/router';
import { MypostsComponent } from './myposts/myposts.component';
import { CreatepostComponent } from './createpost/createpost.component';
import { ViewdetailsComponent } from './viewdetails/viewdetails.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { LandingComponent } from './landing/landing.component';
import { ProfileComponent } from './profile/profile.component';
import { MyApplicationComponent } from './my-application/my-application.component';
import { ReceivedApplicationComponent } from './received-application/received-application.component';
import { HomeComponent } from './home/home.component';
import { VerificationComponent } from './verification/verification.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { AuthGuard } from './auth.guard';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { EditProfileComponent} from './edit-profile/edit-profile.component';
import { MypostsDetailsComponent } from './myposts-details/myposts-details.component';

const routes: Routes = [
  { path: '', redirectTo: '/landing', pathMatch: 'full' },
  { path: 'landing', component: LandingComponent },
  { path: 'profile', component: ProfileComponent,canActivate: [AuthGuard] },
  { path: 'edit-profile', component: EditProfileComponent,canActivate: [AuthGuard] },
  { path: 'new', component: CreatepostComponent ,canActivate: [AuthGuard] },
  { path: 'view-details/:id', component: ViewdetailsComponent ,canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent },
  { path: 'favorites', component: FavoritesComponent ,canActivate: [AuthGuard]},
  { path: 'my-application', component: MyApplicationComponent ,canActivate: [AuthGuard] },
  { path: 'received-application/:postId', component: ReceivedApplicationComponent ,canActivate: [AuthGuard] },
  { path: 'register/verification', component: VerificationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'my-posts', component: MypostsComponent,canActivate: [AuthGuard] },
  { path: 'mypost-details/:id',component:MypostsDetailsComponent,canActivate: [AuthGuard]},
   {path: '**' , component:PagenotfoundComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [provideRouter(routes, withComponentInputBinding())],
})
export class AppRoutingModule {}
