import { Bank } from '../../../../models/bank';
import { Component, OnInit } from '@angular/core';
import { BankService } from '../../../../services/bank.service';
import { BankSelectList } from '../../../../bank-list-selec.service';

@Component({
  selector: 'app-bank-select',
  templateUrl: './bank-select.component.html',
  styleUrls: ['./bank-select.component.scss']
})
export class BankSelectComponent implements OnInit {
  banks: Bank[] = [];
  selectedItems: string[] = [];

  constructor(private bankService: BankService, private bankSelectList: BankSelectList) {}

  ngOnInit(): void {
    this.selectedItems = this.bankSelectList.getSelectedItems();
    console.log('Selected items in BankSelectComponent:', this.selectedItems);
    this.bankService.getBanks().subscribe(data => {
      if (this.selectedItems.length > 0) {
        this.banks = data.filter(bank => this.selectedItems.includes(bank.code_Bank.toString()));
        console.log('Filtered Banks:', this.banks);
      } else {
        console.log('No selected items to filter banks.');
      }
    });
  }
}
