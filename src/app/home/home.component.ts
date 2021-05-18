import {Component} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

import {LoginDialogComponent} from '@shared/dialogs/login-dialog.component';
import {AuthService} from '@core/auth.service';
import {Router} from '@angular/router';

@Component({
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
})
export class HomeComponent {
  title = 'Automundo';
  username = undefined;

  constructor(private dialog: MatDialog, private authService: AuthService, private router: Router) {
  }

  login(): void {
    this.dialog.open(LoginDialogComponent)
      .afterClosed()
      .subscribe(() => this.username = this.authService.getName());
  }

  logout(): void {
    this.authService.logout();
  }

  cart(): void {
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  search(value): void {
  }

  redirect(): void {
    this.router.navigate(['/intranet']);
  }
}
