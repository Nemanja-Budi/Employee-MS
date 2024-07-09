import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

import { Observable, map } from 'rxjs';

import { AccountService } from 'src/app/account/account.service';
import { User } from '../../account/models/user.model';

@Injectable({
  providedIn: 'root'
})

export class AuthorizationGuard {

  accountService: AccountService = inject(AccountService);
  router: Router = inject(Router);

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.accountService.user$.pipe(
      map((user: User | null) => {
        if(user) {
          return true;
        }
        else {
          this.router.navigate(['account/login'], { queryParams: { returnUrl: state.url }});
          return false;
        }
      })
    );
  }
}
