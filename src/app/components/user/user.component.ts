import {Component} from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  isUserList: boolean;

  toggleUserList(): void {
    this.isUserList = !this.isUserList;
  }
}
