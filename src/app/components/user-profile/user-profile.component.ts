import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user/user.service';
import {Router} from '@angular/router';
import {User} from 'src/app/models/user';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  userDetails: User;

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit(): void {
    this.userService.getUserProfile().subscribe(
      res => {
        this.userDetails = res.user;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onLogout(): void {
    this.userService.deleteToken();
    this.router.navigate(['/login']);
  }
}
