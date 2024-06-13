import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AgenceService } from '../../../services/agence.service';
import { Agence } from '../../../models/agence';

@Component({
  selector: 'app-agence',
  templateUrl: './agence.component.html',
  styleUrls: ['./agence.component.scss']
})
export class AgenceComponent implements OnInit {
  showAddAgenceModal: boolean = false;
  agencies: Agence[] = [];
  deletedAgencies: Agence[] = [];

  constructor(private router: Router, private agenceService: AgenceService) {}

  ngOnInit() {
    this.loadAgencies();
    this.loadDeletedAgencies(); // Add this line to load deleted agencies when the component initializes
  }

  loadDeletedAgencies() {
    // Load deleted agencies with deleted state true
    this.agenceService.getDeletedAgencies(true).subscribe(data => {
      this.deletedAgencies = data;
    });
  }

  loadAgencies() {
    // Load agencies with deleted state false
    this.agenceService.getAgences().subscribe(data => {
      this.agencies = data.filter(agency => !agency.deleted);
    });
  }

  deleteAgency(code: number): void {
    this.agenceService.changeAgencyState(code, true).subscribe(() => {
      this.loadAgencies();
      this.loadDeletedAgencies(); // After deleting, reload deleted agencies
    });
  }

  restoreAgency(code: number): void {
    this.agenceService.changeAgencyState(code, false).subscribe(() => {
      this.loadAgencies();
      this.loadDeletedAgencies(); // After restoring, reload deleted agencies
    });
  }

  edit(codeagence: number) {
    this.router.navigate(['/editagc', codeagence]);
  }

  openAddAgenceModal() {
    this.showAddAgenceModal = true;
  }

  closeAddAgenceModal() {
    this.showAddAgenceModal = false;
  }
}
