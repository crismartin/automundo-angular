import {Component} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {AuthService} from '@core/auth.service';
import {Router} from '@angular/router';
import {LoginDialogComponent} from '@shared/dialogs/login-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent {

  title = 'Automundo';
  realName: string;

  constructor(private dialog: MatDialog, private authService: AuthService, private router: Router) {
    this.realName = authService.getRealName();
  }

  login(): void {
    this.dialog.open(LoginDialogComponent)
      .afterClosed()
      .subscribe(() => this.realName = this.authService.getRealName());
  }

  logout(): void {
    this.authService.logout();
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }
}
