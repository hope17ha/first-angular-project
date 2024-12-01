import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { LoaderComponent } from '../loader/loader.component';



@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [LoaderComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent implements OnInit {
  isAuthenticating = true;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getProfile().subscribe({
      next: () => {
        this.isAuthenticating = false;
      },
      error: () => {
        this.isAuthenticating = false;
      },
      complete: () => {
        this.isAuthenticating = false;
      },
    });
  }
}
