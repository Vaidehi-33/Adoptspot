import { CognitoService } from './cognito.service';
import { Injectable } from '@angular/core';
import { Subject, every } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  public socket!: WebSocket;
  messageReceived: Subject<string> = new Subject<string>();

  constructor(private cognitoService: CognitoService) { }
  connect() {
    this.socket = new WebSocket(
      'wss://u6khflwgu8.execute-api.ca-central-1.amazonaws.com/production/'
    );

    /// wstablisg=hing the connection
    this.socket.onopen = async () => {
      const user = await this.cognitoService.getUser();

      this.sendMessage(
        JSON.stringify({
          action: 'setUser',
          userId: user.sub,
          name: user['custom:firstName'],
        })
      );
    };

    /// listens the incoming messages 
    this.socket.onmessage = (event) => {
      const message = event.data;
      console.log('Received message: ', message);
      this.messageReceived.next(message);
    };

    this.socket.onclose = (event) => {
      console.log('Websocket connection closed: ', event);
    };

    this.socket.onerror = (event) => {
      console.log('Websocket error: ', event);
    };
  }

  sendMessage(message: string): void {
    this.socket.send(message);
  }

  closeConnection(): void {
    this.socket.close();
  }
}
