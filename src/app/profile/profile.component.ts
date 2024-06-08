import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ProfileService } from '../profile.service';
import { Router } from '@angular/router';
import { Profile, updateProfile } from './profile.model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EditProfileDialogComponent } from '../edit-profile-dialog/edit-profile-dialog.component';
import { UploadprofilepictureComponent } from '../uploadprofilepicture/uploadprofilepicture.component';
import { MatMenuTrigger } from '@angular/material/menu';
import Swal from 'sweetalert2';
import { ImgService } from '../img.service';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, AfterViewInit {
  data: Profile = {} as Profile;
  updateData: updateProfile = {} as updateProfile;
  error: string = '';
  loading: boolean = true;
  @ViewChild(MatMenuTrigger, { static: false })
  profileMenuTrigger?: MatMenuTrigger;
  showMenu: boolean = false;
  showDropdown: boolean = false;
  ngAfterViewInit(): void {
    if (this.profileMenuTrigger) {
      this.profileMenuTrigger.menuClosed.subscribe(() => {});
    }
  }
  toggleProfileMenu() {
    this.showDropdown = !this.showDropdown;
  }
  constructor(
    private router: Router,
    private profileService: ProfileService,
    public dialog: MatDialog,
    private imgservice: ImgService,
    private messageService: MessageService
  ) {}

  async loadData() {
    try {
      this.loading = true;
      this.data = (await this.profileService.getProfile()) as Profile;
      this.loading = false;
      console.log(this.data);
    } catch (error) {
      console.error('Error fetching data :(', error);
      this.error = 'Error fetching data. Please try again.';
      this.loading = false;
    }
  }
  async ngOnInit() {
    this.loadData();
  }

  profilePicture() {
    const dialogConfig: MatDialogConfig = {
      width: '800px',
      data: { imageUrl: this.data.profileImg },
    };

    const dialogRef = this.dialog.open(
      UploadprofilepictureComponent,
      dialogConfig
    );

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);

      if (result) {
        this.data.profileImg = result;
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Profile Uploaded successfully' });
      }
    });
  }
  EditProfile() {
    const dialogConfiguration = new MatDialogConfig();

    dialogConfiguration.width = '740px';
    dialogConfiguration.height = '500px';

    dialogConfiguration.position = {
      top: '115px',
      left: '550px',
    };
    const dialogRef = this.dialog.open(
      EditProfileDialogComponent,
      dialogConfiguration
    );

    dialogRef.afterClosed().subscribe((result) => {
      this.loading = true;
      this.loadData();
    });
  }
  async deleteProfile() {
    if (this.data.profileImg !== '') {
      this.updateData.updateKey = 'profileImg';
      this.updateData.updateValue = '';
      this.loading = true;
      await this.profileService.updateProfile(this.updateData);
      // Update profile succeeded, now delete the image
      this.imgservice.deleteImage(this.data.profileImg).subscribe(
        () => {
          // Image deletion succeeded
          this.data.profileImg = '';
          this.loading = false;
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Profile deleted successfully' });
        },
        (error) => {
          // Handle error during image deletion
          this.loading = false;
          console.error('Error deleting image:', error);
        }
      );
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'No Profile Image to Delete',
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }
}
