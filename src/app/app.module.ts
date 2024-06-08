import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MypostsComponent } from './myposts/myposts.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CreatepostComponent } from './createpost/createpost.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FooterComponent } from './footer/footer.component';
import { CarouselModule } from 'primeng/carousel';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FileUploadModule } from 'primeng/fileupload';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MatStepperModule } from '@angular/material/stepper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewdetailsComponent } from './viewdetails/viewdetails.component';
import { CarouselComponent } from './viewdetails/carousel/carousel.component';
import { AccordionModule } from 'primeng/accordion';
import { AccordiongroupComponent } from './viewdetails/accordiongroup/accordiongroup.component';
import { DescriptionComponent } from './viewdetails/description/description.component';
import { MatIconModule } from '@angular/material/icon';
import { ProfileComponent } from './profile/profile.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MyApplicationComponent } from './my-application/my-application.component';
import { MatSortModule } from '@angular/material/sort';
import { ReceivedApplicationComponent } from './received-application/received-application.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HttpClientModule } from '@angular/common/http';
import { VerificationComponent } from './verification/verification.component';
import { SkeletonModule } from 'primeng/skeleton';
import { ViewdetailsSkeletonComponent } from './viewdetails/viewdetails-skeleton/viewdetails-skeleton.component';
import { CardSkeletonComponent } from './card-skeleton/card-skeleton.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { ButtonModule } from 'primeng/button';
import { ViewDetailsWithoutLoginComponent } from './view-details-without-login/view-details-without-login.component';
import { MatDialogModule } from '@angular/material/dialog';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { EditProfileDialogComponent } from './edit-profile-dialog/edit-profile-dialog.component';
import { UploadprofilepictureComponent } from './uploadprofilepicture/uploadprofilepicture.component';
import { DialogModule } from 'primeng/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { NotificationsComponent } from './notifications/notifications.component';
import { MypostsDetailsComponent } from './myposts-details/myposts-details.component';

@NgModule({
  declarations: [
    AppComponent,
    MypostsComponent,
    CreatepostComponent,
    FooterComponent,
    ViewdetailsComponent,
    CarouselComponent,
    AccordiongroupComponent,
    DescriptionComponent,
    ProfileComponent,
    MyApplicationComponent,
    ReceivedApplicationComponent,
    LandingComponent,
    LoginComponent,
    RegistrationComponent,
    NavComponent,
    HomeComponent,
    FavoritesComponent,
    VerificationComponent,
    ViewdetailsSkeletonComponent,
    CardSkeletonComponent,
    PagenotfoundComponent,
    ViewDetailsWithoutLoginComponent,
    EditProfileComponent,
    EditProfileDialogComponent,
    UploadprofilepictureComponent,
    NotificationsComponent,
    MypostsDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    AccordionModule,
    CarouselModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    FileUploadModule,
    MatInputModule,
    MatFormFieldModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    ConfirmDialogModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatOptionModule,
    MatSelectModule,
    MatToolbarModule,
    HttpClientModule,
    SkeletonModule,
    ButtonModule,
    MatDialogModule,
    DialogModule,
    MatMenuModule,
  ],
  providers: [ConfirmationService, MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
