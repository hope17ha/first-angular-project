import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../../user.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { EmailDirective } from '../../directives/email-validation.directive';
import { DOMAINS } from '../../constant';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [FormsModule, EmailDirective],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css',
})
export class EditProfileComponent implements OnInit {
  domains = DOMAINS;
  isEditMode: boolean = false;

  @ViewChild('editForm') editForm: NgForm | undefined;

  constructor(private userService: UserService, private router: Router) {}
  subscription: Subscription | null = null;

  ngOnInit(): void {
    this.subscription = this.userService.getProfile().subscribe((user) => {
      this.editForm?.controls['username'].setValue(user.username);
      this.editForm?.controls['email'].setValue(user.email);
      this.editForm?.controls['tel'].setValue(user.tel);
    });
  }

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
  }

  saveProfile() {
    const username: string = this.editForm?.controls['username'].value;
    const email: string = this.editForm?.controls['email'].value;
    const tel: string = this.editForm?.controls['tel'].value;

    this.userService.updateProfile(username, email, tel).subscribe(() => {});
    this.router.navigate(['/profile']);
    this.toggleEditMode();
  }
  onCancel(event: Event) {
    event.preventDefault();
    history.back();
  }
}
