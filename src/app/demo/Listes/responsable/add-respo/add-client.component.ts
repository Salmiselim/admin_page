import { Component, OnInit } from '@angular/core';
import { Responsable } from 'src/app/models/responsable';
import { Agence } from 'src/app/models/agence';
import { Bank } from 'src/app/models/bank';
import { AgenceService } from 'src/app/services/agence.service';
import { BankService } from 'src/app/services/bank.service';
import { ResponsableService } from 'src/app/services/responsable.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss'],
})
export class AddClientComponent implements OnInit {
  responsable: Responsable = {

    codeResponsable: '',
    name: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    agence: {
      codeAgence: 0,
      name: '',
      address: '',
      bank: {
        full_name: '',
        code_Bank: ''
      },
      agenceName: '',
      latitude: 0,
      longitude: 0,
      region: ''
    }
  };
  banks: Bank[] = [];
  agences: Agence[] = [];
  filteredAgences: Agence[] = [];
  selectedBank: string = '';

  constructor(
    private responsableService: ResponsableService,
    private bankService: BankService,
    private agenceService: AgenceService
  ) {}

  ngOnInit(): void {
    this.loadBanks();
    this.loadAgences();
  }

  loadBanks(): void {
    this.bankService.getBanks().subscribe(data => {
      this.banks = data;
    });
  }

  loadAgences(): void {
    this.agenceService.getAgences().subscribe(data => {
      this.agences = data;
    });
  }

  onBankChange(event: any): void {
    this.filteredAgences = this.agences.filter(
      agence => agence.bank.code_Bank === this.selectedBank
    );
  }

  onSubmit(): void {
    this.responsable.codeResponsable = 'r' + this.responsable.agence.codeAgence;

    this.responsableService.createResponsable(this.responsable).subscribe(
      data => {
        console.log('Responsable created successfully', data);
      },
      error => {
        console.error('Error', error);
        alert('Error creating responsable: ' + error.message);
      }
    );
  }
}
