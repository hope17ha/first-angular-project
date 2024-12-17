import { Component, ViewChild } from '@angular/core';
import {
  EmailValidator,
  FormControl,
  FormGroup,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Route, Router, RouterLink } from '@angular/router';
import { UserService } from '../../user.service';
import { emailValidator } from '../../utils/email.validator';
import { DOMAINS } from '../../constant';


import { EmailDirective } from '../../directives/email-validation.directive';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, FormsModule, EmailDirective],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {

  @ViewChild('registerForm') registerForm: NgForm | undefined;

  errorMessage: string | undefined

  domains = DOMAINS;

  get passwordsDontMatch(): boolean {
    return this.registerForm?.controls['password'].value !== this.registerForm?.controls['rePassword'].value
  }


  constructor(private userService: UserService, private router: Router) {}

  

  

  register() {
    const { username, email, tel, password, rePassword } = this.registerForm?.form.value;

    this.userService
      .register(username, email, tel, password, rePassword)
      .subscribe((data) => {
        const token = data.accessToken;
        localStorage.setItem('X-Authorization', token);
        this.router.navigate(['/home']);
      });
  }
}