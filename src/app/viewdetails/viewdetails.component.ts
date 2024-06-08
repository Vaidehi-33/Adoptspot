import { CognitoService } from './../cognito.service';
import { WebsocketService } from './../websocket.service';
import { Component, Input } from '@angular/core';
import { ViewdetailsService } from './viewdetails.service';
import { ConfirmationService, MessageService } from 'primeng/api';

export interface Response {
  success: boolean;
  post: Post;
  isAddedToFavorite: boolean;
  isApplied: boolean;
}

export interface Post {
  id: string;
  userId: string;
  name: string;
  location: string;
  description: string;
  imageUrl: string;
  age: string;
  gender: string;
  animalType: string;
  breed: string;
  medicalHistory: string;
  createdAt: string;
}

@Component({
  selector: 'app-viewdetails',
  templateUrl: './viewdetails.component.html',
  styleUrl: './viewdetails.component.scss',
})
export class ViewdetailsComponent {
  details = {} as Response;
  isLoading: boolean = false;
  applyLoading: boolean = false;
  favoriteLoading: boolean = false;
  favoriteButtonLabel: string = '';
  applyButtonLabel: string = '';
  isApplyClicked: boolean = false;
  message: string = '';
  isMessageShort: boolean = false;
  @Input() id: string = '';

  constructor(
    private viewDetailsService: ViewdetailsService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private websocketService: WebsocketService,
    private cognitoService: CognitoService
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.viewDetailsService.getDetails(this.id).then((response) => {
      response.subscribe((data: any) => {
        this.isLoading = false;
        this.details = data as Response;
        console.log(this.details);
        this.favoriteButtonLabel = this.details.isAddedToFavorite
          ? 'Already added to favorites'
          : 'Add to favorites';
        this.applyButtonLabel = this.details.isApplied
          ? 'Already applied'
          : 'Apply';
      });
    });
  }

  onApplyClickHandler() {
    if (this.message.trim().length < 20 || this.message.length > 100) {
      this.isMessageShort = true;
    } else {
      this.applyLoading = true;
      this.isApplyClicked = false;
      this.viewDetailsService
        .applyToPost(
          this.id,
          this.message,
          this.details.post.userId,
          this.details.post.name
        )
        .then((response) => {
          response.subscribe(async (data: any) => {
            const user = await this.cognitoService.getUser();
            const body = {
              action: 'sendNotification',
              toId: data.user.id,
              post: {
                name: this.details.post.name,
                id: this.details.post.id,
              },
              user: {
                firstName: user['custom:firstName'],
              },
            };
            this.websocketService.sendMessage(JSON.stringify(body));
            this.applyButtonLabel = 'Already applied';
            console.log(data);
            this.applyLoading = false;
            this.details.isApplied = true;
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: data.message,
            });
          });
        });
    }
  }

  onAddToFavoritesClickHandler(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure that you want to add it to favorites?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: 'none',
      rejectIcon: 'none',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => {
        this.favoriteLoading = true;
        this.viewDetailsService.addToFavorites(this.id).then((response) => {
          response.subscribe((data: any) => {
            this.favoriteLoading = false;
            this.favoriteButtonLabel = 'Already added to favorites';
            this.details.isAddedToFavorite = true;
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: data.message,
            });
          });
        });
      },
      reject: () => {
        this.favoriteLoading = false;
      },
    });
  }
  capitalizeFirstLetter(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
}
