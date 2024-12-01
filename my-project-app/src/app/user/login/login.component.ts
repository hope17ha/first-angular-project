import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { UserService } from '../../user.service';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  errorMsg: string | null = null;
  constructor(private userService: UserService, private router: Router) {}

  login(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const { email, password } = form.value;

    this.userService.login(email, password).subscribe((data) => {
      const token = data.accessToken;
      localStorage.setItem('X-Authorization', token);
      this.router.navigate(['/tattoos']);
    });
  }
}
