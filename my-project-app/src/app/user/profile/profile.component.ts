import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
// import { emailValidator } from '../../utils/email.validator';
// import { DOMAINS } from '../../constants';
import {ProfileDetails, User } from '../../types/user';
import { UserService } from '../../user.service';
import { DOMAINS } from '../../constant';
import { emailValidator } from '../../utils/email.validator';


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
    email: '',
    tel: '',
    username: '',

  };

  form = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    email: new FormControl('', [
      Validators.required,
      emailValidator(DOMAINS)
    ]),
    tel: new FormControl(''),
  });

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    const { username, email, tel } = this.userService.user!;
    this.profileDetails = { username, email, tel: tel! };

    this.form.setValue({
      username,
      email,
      tel: tel!,
    });
  }

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
  }

  get User(): User | null{
    return this.userService.user;
  }
  saveProfile() {
    if (this.form.invalid) {
      return;
    }

    this.profileDetails = this.form.value as ProfileDetails;
    console.log(this.profileDetails)

    const { username, email, tel } = this.profileDetails;

    this.userService.updateProfile(username, email, tel).subscribe(() => {
      this.userService.user = this.form.value as User;
      this.toggleEditMode();
    });
  }

  onCancel(event: Event) {
    event.preventDefault();
    this.toggleEditMode();
  }
}
