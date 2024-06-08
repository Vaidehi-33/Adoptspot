import { CognitoService } from './../cognito.service';
import { WebsocketService } from './../websocket.service';
import { Component, Input } from '@angular/core';
import { ViewdetailsService } from '../viewdetails/viewdetails.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { ImgService } from '../img.service';

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
  selector: 'app-myposts-details',
  templateUrl: './myposts-details.component.html',
  styleUrl: './myposts-details.component.scss'
})
export class MypostsDetailsComponent {
  details = {} as Response;
  isLoading: boolean = false;
  applyLoading: boolean = false;
  favoriteLoading: boolean = false;
  favoriteButtonLabel: string = '';
  applyButtonLabel: string = '';
  isApplyClicked: boolean = false;
  message: string = '';
  isMessageShort: boolean = false;
  // data: any[] = [];
  file: File | undefined;
  dogNameImg:string="";
  uploadedImageUrl: string | undefined;
  isFileSelected: boolean = false;
  responceImgUrl: string | undefined;
  loading:boolean=false;
  images: string[] = [];

  @Input() id: string = '';

  constructor(
    private router: Router,
    private viewDetailsService: ViewdetailsService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private websocketService: WebsocketService,
    private cognitoService: CognitoService,
    private imageUploadService: ImgService,
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.getImages();
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

  onClick(postId: String) {
      this.router.navigate([`/received-application/${postId}`]);
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
    this.submit();  
  }

  submit() {
    this.loading=true;
    if (this.file) {
      this.imageUploadService
        .uploadImage3(this.file,this.id)
        .then((response) => {
          console.log('Image uploaded successfully:', response);
          this.responceImgUrl = response.imageUrl;
        })
        .catch((error) => {
          console.error('Image upload failed:', error);
        });
    }
  }

  async getImages(){
    (await this.imageUploadService.getImages(this.id)).subscribe(
      (files: string[]) => {
        this.images = files;
      },
      error => {
        console.error('Error fetching files:', error);
      }
    );
  }
  capitalizeFirstLetter(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
}
