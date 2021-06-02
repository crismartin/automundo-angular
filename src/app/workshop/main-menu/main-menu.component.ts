import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  findVehicles(): void {
    this.router.navigate(['taller', 'buscar-vehiculos']);
  }

  findCustomers(): void {
    this.router.navigate(['taller', 'buscar-clientes']);
  }

  maintenance(): void {
    this.router.navigate(['taller', 'mantenimiento']);
  }

  replacements(): void {
    this.router.navigate(['taller', 'repuestos']);
  }
}
