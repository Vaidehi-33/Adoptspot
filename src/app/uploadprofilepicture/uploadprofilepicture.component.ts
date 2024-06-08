import { Component, Inject } from '@angular/core';
import { ImgService } from '../img.service';
import { updateProfile } from '../profile/profile.model';
import { ProfileService } from '../profile.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-uploadprofilepicture',
  templateUrl: './uploadprofilepicture.component.html',
  styleUrl: './uploadprofilepicture.component.scss',
})
export class UploadprofilepictureComponent {
  imageUrl: string | ArrayBuffer | null = null;
  file!: File;
  uploadedImageUrl: string | undefined;
  responceImgUrl!: string;
  updateData: updateProfile = {} as updateProfile;
  loading: boolean = false;
  constructor(
    private imageUploadService: ImgService,
    private profileService: ProfileService,
    private dialogRef: MatDialogRef<UploadprofilepictureComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      imageUrl: string;
    },
    private imgservice: ImgService
  ) {}
  onUpload(event: any) {
    this.file = event.target.files[0];
    this.imageUploadService.file = event.target.files[0];
    this.imageUploadService
      .readFile(event.target.files[0])
      .then((base64Data) => {
        this.uploadedImageUrl = base64Data;
      });
    this.previewImage(this.file);
  }

  previewImage(file: File): void {
    const reader = new FileReader();

    reader.onload = () => {
      this.imageUrl = reader.result;
    };

    reader.readAsDataURL(file);
  }
  saveprofile() {
    this.loading = true;

    if (this.file) {
      this.imageUploadService
        .uploadImage1()
        .then(async (response) => {
          console.log('Image uploaded successfully:', response);
          console.log('scscs:', this.data.imageUrl);
          if( this.data.imageUrl!="")
          this.imgservice.deleteImage(this.data.imageUrl).subscribe();
          this.responceImgUrl = response.imageUrl;
          this.updateData.updateKey = 'profileImg';
          this.updateData.updateValue = this.responceImgUrl;
          await this.profileService.updateProfile(this.updateData);
          this.dialogRef.close(this.responceImgUrl);
        })
        .catch((error) => {
          console.error('Image upload failed:', error);
        });
    }
  }
}
