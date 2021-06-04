import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';

import {environment} from '@env';
import {User} from '@core/user.model';
import {HttpService} from '@core/http.service';
import {Role} from '@core/role.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  static END_POINT = environment.REST_CORE + '/users/token';
  private user: User;

  constructor(private httpService: HttpService, private router: Router) {
  }

  login(userName: string, password: string): Observable<User> {
    return this.httpService.authBasic(userName, password)
      .post(AuthService.END_POINT)
      .pipe(
        map(userT => {
          this.user = userT;
          return this.user;
      }))
      /*.pipe(
        map(jsonToken => {
          const jwtHelper = new JwtHelperService();
          this.user = jsonToken;
          this.user.userName = jwtHelper.decodeToken(jsonToken.token).userName;
          this.user.realName = jwtHelper.decodeToken(jsonToken.token).realName;
          this.user.role = jwtHelper.decodeToken(jsonToken.token).role;
          return this.user;
        })
      )*/
      ;

  }

  logout(): void {
    this.user = undefined;
    this.router.navigate(['']).then();
  }

  isAuthenticated(): boolean {

    return this.user != null /*&& !(new JwtHelperService().isTokenExpired(this.user.token))*/;
  }

  hasRoles(roles: Role[]): boolean {
    return this.isAuthenticated() && roles.includes(this.user.role);
  }

  isAdmin(): boolean {
    return this.hasRoles([Role.ADMIN]);
  }

  isOperator(): boolean {
    return this.hasRoles([Role.OPERATOR]);
  }

  getUserName(): string {
    return this.user ? this.user.userName : undefined;
  }

  getRealName(): string {
    return this.user ? this.user.realName : '???';
  }

  getToken(): string {
    return this.user ? this.user.token : undefined;
  }

}
