import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '@core/auth.service';

@Component({
  selector: 'app-workshop',
  templateUrl: './workshop.component.html',
  styleUrls: ['./workshop.component.css']
})
export class WorkshopComponent implements OnInit {

  gridConfig: any = {
    cols: undefined,
    colSpan: undefined
  };

  constructor(private router: Router, private authService: AuthService) {
    this.gridConfig.cols = this.isAdmin() ? 3 : 4;
    this.gridConfig.colSpan = this.isAdmin() ? 1 : 2;
  }

  ngOnInit(): void {
  }

  searchCustomers(): void {
    this.router.navigate(['taller', 'buscar-clientes']);
  }

  searchVehicles(): void {
    this.router.navigate(['taller', 'buscar-vehiculos']);
  }

  maintenance(): void {
    this.router.navigate(['taller', 'mantenimiento']);
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }
}
