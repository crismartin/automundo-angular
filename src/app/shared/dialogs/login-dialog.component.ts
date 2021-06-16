import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {AuthService} from '@core/auth.service';
import {MatDialog} from '@angular/material/dialog';

@Component({
  templateUrl: 'login-dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class LoginDialogComponent {
  userName: string;
  password: string;

  constructor(private authService: AuthService, private router: Router, private dialog: MatDialog) {
  }

  login(): void {
    this.authService.login(this.userName, this.password).subscribe(
      () => {
        if (this.authService.isAdmin()) {
          this.router.navigate(['taller']).then().finally(() => this.dialog.closeAll());
        } else {
          this.dialog.closeAll();
        }
      }
    );
  }
}
