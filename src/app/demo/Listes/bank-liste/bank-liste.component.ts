import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Bank } from '../../../models/bank';
import { BankService } from '../../../services/bank.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-bank-liste',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './bank-liste.component.html',
  styleUrls: ['./bank-liste.component.scss']
})
export class BankListeComponent implements OnInit {
  banks: Bank[] = [];
  paginatedBanks: Bank[] = [];
  checkedItems: string[] = [];
  pageSize: number = 5; // Number of items per page
  currentPage: number = 1;
  totalPages: number = 0;
  pages: number[] = [];
  codeOrder: string = "asc"; // Default order is ascending
  nameFilter: string = "";
  alphabet: string[] = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split('');
  showAddBankModal: boolean = false;
  deletedBanks: Bank[] = [];

  constructor(
    private router: Router,
    private bankService: BankService,
  ) {}

  ngOnInit(): void {
    this.initializePage();
  }

  add(): void {
    this.router.navigate(['/addbq']);
  }
  deleteBank(code: string): void {
    this.bankService.updateBankState(code, true).subscribe(() => {
      const bank = this.banks.find(b => b.code_Bank === code);
      if (bank) {
        bank.deleted = true;
        this.updatePagination();
      }
    });
  }




  edit(codebq: string) {
    this.router.navigate(['/editbq', codebq]);
  }

  initializePage(): void {
    const storedCheckedItems = localStorage.getItem('checkedItems');
    if (storedCheckedItems) {
      this.checkedItems = JSON.parse(storedCheckedItems);
    }
    this.bankService.getBanks().subscribe(data => {
      this.banks = data;
      this.updatePagination();
    });
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredBanks.length / this.pageSize);
    this.paginatedBanks = this.filteredBanks.slice(
      (this.currentPage - 1) * this.pageSize,
      this.currentPage * this.pageSize
    );
    this.pages = [];
    for (let i = 1; i <= this.totalPages; i++) {
      this.pages.push(i);
    }
  }

  filterBanks(): void {
    this.currentPage = 1;
    this.updatePagination();
  }

  get filteredBanks(): Bank[] {
    let filtered = this.banks.filter(bank => !bank.deleted);
    if (this.codeOrder === 'asc') {
      filtered = filtered.sort((a, b) => parseInt(a.code_Bank) - parseInt(b.code_Bank));
    } else if (this.codeOrder === 'desc') {
      filtered = filtered.sort((a, b) => parseInt(b.code_Bank) - parseInt(a.code_Bank));
    }
    if (this.nameFilter) {
      filtered = filtered.filter(bank => bank.full_name.charAt(0).toUpperCase() === this.nameFilter);
    }
    return filtered;
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.updatePagination();
  }



  openAddBankModal(): void {
    this.showAddBankModal = true;
    this.deletedBanks = this.banks.filter(bank => bank.deleted);
  }

  closeAddBankModal(): void {
    this.showAddBankModal = false;
  }

  restoreBank(code: string): void {
    this.bankService.updateBankState(code, false).subscribe(() => {
      const bank = this.banks.find(b => b.code_Bank === code);
      if (bank) {
        bank.deleted = false;
      }
      this.updatePagination();
      this.closeAddBankModal();
    });
  }

}
