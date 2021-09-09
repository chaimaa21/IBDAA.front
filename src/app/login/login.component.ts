import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user.model';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent implements OnInit {
  user = new User();
  erreur = 0;

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onLoggedin() {
    console.log(this.user);
    let isValidUser: Boolean = this.authService.SignIn(this.user);
    if (isValidUser && this.authService.isAdmin)
      this.router.navigate(['/admin']);
    else this.erreur = 1;
  }
}
