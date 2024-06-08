import { Router } from '@angular/router';
import { FavoritesService } from './favorites.service';
import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { MessageService } from 'primeng/api';

interface Response {
  success: boolean;
  data: Data[];
}

interface Data {
  Item: Item;
}

interface Item {
  id: string;
  location: string;
  name: string;
  imageUrl: string;
  favoritesId: string;
  userInitial: string;
}

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss',
})
export class FavoritesComponent {
  response = {} as Response;
  isDeleteClicked: boolean = false;
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private favoritesService: FavoritesService,
    private messageService: MessageService
  ) {}
  ngOnInit() {
    this.isLoading = true;
    this.favoritesService.fetchFavoritesHandler().then((response) => {
      response.subscribe((data) => {
        this.isLoading = false;
        this.response = data as Response;
        console.log(data);
      });
    });
  }

  onCardClickHandler(postId: string) {
    if (!this.isDeleteClicked) {
      this.router.navigate([`/view-details/${postId}`]);
    }
  }

  onFavoriteDeleteHandler(favoritesId: string) {
    // Display a confirmation dialog using SweetAlert
    this.isDeleteClicked = true;
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this favorite!',
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

        this.favoritesService
          .deleteFromMyFavorites(favoritesId)
          .then((response) => {
            response.subscribe((data) => {
              this.isLoading = false;
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Favorites deleted successfully',
              });
              this.response = {
                ...this.response,
                data: this.response.data.filter(
                  (res) => res.Item.favoritesId != favoritesId
                ),
              };
            });
          });
      } else {
        // If canceled, do nothing
        this.isDeleteClicked = false;
      }
    });
  }
}
