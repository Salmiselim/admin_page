import { Component, OnInit } from '@angular/core';
import { Appelfond } from '../../../models/appelfond';
import { AppelfondService } from '../../../services/appelfond.service';

@Component({
  selector: 'app-appelfond',
  templateUrl: './appelfond.component.html',
  styleUrls: ['./appelfond.component.scss']
})
export class AppelfondComponent implements OnInit {
  Appelfond: Appelfond[] = [];
  enCoursAppelfond: Appelfond[] = [];
  annulerAppelfond: Appelfond[] = [];
  validerAppelfond: Appelfond[] = [];
  filteredAppelfond: Appelfond[] = [];
  codeFilter: string | null = null;
  timeFilter: string | null = null;
  currentPage: number = 1;
  pageSize: number = 6; // Number of items per page
  totalPages: number = 0;
  codeOrder: 'asc' | 'desc' = 'asc'; // Default order is ascending
  dateOrder: 'asc' | 'desc' = 'asc'; // Default order is ascending

  // Modal state
  showModal: boolean = false;
  selectedAppelfondItem: Appelfond | null = null;

  constructor(private appelfondService: AppelfondService) { }

  ngOnInit(): void {
    this.appelfondService.getAF().subscribe(data => {
      this.Appelfond = data;
      this.filterAppelfond(); // Initial filtering
    });
  }

  filterAppelfond(): void {
    this.filteredAppelfond = this.Appelfond.filter(item => {
      let codePass = true;
      let timePass = true;

      if (this.codeFilter !== null && this.codeFilter.trim() !== '') {
        codePass = (item.client && item.client.code.startsWith(this.codeFilter)) || (item.responsable && item.responsable.codeResponsable.toString().startsWith(this.codeFilter));
      }

      if (this.timeFilter !== null && this.timeFilter.trim() !== '') {
        const filterDate = new Date(this.timeFilter);
        const itemDate = new Date(item.createdAt);
        // Convert date to string without time
        timePass = filterDate.toISOString().slice(0, 10) === itemDate.toISOString().slice(0, 10);
      }

      return codePass && timePass;
    });

    this.enCoursAppelfond = this.filteredAppelfond.filter(item => item.state === 'en cours');
    this.annulerAppelfond = this.filteredAppelfond.filter(item => item.state === 'annuler');
    this.validerAppelfond = this.filteredAppelfond.filter(item => item.state === 'valider');

    // Sort by client code
    this.filteredAppelfond.sort((a, b) => {
      const codeA = (a.client && a.client.code) || (a.responsable && a.responsable.codeResponsable) || '';
      const codeB = (b.client && b.client.code) || (b.responsable && b.responsable.codeResponsable) || '';
      return this.codeOrder === 'asc' ? codeA.localeCompare(codeB) : codeB.localeCompare(codeA);
    });

    // Sort by date
    this.filteredAppelfond.sort((a, b) => {
      if (this.dateOrder === 'asc') {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      } else {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

    this.updatePagination();
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredAppelfond.length / this.pageSize);
  }

  changePage(page: number): void {
    this.currentPage = page;
  }

  get paginatedAppelfond(): Appelfond[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.filteredAppelfond.slice(startIndex, endIndex);
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  toggleCodeOrder(): void {
    this.codeOrder = this.codeOrder === 'asc' ? 'desc' : 'asc';
    this.filteredAppelfond.sort((a, b) => {
      const codeA = (a.client && a.client.code) || (a.responsable && a.responsable.codeResponsable) || '';
      const codeB = (b.client && b.client.code) || (b.responsable && b.responsable.codeResponsable) || '';
      return this.codeOrder === 'asc' ? codeA.localeCompare(codeB) : codeB.localeCompare(codeA);
    });
  }

  toggleDateOrder(): void {
    this.dateOrder = this.dateOrder === 'asc' ? 'desc' : 'asc';
    this.filterAppelfond();
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

 showDetails(appelfondItem: Appelfond): void {
  this.selectedAppelfondItem = appelfondItem;
  this.showModal = true;
}
  hideDetails(): void {
    this.showModal = false;
    this.selectedAppelfondItem = null;
  }
  annulerDemande(appelfondItem: Appelfond): void {
    console.log("clicked")
    this.appelfondService.updateStatus(appelfondItem.codeAP, 'annuler').subscribe(
      () => {
        this.appelfondService.getAF().subscribe(data => {
          this.Appelfond = data;
          this.filterAppelfond();
        });
      },
      (error) => {
        console.error('Error updating status:', error);
      }
    );
  }
  validerDemande(appelfondItem: Appelfond): void {
    console.log("clicked")
    this.appelfondService.updateStatus(appelfondItem.codeAP, 'valider').subscribe(
      () => {
        this.appelfondService.getAF().subscribe(data => {
          this.Appelfond = data;
          this.filterAppelfond();
        });
      },
      (error) => {
        console.error('Error updating status:', error);
      }
    );
  }
}
