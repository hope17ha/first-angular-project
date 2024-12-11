import { Component, DestroyRef, OnInit, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
// import { emailValidator } from '../../utils/email.validator';
// import { DOMAINS } from '../../constants';
import {ProfileDetails, User } from '../../types/user';
import { UserService } from '../../user.service';



import { Subscription } from 'rxjs';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  @ViewChild('form') editForm: NgForm | undefined;

  isEditMode: boolean = false;
  
  subscription: Subscription | null = null;
  
  profileDetails: ProfileDetails = {
    id: '',
    email: '',
    tel: '',
    username: '',
  };
  
  
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private destroyRef: DestroyRef){}

  
  ngOnInit(): void {


    this.subscription = this.userService.getProfile().subscribe((user) => {
      this.profileDetails = {
        id: user?._id,
        username: user?.username,
        email: user?.email,
        tel: user?.tel,
      };
    });
    this.destroyRef.onDestroy(() => this.subscription?.unsubscribe());
  }

  toggleEdit() {
        this.isEditMode = !this.isEditMode;
      }
    
}

