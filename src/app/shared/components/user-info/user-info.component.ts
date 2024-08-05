import { Component, Input } from '@angular/core';
import { AnnualLeave } from 'src/app/models/annual-leaves/annual.leave.model';
import { UserDTO } from 'src/app/models/dto/userDto';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent {

  @Input({required: true}) user!: UserDTO;
}
