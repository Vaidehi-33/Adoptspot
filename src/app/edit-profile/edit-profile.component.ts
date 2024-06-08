import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile.service';
import { Profile, updateProfile } from '../profile/profile.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  data: Profile = {} as Profile;
  updateData: updateProfile = {} as updateProfile;
  error: string = '';
  loading: boolean = true;
  editMode: boolean = false;
  editingField: string = '';
  updateKey: string = '';
  updateValue: string = '';

  fields: { label: string; key: string }[] = [
    { label: 'Full Name', key: 'fullName' },
    { label: 'Contact No.', key: 'mobileNumber' },
    { label: 'City', key: 'city' },
    { label: 'State', key: 'state' },
    { label: 'Country', key: 'country' }
  ];

  constructor(private router: Router, private profileService: ProfileService) {}

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
    } catch (error) {
      console.error('Error updating profile :(', error);
    }
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }
}
