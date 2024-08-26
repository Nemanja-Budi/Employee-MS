import { Component, inject, OnInit } from '@angular/core';
import { AccountService } from './account/account.service';

//PREGLEDANO OKE

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  accountService: AccountService = inject(AccountService);

  private refreshUser(): void {
    const jwt = this.accountService.getJWT();
    if(jwt) {
      this.accountService.refreshUser(jwt).subscribe({
        next: _ => {},
        error: _ => {
          this.accountService.logout()
        }
      });
    } else {
      this.accountService.refreshUser(null).subscribe();
    }
  }

  ngOnInit(): void {
    this.refreshUser();
  }
}
