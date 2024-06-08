import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { MyApplicationService } from '../my-application/my-application.service';
import Swal from 'sweetalert2';
import { MessageService } from 'primeng/api';

interface Response {
  success: boolean;
  data: Data[];
}
interface Data {
  Item: MyPost;
}
interface MyPost {
  location: string;
  name: string;
  imageUrl: string;
  animalType: string;
  userId: string;
  description: string;
  id: string;
  appliedPostId: string;
  userInitial: string;
}

@Component({
  selector: 'app-my-application',
  templateUrl: './my-application.component.html',
  styleUrls: ['./my-application.component.scss'],
})
export class MyApplicationComponent {
  data = {} as Response;
  isDeleteClicked: boolean = false;
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private myApplication: MyApplicationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.myApplication.getMyApplication().then((response) => {
      response.subscribe((data) => {
        this.isLoading = false;
        console.log(data);
        this.data = data as Response;

      });
    });
  }

  onCardClickHandler(postId: string) {
    if (!this.isDeleteClicked) {
      this.router.navigate([`/view-details/${postId}`]);
    }
  }

  onDeleteHandler(appliedPostId: string) {
    // Display a confirmation dialog using SweetAlert
    this.isDeleteClicked = true;
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this application!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it',
      cancelButtonText: 'Cancel',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {


        this.isLoading = true;

        this.myApplication
          .deleteFromMyApplication(appliedPostId)
          .then((response) => {
            response.subscribe((data) => {
              this.isLoading = false;
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Application deleted successfully' });
              this.data = {
                ...this.data,
                data: this.data.data.filter(
                  (res) => res.Item.id != appliedPostId
                ),
              };

              console.log(this.data);
            });
          });
      } else {
        // If canceled, do nothing
        this.isDeleteClicked = false;
      }
    });
  }
}
