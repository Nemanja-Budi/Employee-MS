import { Component, inject } from '@angular/core';
import { AccountService } from 'src/app/account/account.service';
import { Links } from 'src/app/shared/types/shared.types';
import { getMPNAVRoutes } from '../types/mp.type';

@Component({
  selector: 'app-mp-navbar',
  templateUrl: './mp-navbar.component.html',
  styleUrls: ['./mp-navbar.component.css']
})
export class MpNavbarComponent {

  accountService: AccountService = inject(AccountService);

  routes: Links[] = getMPNAVRoutes();

  logout(): void {
    this.accountService.logout();
  }
}
