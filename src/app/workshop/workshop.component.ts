import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-workshop',
  templateUrl: './workshop.component.html',
  styleUrls: ['./workshop.component.css']
})
export class WorkshopComponent implements OnInit {
  username: string;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.displayMainMenu();
  }

  logout() {

  }

  redirect() {

  }

  private displayMainMenu() {
    this.router.navigate(['taller', 'menu']);
  }
}
