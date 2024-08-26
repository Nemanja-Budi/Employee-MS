import { Component, inject } from '@angular/core';
import { AccountService } from 'src/app/account/account.service';

@Component({
  selector: 'app-employes-navbar',
  templateUrl: './employes-navbar.component.html',
  styleUrls: ['./employes-navbar.component.css']
})
export class EmployesNavbarComponent {

  accountService: AccountService = inject(AccountService);

  logout(): void {
    this.accountService.logout();
  }
}
