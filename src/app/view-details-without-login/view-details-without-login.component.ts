import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-details-without-login',
  templateUrl: './view-details-without-login.component.html',
  styleUrl: './view-details-without-login.component.scss',
})
export class ViewDetailsWithoutLoginComponent {


  onApplyClick() {
    Swal.fire({
      title: 'Login Required',
      text: 'Please log in to proceed.',
      icon: 'question',
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Log In',
      reverseButtons: true,  
    }).then((result) => {
      if (result.isConfirmed) {
        this.handleProceed();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.handleCancel();
      }
    });
  }



    handleProceed() {
    this.dialogRef.close();
    this.router.navigate(['/login']);
  }

  handleCancel() {
    console.log('Cancel clicked');
  }
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      postId: string;
      age: number;
      animalType: string;
      breed: string;
      createdAt: string;
      description: string;
      gender: string;
      imageUrl: string;
      location: string;
      medicalHistory: string;
      name: string;
    },
    private router: Router,
    private dialogRef: MatDialogRef<ViewDetailsWithoutLoginComponent>
  ) {}
  isLoading: boolean = false;
  ngOnInit() {
    console.log(this.data);
  }
}
