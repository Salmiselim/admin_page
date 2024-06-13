import { Component } from '@angular/core';
import { Client } from '../../../models/client';
import { ClientService } from '../../../services/client.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.scss'
})
export class ClientsComponent {
  clients : Client[]=[];
  constructor(  private router: Router,private clientService: ClientService ) {}
  ngOnInit(): void {
    this.clientService.getClients().subscribe(data => {
      this.clients = data.filter(client => client.codeSetByAdmin);
    });
}
add(): void {
  this.router.navigate(['/addclient']);
}
deleteClient(code: string): void {
  this.clientService.deleteClient(code).subscribe(() => {
    this.clients = this.clients.filter(Client => Client.code !== code);
  });
}
edit(codecl: string) {
  this.router.navigate(['/',codecl ]);
}
}
