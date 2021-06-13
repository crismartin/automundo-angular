import { Component, OnInit } from '@angular/core';
import {TechnicianSearch} from './technician-search.model';
import {Observable, of} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {TechnicianService} from './technician.service';
import {Technician} from './technician.model';
import {TechnicianDialogComponent} from './technician-dialog/technician-dialog.component';

@Component({
  selector: 'app-technician-maintenance',
  templateUrl: './technician-maintenance.component.html',
  styleUrls: ['./technician-maintenance.component.css']
})
export class TechnicianMaintenanceComponent implements OnInit {

  technicianSearch: TechnicianSearch;
  technicians = of([]);
  title = 'Técnicos';

  constructor(private technicianService: TechnicianService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.resetSearch();
  }

  search(): void {
    this.technicians = this.technicianService.search(this.technicianSearch);
  }

  resetSearch(): void {
    this.technicianSearch = {
      active: true
    };
  }

  update(technician: Technician): void {
    this.technicianService.read(technician.identificationId)
      .subscribe(technicianReaded => this.dialog
        .open(TechnicianDialogComponent, {data: technicianReaded})
        .afterClosed()
        .subscribe(() => this.search()));
  }

  newTechnician(): void {
    this.dialog
      .open(TechnicianDialogComponent)
      .afterClosed()
      .subscribe(() => this.search());
  }
}
