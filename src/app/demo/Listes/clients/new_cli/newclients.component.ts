import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Client } from '../../../../models/client';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-newclients',
  standalone: true,
  imports: [CommonModule, FormsModule, MatTableModule],
  templateUrl: './newclients.component.html',
  styleUrls: ['./newclients.component.scss']
})
export class NewclientsComponent implements OnInit {
  clients: Client[];
  displayedColumns: string[] = ['name', 'lastname', 'email', 'setCode'];

  constructor(private clientService: ClientService) { }

  ngOnInit(): void {
    this.getClientsWithoutCode();
  }

  getClientsWithoutCode(): void {
    this.clientService.getClientsWithoutCode().subscribe(
      clients => this.clients = clients,
      error => console.error('Error fetching clients without code', error)
    );
  }

  setCode(client: Client): void {
    let newCode = prompt("Enter the new code for the client:");
    if (newCode) {
      this.clientService.setCode(client.code, newCode).subscribe(
        updatedClient => {
          let index = this.clients.findIndex(c => c.code === client.code);
          this.clients[index] = updatedClient;
        },
        error => console.error('Error setting client code', error)
      );
    }
}

}
