import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { emailValidator } from '../../utils/email.validator';

import { ProfileDetails, User } from '../../types/user';
import { DOMAINS } from '../../constant';
import { UserService } from '../../user.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  isEditMode: boolean = false;

  profileDetails: ProfileDetails = {
    username: '',
    email: '',
    tel: '',
  };

  form = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    email: new FormControl('', [Validators.required, emailValidator(DOMAINS)]),
    tel: new FormControl(''),
  });

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {

    
    const { username, email, tel } = this.userService.user!;
    this.profileDetails = { username, email, tel };

    this.form.setValue({
      username,
      email,
      tel,
    });
  }

 
}
