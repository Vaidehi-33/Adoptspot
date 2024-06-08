import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile.service';
import { Profile, updateProfile } from '../profile/profile.model';
import { MatDialogRef } from '@angular/material/dialog';
//import {MatSnackBar} from '@angular/material/snack-bar';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-edit-profile-dialog',
  templateUrl: './edit-profile-dialog.component.html',
  styleUrls: ['./edit-profile-dialog.component.scss']
})
export class EditProfileDialogComponent implements OnInit {
  data: Profile = {} as Profile;
  updateData: updateProfile = {} as updateProfile;
  error: string = '';
  loading: boolean = true;
  editMode: boolean = false;
  editingField: string = '';
  updateValue: string = '';

  fields: { label: string; key: string }[] = [
    { label: 'Full Name', key: 'fullName' },
    { label: 'Contact No.', key: 'mobileNumber' },
    { label: 'City', key: 'city' },
    { label: 'State', key: 'state' },
    { label: 'Country', key: 'country' }
  ];

  constructor(
    private profileService: ProfileService,
    private dialogRef: MatDialogRef<EditProfileDialogComponent>,
    //private snackBarMsg:MatSnackBar
    private messageService:MessageService
  ) {}

  async ngOnInit() {
    try {
      this.loading = true;
      this.data = await this.profileService.getProfile() as Profile;
      this.loading = false;
    } catch (error) {
      console.error('Error fetching data :(', error);
      this.error = 'Error fetching data. Please try again.';
      this.loading = false;
    }
  }

  editField(field: string) {
    this.editMode = !this.editMode;
    this.editingField = field;

    if (field === 'fullName') {
      this.updateValue = this.data.firstName + ' ' + this.data.lastName;
    } else {
      this.updateValue = this.data[field];
    }
  }

  async updateProfile() {
    try {
      this.loading=true;
      if (this.editingField === 'fullName') {
        const [firstName, lastName] = this.updateValue.split(' ');

        this.updateData.updateKey = 'firstName';
        this.updateData.updateValue = firstName;
        await this.profileService.updateProfile(this.updateData);

        this.updateData.updateKey = 'lastName';
        this.updateData.updateValue = lastName;
        await this.profileService.updateProfile(this.updateData);
        this.data = await this.profileService.getProfile() as Profile;
      } else {
        this.updateData.updateKey = this.editingField;
        this.updateData.updateValue = this.updateValue;
        await this.profileService.updateProfile(this.updateData);
        this.data = await this.profileService.getProfile() as Profile;
      }
      this.editMode = false;
      this.loading=false;
      console.log('Before toast bar');
      this.messageService.add({
        severity: 'success',
        // summary: 'Success',
        detail: 'Value updated successfully!',
      });

      // this.snackBarMsg.open('Value updated successfully!', 'Close',{
      //   duration:3000,
      //   verticalPosition: 'bottom',
      //   horizontalPosition: 'center',
      // });


    } catch (error) {
      console.error('Error updating profile :(', error);
    }
  }
  goToProfile() {
    this.dialogRef.close();
  }
}
