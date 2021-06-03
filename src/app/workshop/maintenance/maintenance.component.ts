import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.css']
})
export class MaintenanceComponent implements OnInit {
  username: any;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  replacements(): void {
    this.router.navigate(['taller', 'mantenimiento', 'repuestos']);
  }
}
