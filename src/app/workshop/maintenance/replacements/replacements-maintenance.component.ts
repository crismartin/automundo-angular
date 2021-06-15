import { Component, OnInit } from '@angular/core';
import {ReplacementSearch} from '../../shared/services/models/replacement-search.model';
import {of} from 'rxjs';
import {ReplacementService} from './replacement.service';

import {MatDialog} from '@angular/material/dialog';
import {ReplacementDialogComponent} from './replacement-dialog/replacement-dialog.component';
import {CancelYesDialogComponent} from '@shared/dialogs/cancel-yes-dialog.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Replacement} from '../../shared/services/models/replacement';

@Component({
  selector: 'app-replacements-maintenance',
  templateUrl: './replacements-maintenance.component.html',
  styleUrls: ['./replacements-maintenance.component.css']
})
export class ReplacementsMaintenanceComponent implements OnInit {

  replacementSearch: ReplacementSearch;
  replacements = of([]);
  title = 'Repuestos';

  constructor(private replacementService: ReplacementService, private dialog: MatDialog, private snackBar: MatSnackBar) {
    this.resetSearch();
  }

  ngOnInit(): void {
  }

  search(): void {
    this.replacements = this.replacementService.search(this.replacementSearch);
  }

  resetSearch(): void {
    this.replacementSearch = {
      active: true
    };
  }

  update(replacement: Replacement): void {
    this.replacementService.read(replacement.reference)
      .subscribe(replacementReaded => this.dialog
        .open(ReplacementDialogComponent, {data: replacementReaded})
        .afterClosed()
        .subscribe(() => this.search()));
  }

  newReplacement(): void {
    this.dialog
      .open(ReplacementDialogComponent)
      .afterClosed()
      .subscribe(() => this.search());
  }
}
