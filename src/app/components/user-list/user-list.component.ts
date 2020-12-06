import {Component} from '@angular/core';
import {UserService} from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
  users;

  constructor(private userService: UserService) {
    this.users = this.userService.getUsers();
  }
}
