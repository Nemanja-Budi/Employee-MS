import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { concatMap, EMPTY, map, switchMap, take } from 'rxjs';

import { AccountService } from '../account.service';
import { Login } from '../models/login.model';
import { User } from '../models/user.model';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  accountService: AccountService = inject(AccountService);
  activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router);

  loginForm: FormGroup;
  submited: boolean = false;
  errorMessages: string[] = [];
  returnUrl: string | null = null;
  roles: string [] = [];

  constructor(private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.accountService.user$.pipe(
      take(1),
      switchMap((user: User | null) => {
        if (user) {
          this.router.navigateByUrl('/');
          return EMPTY;
        } else {
          return this.activatedRoute.queryParamMap.pipe(
            take(1),
            map((params: any) => {
              this.returnUrl = params.get('returnUrl');
            })
          );
        }
      })
    ).subscribe();
  }

  onLogin(): void {
    this.submited = true;
    this.errorMessages = [];
  
    if (!this.loginForm.valid) return;
  
    const newLogin = new Login(this.loginForm.value);
  
    this.accountService.login(newLogin).pipe(
      concatMap((response: any) => {
        if (this.returnUrl) {
          this.router.navigateByUrl(this.returnUrl);
          return EMPTY;
        } else {
          return this.accountService.user$.pipe(
            take(1),
            map((user) => {
              if (user) {
                const decodedToken: any = jwtDecode(user.jwt);
                const route = this.getRoles(decodedToken);
                this.router.navigate([`/${route}`]);
                this.accountService.witchUser.next(route);
              }
            })
          );
        }
      })
    ).subscribe({
      error: (error) => {
        this.errorMessages = error.error.errors ? error.error.errors : [error.error];
      }
    });
  }

  private getRoles(decodedToken: any): string {
    let route = '';
    if (Array.isArray(decodedToken.role)) {
      route = 'admin';
      console.log(route)
    } else if (typeof decodedToken.role === 'string') {
      route = decodedToken.role.toLowerCase();
      if(route == 'manager') {
        route = 'employes'
      } else if (route == 'player') {
        route = 'employes/salary'
      }
    }
    return route;
  }



}
