import {Component, OnInit} from '@angular/core';
import {CustomerSearch} from './customer-search.model';
import {of} from 'rxjs';
import {CustomerService} from './customer.service';
import {Customer} from '../shared/services/models/customer.model';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {CustomerDialogComponent} from '../customers/customer-dialog/customer-dialog.component';
import {CancelYesDialogComponent} from '@shared/dialogs/cancel-yes-dialog.component';

@Component({
  selector: 'app-finder-customers',
  templateUrl: './finder-customers.component.html',
  styleUrls: ['./finder-customers.component.css']
})
export class FinderCustomersComponent implements OnInit {

  customerSearch: CustomerSearch;
  customers = of([]);
  title = 'Buscador de clientes';

  constructor(private customerService: CustomerService, private router: Router, private dialog: MatDialog) {
    this.resetSearch();
  }

  ngOnInit(): void {

  }

  search(): void {
    this.customers = this.customerService.search(this.customerSearch);
  }

  resetSearch(): void {
    this.customerSearch = {};
  }

  goToDetail(customer: Customer): void {
    this.router.navigate(['/taller/cliente', customer.identificationId]);
  }

  update(customer: Customer): void {
    this.customerService.read(customer.identificationId)
      .subscribe(customerReaded => this.dialog
        .open(CustomerDialogComponent, {data: customerReaded})
        .afterClosed()
        .subscribe(() => this.search()));
  }

  delete(customer: Customer): void {
    const dialogTitle = 'Dar de baja';
    const dialogText = '¿Realmente desea dar de baja a ' + customer.completeName +
      ' como cliente? Se eliminarán también sus vehículos asociados.';
    this.dialog.open(CancelYesDialogComponent, {data: {title: dialogTitle, text: dialogText}}).afterClosed().subscribe(
      result => {
        if (result) {
          this.customerService.delete(customer.identificationId).subscribe(
            () => this.search()
          );
        }
      }
    );
  }

  newCustomer(): void {
    this.dialog
      .open(CustomerDialogComponent)
      .afterClosed()
      .subscribe(() => this.search());
  }
}
