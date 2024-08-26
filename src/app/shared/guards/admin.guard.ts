import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, map, take } from 'rxjs';

import { jwtDecode } from 'jwt-decode';

import { AccountService } from 'src/app/account/account.service';
import { SharedService } from '../shared.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private accountService: AccountService, private sharedService: SharedService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.accountService.user$.pipe(
      take(1),
      map(user => {
        if (user) {
          const decodedToken: any = jwtDecode(user.jwt);
          let route = this.sharedService.getRoles(decodedToken);
          if(route == 'admin') {
            return true;
          }
          this.router.navigate([`/${route}`]);
          return false;
        } else {
          this.router.navigate(['/account/login']);
          return false; 
        }
      })
    );
  }
}
