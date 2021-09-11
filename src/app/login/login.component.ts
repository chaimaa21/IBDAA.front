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
    this.authService.getUserFromDB(this.user.username).subscribe(
      (usr: User) => {
        if (usr.password == this.user.password) {
          this.authService.signIn(usr);
          this.router.navigate(['/']);
        } else this.erreur = 1;
      },
      (err) => console.log(err)
    );
  }
}
