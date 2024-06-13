import { Component, OnInit } from '@angular/core';
import { Responsable } from '../../../../models/responsable';
import { ResponsableService } from '../../../../services/responsable.service';

@Component({
  selector: 'app-responsable-list',
  templateUrl: './responsable-list.component.html',
  styleUrls: ['./responsable-list.component.scss']
})
export class ResponsableListComponent implements OnInit {
  responsables: Responsable[] = [];

  constructor(private responsableService: ResponsableService) { }

  ngOnInit(): void {
    this.getResponsables();
  }

  private getResponsables() {
    this.responsableService.getResponsablesList().subscribe(
      data => {
        console.log('Fetched responsables:', data);
        this.responsables = data;
      },
      error => {
        console.error('Error fetching responsables:', error);
      }
    );
  }

  edit(id: number) {
    // Logic to edit a Responsable
  }
  deleteResponsable(id: number) {
    console.log(id);
    if (confirm('Are you sure you want to delete this responsable?')) {
      this.responsableService.deleteResponsable(id).subscribe(
        () => {
          console.log('Responsable deleted successfully.');
          // Assuming you want to update the list of responsables after deletion
          this.getResponsables();
        },
        error => {
          console.error('Error deleting responsable:', error);
        }
      );
    }
  }
}
