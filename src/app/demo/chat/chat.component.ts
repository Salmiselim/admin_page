import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Client } from '../../models/client';
import { ClientService } from '../../services/client.service';
import { IMessage } from '../../models/imessage';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {
  clients: Client[] = [];
  selectedClient: Client;
  messages: IMessage[] = [];
  message: string;
  clientR: Client;
  isAdmin: boolean = false;

  constructor(private chatService: ChatService, private clientService: ClientService) { }

  ngOnInit(): void {
    this.clientService.getClients().subscribe(data => {
      this.clients = data.filter(client => client.codeSetByAdmin);

      if (this.clients.length > 0) {
        this.selectedClient = this.clients[0];
        this.clientR = this.clients[0];
        this.updateMessages();
      }
    });

    this.chatService.connect(() => {
      this.chatService.receiveMessages();
    });
    this.chatService.messages$.subscribe(message => {
      this.messages.push(message);
    });

    const friends = {
      list: document.querySelector('ul.people'),
      all: document.querySelectorAll('.left .person'),
      name: ''
    };
    const chat = {
      container: document.querySelector('.container .right'),
      current: null,
      person: null,
      name: document.querySelector('.container .right .top .name')
    };

    friends.all.forEach((f: any) => {
      f.addEventListener('mousedown', () => {
        f.classList.contains('active') || this.setAciveChat(f, friends, chat);
      });
    });
  }

  setAciveChat(f: any, friends: any, chat: any): void {
    friends.list.querySelector('.active').classList.remove('active');
    f.classList.add('active');
    chat.current = chat.container.querySelector('.active-chat');
    chat.person = f.getAttribute('data-chat');
    chat.current.classList.remove('active-chat');
    chat.container.querySelector('[data-chat="' + chat.person + '"]').classList.add('active-chat');
    friends.name = f.querySelector('.name').innerText;
    chat.name.innerHTML = friends.name;
  }

  selectClient(client: Client): void {
    this.selectedClient = client;
    this.clientR = client;

    console.log('Clients:', this.clients);
    this.updateMessages();
  }

  adminSendMessage(): void {
    this.isAdmin = true;
    this.sendMessage();
  }

  clientSendMessage(): void {
    this.isAdmin = false;
    this.sendMessage();
  }

  sendMessage(): void {
    console.log('Selected client:', this.selectedClient);
    let message;

    if (this.isAdmin) {
      message = {
        content: this.message,
        senderAdmin: {
          id: 1
        },

        receiverClient: {
          code: this.selectedClient ? this.selectedClient.code : null
        }
      };
    } else {
      message = {
        content: this.message,
        receiverAdmin: {
          id: 1
        },
        receiverClient: {
          code: this.selectedClient ? this.selectedClient.code : null
        }
      };
    }

    console.log('Message object:', message);
    this.chatService.sendMessage(message);
    this.message = '';
  }



  ngOnDestroy(): void {
    this.chatService.disconnect();
  }

  private updateMessages(): void {
    if (this.selectedClient && this.selectedClient.code) {
      this.chatService.getMessages().subscribe(messages => {
        this.messages = messages.filter(message => message.receiverClient && message.receiverClient.code === this.selectedClient.code);
      });
    }
  }
}
