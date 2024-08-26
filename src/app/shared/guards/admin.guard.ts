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

  constructor(private accountService: AccountService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.accountService.user$.pipe(
      take(1),
      map(user => {
        if (user) {
          const decodedToken: any = jwtDecode(user.jwt);
          console.log(`ulazim u gard`)
          let route = '';
          if (Array.isArray(decodedToken.role)) {
            route = 'admin';
            console.log(route)
          } else if (typeof decodedToken.role === 'string') {
            route = decodedToken.role.toLowerCase();
            console.log(`${route}`)
            if(route == 'manager') {
              route = 'employes'
              this.router.navigate([`/${route}`]); 
              console.log(`${route}`)
            } else if (route == 'player') {
              route = 'employes/salary'
              this.router.navigate([`/${route}`]); 
              console.log(`${route}`)
              
            }
          }
          console.log(`RUTA JE ${route}`);
              
          return true;
        } else {
          this.router.navigate(['/account/login']);
          console.log('u elseeeeeeeeeeeeeeeeeeeeeee')
          return false; 
        }
      })
    );
  }
}
