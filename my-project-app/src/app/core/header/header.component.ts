import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { User } from '../../types/user';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  get username(): string {
    return this.userService.user?.username || '';
  }

  get isLoggedIn(): boolean {
    return this.userService.isLogged;
  }

  constructor(private userService: UserService, private router: Router) {}

  logout() {
    this.userService.logout().subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
