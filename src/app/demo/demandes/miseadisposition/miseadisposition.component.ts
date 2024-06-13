import { NgFor, NgIf, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Miseadisposition } from 'src/app/models/miseadisposition';
import { MiseadispositionService } from 'src/app/services/miseadisposition.service';

@Component({
  standalone: true,
  imports: [NgFor, NgIf, FormsModule, DatePipe],
  selector: 'app-miseadisposition',
  templateUrl: './miseadisposition.component.html',
  styleUrls: ['./miseadisposition.component.scss']
})
export class MiseadispositionComponent implements OnInit {
  miseadispositions: Miseadisposition[] = [];
  filteredMiseadispositions: Miseadisposition[] = [];
  selectedMiseadisposition: Miseadisposition | null = null;
  showModal: boolean = false;

  codeFilter: string = '';
  timeFilter: string = '';

  codeOrder: string = 'asc';
  dateOrder: string = 'asc';

  currentPage: number = 1;
  itemsPerPage: number = 10;
  pages: number[] = [];

  constructor(private miseadispositionService: MiseadispositionService) {}

  ngOnInit(): void {
    this.fetchMiseadispositions();
  }

  fetchMiseadispositions(): void {
    this.miseadispositionService.getAllMiseADispositions().subscribe((data) => {
      this.miseadispositions = data;
      this.applyFilters();
    });
  }

  applyFilters(): void {
    this.filteredMiseadispositions = this.miseadispositions.filter(miseadisposition =>
      (!this.codeFilter || miseadisposition.client?.code.includes(this.codeFilter)) &&
      (!this.timeFilter || new Date(miseadisposition.createdAt!).toISOString().slice(0, 10) === this.timeFilter)
    );
    this.updatePagination();
  }

  updatePagination(): void {
    const totalPages = Math.ceil(this.filteredMiseadispositions.length / this.itemsPerPage);
    this.pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    this.changePage(1);
  }

  changePage(page: number): void {
    this.currentPage = page;
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.filteredMiseadispositions = this.miseadispositions.slice(startIndex, startIndex + this.itemsPerPage);
  }

  toggleCodeOrder(): void {
    this.codeOrder = this.codeOrder === 'asc' ? 'desc' : 'asc';
    this.filteredMiseadispositions.sort((a, b) => {
      if (!a.client?.code || !b.client?.code) return 0;
      return this.codeOrder === 'asc' ? a.client.code.localeCompare(b.client.code) : b.client.code.localeCompare(a.client.code);
    });
  }

  toggleDateOrder(): void {
    this.dateOrder = this.dateOrder === 'asc' ? 'desc' : 'asc';
    this.filteredMiseadispositions.sort((a, b) => {
      if (!a.createdAt || !b.createdAt) return 0;
      return this.dateOrder === 'asc' ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime() : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }

  showDetails(miseadisposition: Miseadisposition): void {
    this.selectedMiseadisposition = miseadisposition;
    this.showModal = true;
  }

  hideDetails(): void {
    this.showModal = false;
    this.selectedMiseadisposition = null;
  }

  validerDemande(miseadisposition: Miseadisposition): void {
    this.updateMiseADispositionStatus(miseadisposition.codeMAD!, 'valider');
  }

  annulerDemande(miseadisposition: Miseadisposition): void {
    this.updateMiseADispositionStatus(miseadisposition.codeMAD!, 'annuler');
  }

  updateMiseADispositionStatus(id: number, status: string): void {
    this.miseadispositionService.updateMiseADispositionStatus(id, status).subscribe((updatedMiseadisposition) => {
      const index = this.miseadispositions.findIndex(m => m.codeMAD === id);
      if (index !== -1) {
        this.miseadispositions[index].state = updatedMiseadisposition.state;
        this.applyFilters();
      }
    });
  }

  updateMiseADispositionLivrerState(id: number, livrer: boolean): void {
    this.miseadispositionService.updateMiseADispositionLivrerState(id, livrer).subscribe((updatedMiseadisposition) => {
      const index = this.miseadispositions.findIndex(m => m.codeMAD === id);
      if (index !== -1) {
        this.miseadispositions[index].livrer = updatedMiseadisposition.livrer;
        this.applyFilters();
      }
    });
  }
}
