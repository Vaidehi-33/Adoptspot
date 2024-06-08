import { ImgService } from './../img.service';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { concatMap } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-myposts',
  templateUrl: './myposts.component.html',
  styleUrls: ['./myposts.component.scss'],
})
export class MypostsComponent {
  isDeleteClicked: boolean = false;

  // onCardClickHandler(postId: String) {
  //   !this.isDeleteClicked &&
  //     this.router.navigate([`/received-application/${postId}`]);
  // }

  onCardClickHandler(postId: String) {
    !this.isDeleteClicked &&
      this.router.navigate([`/mypost-details/${postId}`]);
  }

  isLoading: boolean = false;
  data: any[] = [];
  myposts: boolean = false;

  constructor(
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private imgservice: ImgService
  ) {}
  home: boolean = true;
  create: boolean = false;

  ngOnInit(): void {
    this.isLoading = true;
    this.imgservice.getData().then((result) => {
      this.myposts = true;
      result.subscribe((data1: any) => {
        this.isLoading = false;
        this.data = data1?.users?.Items || [];
        this.data = this.data?.map((item) => {
          item['userInitial'] = data1.userInitial.charAt(0).toUpperCase();
          return item;
        });
      });
    });
  }

  AddPost() {
    this.router.navigate(['/new']);
  }
  confirm1(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: 'none',
      rejectIcon: 'none',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Confirmed',
          detail: 'You have accepted',
        });
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Rejected',
          detail: 'You have rejected',
          life: 3000,
        });
      },
    });
  }

  async confirm2(id: string, imgurl: string) {
    console.log(id);

    try {
      const result = await Swal.fire({
        title: 'Do you want to delete this record?',
        text: 'This action cannot be undone!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it',
        cancelButtonText: 'Cancel',
        reverseButtons: true,
      });

      if (result.isConfirmed) {
        this.isLoading = true;
        // User clicked "Yes"
        await this.imgservice
          .deleteImage(imgurl)
          .pipe(concatMap(() => this.imgservice.deletePost(id)))
          .toPromise();
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Post deleted successfully',
        });
        this.isLoading = false;

        const index = this.data.findIndex((post) => post.id === id);
        if (index !== -1) {
          this.data.splice(index, 1);
        }
      }
    } catch (error) {
      console.error('Error during SweetAlert confirmation:', error);
      this.isLoading = false;
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Error during SweetAlert confirmation',
      });
    }
  }
}
