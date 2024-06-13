  import { Injectable } from '@angular/core';
  import { Client, Stomp } from '@stomp/stompjs';
  import * as SockJS from 'sockjs-client';
  import { Observable, Subject } from 'rxjs';
  import { Message } from '../models/message';
  import { HttpClient } from '@angular/common/http';
  import { IMessage } from '../models/imessage';

  @Injectable({
    providedIn: 'root'
  })
  export class ChatService {
    private client: Client;
    private messagesSubject = new Subject<Message>();
    messages$ = this.messagesSubject.asObservable();

    constructor(private http: HttpClient) {
      this.client = Stomp.over(() => new SockJS('http://localhost:8080/ws'));
    }

    connect(callback: () => void) {
      this.client.onConnect = (frame) => {
        console.log('Connected: ' + frame);
        callback();
      };
      this.client.activate();
    }

    disconnect() {
      if (this.client.connected) {
        this.client.deactivate();
      }
      console.log('Disconnected');
    }
    sendMessage(message: any) {
      const serializedMessage = JSON.stringify(message);
      console.log('Serialized message:', serializedMessage);
      this.client.publish({ destination: '/app/chat', body: serializedMessage });
    }


    receiveMessages() {
      this.client.subscribe('/topic/messages', message => {
        this.messagesSubject.next(JSON.parse(message.body));
      });
    }
    getMessages(): Observable<IMessage[]> {
      return this.http.get<IMessage[]>('http://localhost:8080/api/messages');
    }

  }
