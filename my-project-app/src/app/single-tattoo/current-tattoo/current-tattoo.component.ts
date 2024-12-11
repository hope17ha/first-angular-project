import { Component, DestroyRef, OnInit } from '@angular/core';
import { Tattoo } from '../../types/tattoo';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApiService } from '../../api.service';
import { HomeComponent } from '../../home/home.component';
import { UserService } from '../../user.service';


@Component({
  selector: 'app-current-tattoo',
  standalone: true,
  imports: [HomeComponent, RouterLink],
  templateUrl: './current-tattoo.component.html',
  styleUrl: './current-tattoo.component.css',
})
export class CurrentTattooComponent implements OnInit {
  tattoo = {} as Tattoo;
  comment = {} as Comment;
  likes = 0;

  isOwner: boolean = false;
  isTattooLikedByUser: boolean = false;

  get isLogged(): boolean {
    return this.userService.isLogged;
  }

  constructor(
    private destroyRef: DestroyRef,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private userService: UserService,
    private router: Router
  ) {}

  get username(): string {
    return this.userService.user?.username || '';
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['tattoId'];

    const subscription = this.apiService
      .getSingleTattoo(id)
      .subscribe((tattoo) => {
        this.tattoo = tattoo;

        if (this.userService.isLogged) {
          this.isOwner = this.tattoo._ownerId === this.userService.user?._id;
          
        }
      });

      
      this.apiService.getLikesOnTattoo(id).subscribe((likes) => {
        this.likes = Object.keys(likes).length;
      });
      this.destroyRef.onDestroy(() => subscription.unsubscribe());
    }

  like(id: string) {
    this.apiService.getLikesOnTattoo(id).subscribe((likes) => {
      const isTattooLikedByUser = Object.values(likes).some(like => like._ownerId === this.userService.user?._id);
      if (isTattooLikedByUser) {
        return;
      } else {
        this.apiService.likeTattoo(id).subscribe(() => {
          this.apiService.getLikesOnTattoo(id).subscribe((likes) => {
            this.likes = Object.keys(likes).length;
          });
        })
      }
    })
  }
  


  delete() {
    const id = this.route.snapshot.params['tattoId'];

    this.apiService.deleteTattoo(id).subscribe(() => {
      this.router.navigate(['/tattoos']);
    });
  }

    
  }


