import { Component, OnInit } from '@angular/core';
import { Leveefond } from '../../../models/leveefond';
import { LeveefondService } from '../../../services/leveefond.service';

@Component({
  selector: 'app-leveefond',
  templateUrl: './leveefond.component.html',
  styleUrls: ['./leveefond.component.scss']
})
export class LeveefondComponent implements OnInit {
  Leveefond: Leveefond[] = [];
  filteredLeveefond: Leveefond[] = [];
  codeFilter: string | null = null;
  timeFilter: string | null = null;
  currentPage: number = 1;
  pageSize: number = 10; // Number of items per page
  totalPages: number = 0;
  codeOrder: 'asc' | 'desc' = 'asc'; // Default order is ascending
  dateOrder: 'asc' | 'desc' = 'asc'; // Default order is ascending
  enCoursAppelfond: Leveefond[] = [];
  annulerAppelfond: Leveefond[] = [];
  validerAppelfond: Leveefond[] = [];
  // Modal state
  showModal: boolean = false;
  selectedLeveefondItem: Leveefond | null = null;

  constructor(private leveefondService: LeveefondService) { }

  ngOnInit(): void {
    this.leveefondService.getLV().subscribe(data => {
      this.Leveefond = data;
      this.applyFilters(); // Initial filtering
    });
  }

  applyFilters(): void {
    this.filteredLeveefond = this.Leveefond.filter(item => {
      let codePass = true;
      let timePass = true;

      if (this.codeFilter !== null && this.codeFilter.trim() !== '') {
        codePass = item.client.code.startsWith(this.codeFilter);
      }

      if (this.timeFilter !== null && this.timeFilter.trim() !== '') {
        const filterDate = new Date(this.timeFilter);
        const itemDate = new Date(item.createdAt);
        // Convert date to string without time
        timePass = filterDate.toISOString().slice(0, 10) === itemDate.toISOString().slice(0, 10);
      }

      return codePass && timePass;
    });

    // Sort by client code
    this.filteredLeveefond.sort((a, b) => {
      if (this.codeOrder === 'asc') {
        return a.client.code.localeCompare(b.client.code);
      } else {
        return b.client.code.localeCompare(a.client.code);
      }
    });

    // Sort by date
    this.filteredLeveefond.sort((a, b) => {
      if (this.dateOrder === 'asc') {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      } else {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

    this.updatePagination();
  }

  compareDates(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredLeveefond.length / this.pageSize);
  }

  changePage(page: number): void {
    this.currentPage = page;
  }

  get paginatedLeveefond(): Leveefond[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.filteredLeveefond.slice(startIndex, endIndex);
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  toggleCodeOrder(): void {
    this.codeOrder = this.codeOrder === 'asc' ? 'desc' : 'asc';
    this.applyFilters();
  }

  toggleDateOrder(): void {
    this.dateOrder = this.dateOrder === 'asc' ? 'desc' : 'asc';
    this.applyFilters();
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  showDetails(leveefondItem: Leveefond): void {
    this.selectedLeveefondItem = leveefondItem;
    this.showModal = true;
  }

  hideDetails(): void {
    this.selectedLeveefondItem = null;
    this.showModal = false;
  }

  validerDemande(leveefondItem: Leveefond): void {
    const newStatus = 'valider';
    this.leveefondService.updateStatus(leveefondItem.codeLV, newStatus).subscribe(response => {
      leveefondItem.state = 'valider';
      this.hideDetails();
    });
  }

  annulerDemande(leveefondItem: Leveefond): void {
    const newStatus = 'Annuler';
    this.leveefondService.updateStatus(leveefondItem.codeLV, newStatus).subscribe(response => {
      leveefondItem.state = 'Annuler';
      this.hideDetails();
    });
  }}
