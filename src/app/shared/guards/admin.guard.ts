import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AccountService } from 'src/app/account/account.service';
import { jwtDecode } from 'jwt-decode';
import { Observable, map, take, tap } from 'rxjs';
import { User } from 'src/app/account/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private accountService: AccountService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    return this.accountService.user$.pipe(
      take(1),
      map(user => {
        if (user) {
          const decodedToken: any = jwtDecode(user.jwt);
          if (decodedToken && decodedToken.role && Array.isArray(decodedToken.role)) {
            const isAdmin = decodedToken.role.some((role:string) => role.toLowerCase() === 'admin');
            if (isAdmin) {
              return true;
            } else {
              this.router.navigate(['/admin']);
              return false;
            }
          } else {
            this.router.navigate(['/admin']);
            return false;
          }
        } else {
          this.router.navigate(['/account/login']);
          return false; 
        }
      })
    );
  }
}
