import { MessageService } from 'primeng/api';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImgService } from '../img.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-createpost',
  templateUrl: './createpost.component.html',
  styleUrls: ['./createpost.component.scss'],
})
export class CreatepostComponent {
  isDone!: string;
  responceImgUrl: string | undefined;
  dogName: string = '';
  location: string = '';
  description: string = '';
  age!: number;
  gender: string = '';
  type: string = '';
  breed: string = '';
  medicalHistory: string = '';
  uploadedFiles: any[] = [];
  uploadedImageUrl: string | undefined;
  file: File | undefined;
  dogForm!: FormGroup;
  isLinear = false;
  loading:boolean=false;
  isFileSelected: boolean = false;
  dogNameImg:string="";
  ngOnInit() {
    this.dogForm = this.fb.group({
      dogName: ['', Validators.required],
      age: [null, Validators.required],
      location: ['', Validators.required],
      gender: ['', Validators.required],
      type: ['', Validators.required],
      breed: ['', Validators.required],
      medicalHistory: ['', Validators.required],
      description: ['', Validators.required],
    });
  }
  constructor(
    private fb: FormBuilder,
    private imageUploadService: ImgService,
    private router:Router,
    private messageService: MessageService
  ) {}
  submit() {
    this.loading=true;
    if (this.file) {
      this.imageUploadService
        .uploadImage1()
        .then((response) => {
          console.log('Image uploaded successfully:', response);
          this.responceImgUrl = response.imageUrl;
          this.infosubmit();
        })
        .catch((error) => {
          console.error('Image upload failed:', error);
        });
    }
  }

  onUpload(event: any) {
    this.file = event.target.files[0];
    this.dogNameImg =event.target.files[0].name;
    this.imageUploadService.file = event.target.files[0];

    this.imageUploadService
      .readFile(event.target.files[0])
      .then((base64Data) => {
        this.uploadedImageUrl = base64Data;
        this.isFileSelected = true; // Set to true when a file is selected
      });
  }

  infosubmit() {
    if (this.file) {
      const requestData = {
        imageUrl: this.responceImgUrl,
        dogName: this.dogForm.get('dogName')?.value,
        location: this.dogForm.get('location')?.value,
        description: this.dogForm.get('description')?.value,
        age: this.dogForm.get('age')?.value,
        gender: this.dogForm.get('gender')?.value,
        type: this.dogForm.get('type')?.value,
        breed: this.dogForm.get('breed')?.value,
        medicalHistory: this.dogForm.get('medicalHistory')?.value,
      };

      this.imageUploadService
        .uploadImage2(requestData)
        .then((response) => {
          console.log('Image uploaded successfully:', response);
          Swal.fire('Post added Succussful', 'post added...', 'success');
          this.loading=false;
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Post deleted successfully',
          });
          this.router.navigateByUrl("/home");
        })
        .catch((error) => {
          console.error('Image upload failed:', error);
          Swal.fire('SomeThing went wrong', 'error', 'error');
        });
    }
  }
}
