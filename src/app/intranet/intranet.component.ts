import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';

import {HttpService} from '@core/http.service';
import {AuthService} from '@core/auth.service';

@Component({
  templateUrl: 'intranet.component.html',
  styleUrls: ['intranet.component.css'],

})
export class IntranetComponent {
  username: string;

  constructor(private router: Router, private dialog: MatDialog, private httpService: HttpService,
              private tokensService: AuthService) {
    this.username = tokensService.getName();
  }

  untilManager(): boolean {
    return this.tokensService.untilManager();
  }

  logout(): void {
    this.tokensService.logout();
  }

  isAuthenticated(): boolean {
    return this.tokensService.isAuthenticated();
  }
}
