import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CognitoService } from './cognito.service';

@Injectable({
  providedIn: 'root',
})
export class ImgService {
  private _file!: File;

  public set file(file: File) {
    this._file = file;
  }
  public get file(): File {
    return this._file;
  }
  constructor(
    private httpClient: HttpClient,
    private cognitoService: CognitoService
  ) {}
  uploadImage1() {
    return this.uploadImage(this._file);
  }
  
  uploadImage(file: File): Promise<any> {
    return this.readFile(file).then((base64Data) => {
      const requestData = {
        fileName: file.name,
        image: base64Data,
      };
      return this.httpClient
        .post(
          'https://l9wzcaf3xc.execute-api.ca-central-1.amazonaws.com/dev/s3imgupload',
          requestData
        )
        .toPromise();
    });
  }

  uploadImage3(file: File,id:string): Promise<any> {
    return this.readFile(file).then((base64Data) => {
      const requestData = {
        fileName: file.name,
        folderName: id,
        image: base64Data,
      };
      return this.httpClient
        .post(
          ' https://l9wzcaf3xc.execute-api.ca-central-1.amazonaws.com/dev/S3ImgUploadGallery/{folderName}/{fileName}',
          requestData
        )
        .toPromise();
    });
  }

  readFile(file: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Data = reader.result as string;
        resolve(base64Data);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  async uploadImage2(requestData: any) {
    const jwt = await this.cognitoService.getJwt();
    const apiUrl =
      'https://l9wzcaf3xc.execute-api.ca-central-1.amazonaws.com/dev/myposts';
    this.httpClient
      .post(apiUrl, requestData, {
        headers: {
          Authorization: `${jwt}`,
        },
      })
      .subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.error(error);
        }
      );
  }

  async getImages(id:string){
    return this.httpClient.get<string[]>(`https://l9wzcaf3xc.execute-api.ca-central-1.amazonaws.com/dev/S3ImgUploadGallery/${id}/{fileName}`);
  }

  async getData() {
    const jwt = await this.cognitoService.getJwt();
    return this.httpClient.get(
      `https://l9wzcaf3xc.execute-api.ca-central-1.amazonaws.com/dev/myposts`,
      {
        headers: {
          Authorization: `${jwt}`,
        },
      }
    );
  }

  async deletePost(postId: string) {
    const jwt = await this.cognitoService.getJwt();
    const apiUrl =
      'https://l9wzcaf3xc.execute-api.ca-central-1.amazonaws.com/dev/myposts';
    const requestBody = { id: postId };

    return this.httpClient
      .request('delete', apiUrl, {
        body: requestBody,
        headers: {
          Authorization: `${jwt}`,
        },
      })
      .toPromise();
  }

  deleteImage(imgUrl: string): Observable<any> {
    const apiurlz =
      'https://l9wzcaf3xc.execute-api.ca-central-1.amazonaws.com/dev/s3imgupload';
    const deleteUrl = `${apiurlz}?url=${encodeURIComponent(imgUrl)}`;

    return this.httpClient.delete(deleteUrl);
  }
}
