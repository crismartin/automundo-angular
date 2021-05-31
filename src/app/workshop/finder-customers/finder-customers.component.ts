import {Component, OnInit} from '@angular/core';
import {CustomerSearch} from './customer-search.model';
import {of} from 'rxjs';
import {CustomerService} from './customer.service';
import {Customer} from '../shared/services/models/customer.model';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {CustomerDialogComponent} from '../customers/customer-dialog/customer-dialog.component';

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

  search() {
    this.customers = this.customerService.search(this.customerSearch);
  }

  resetSearch() {
    this.customerSearch = {};
  }

  goToDetail(customer: Customer) {
    this.router.navigate(['/taller/cliente', customer.identificationId]);
  }

  update($event: any) {

  }

  delete($event: any) {

  }

  newCustomer() {
    this.dialog
      .open(CustomerDialogComponent)
      .afterClosed()
      .subscribe(() => this.search());
  }
}
