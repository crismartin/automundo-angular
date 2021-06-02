import { Component, OnInit } from '@angular/core';
import {ReplacementSearch} from './replacement-search.model';
import {of} from 'rxjs';
import {ReplacementService} from './replacement.service';
import {Replacement} from './replacement.model';
import {MatDialog} from '@angular/material/dialog';
import {ReplacementDialogComponent} from './replacement-dialog/replacement-dialog.component';

@Component({
  selector: 'app-replacements-maintenance',
  templateUrl: './replacements-maintenance.component.html',
  styleUrls: ['./replacements-maintenance.component.css']
})
export class ReplacementsMaintenanceComponent implements OnInit {

  replacementSearch: ReplacementSearch;
  replacements = of([]);
  title = 'Repuestos';

  constructor(private replacementService: ReplacementService, private dialog: MatDialog) {
    this.resetSearch();
  }

  ngOnInit(): void {
  }

  search(): void {
    this.replacements = this.replacementService.search(this.replacementSearch);
  }

  resetSearch(): void {
    this.replacementSearch = {};
  }

  update(replacement: Replacement): void {
    this.replacementService.read(replacement.reference)
      .subscribe(replacementReaded => this.dialog
        .open(ReplacementDialogComponent, {data: replacementReaded})
        .afterClosed()
        .subscribe(() => this.search()));
  }

  delete($event: any) {

  }

  newReplacement(): void {
    this.dialog
      .open(ReplacementDialogComponent)
      .afterClosed()
      .subscribe(() => this.search());
  }
}
