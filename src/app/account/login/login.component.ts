import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { take } from 'rxjs';

import { AccountService } from '../account.service';
import { Login } from '../models/login.model';
import { User } from '../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;
  submited: boolean = false;
  errorMessages: string[] = [];
  returnUrl: string | null = null;

  accountService: AccountService = inject(AccountService);
  activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router);

  constructor(private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.accountService.user$.pipe(take(1)).subscribe({
      next: (user: User | null) => {
        if(user) {
          this.router.navigateByUrl('/');
        } else {
          this.activatedRoute.queryParamMap.subscribe({
            next: (params: any) => {
              if(params) {
                this.returnUrl = params.get('returnUrl');
              }
            }
          });
        }
      }
    });
  }

  onLogin(): void {
    this.submited = true;
    this.errorMessages = [];
    if(!this.loginForm.valid) return;
    const newLogin = new Login(this.loginForm.value);
    this.accountService.login(newLogin).subscribe({
      next: (response: any) => {
        if(this.returnUrl) {
          this.router.navigateByUrl(this.returnUrl);
        } else {
          this.router.navigateByUrl('/admin');
        }
      },
      error: (error) => {
        if(error.error.errors) {
          this.errorMessages = error.error.errors;
        }
        else {
          this.errorMessages.push(error.error);
        }
      }
    });
  }

}
