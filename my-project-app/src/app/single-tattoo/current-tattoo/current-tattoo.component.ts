import { Component, DestroyRef, OnInit } from '@angular/core';
import { Tattoo } from '../../types/tattoo';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApiService } from '../../api.service';
import { HomeComponent } from '../../home/home.component';
import { UserService } from '../../user.service';
import { FormsModule, NgForm } from '@angular/forms';
import { ElapsedTimePipe } from '../../pipes/elasped-time.pipe';
import { User } from '../../types/user';

@Component({
  selector: 'app-current-tattoo',
  standalone: true,
  imports: [HomeComponent, RouterLink, FormsModule, ElapsedTimePipe],
  templateUrl: './current-tattoo.component.html',
  styleUrl: './current-tattoo.component.css',
})
export class CurrentTattooComponent implements OnInit {
  tattoo = {} as Tattoo;
  comments: any = [];
  likes = 0;
  user: User | null = null;

  isOwner: boolean = false;
  isTattooLikedByUser: boolean = false;
  tattooId: string = '';
  isCreatingComment = false;

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
    const id = this.route.snapshot.params['tattooId'];
    this.tattooId = id;

    const user = this.userService.user$.subscribe((user) => {
      this.user = user;
    });

    const likesTattoo = this.apiService
      .getLikesOnTattoo(this.tattooId)
      .subscribe((likes) => {
        this.isTattooLikedByUser = Object.values(likes).some((like) =>
          like._ownerId === this.userService.user?._id
            ? (this.isTattooLikedByUser = true)
            : (this.isTattooLikedByUser = false)
        );
      });

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

    this.apiService.getCommentsById(this.tattooId).subscribe({
      next: (comments) => {
        this.comments = comments;
      },
      error: (err) => {
        console.error('Error loading comments:', err);
      },
    });
  }

  like(id: string) {
    this.apiService.getLikesOnTattoo(id).subscribe((likes) => {
      this.isTattooLikedByUser = Object.values(likes).some(
        (like) => like._ownerId === this.userService.user?._id
      );

      if (this.isTattooLikedByUser) {
        return;
      } else {
        this.apiService.likeTattoo(id).subscribe(() => {
          this.apiService.getLikesOnTattoo(id).subscribe((likes) => {
            this.likes = Object.keys(likes).length;
          });
        });
        this.isTattooLikedByUser = true;
      }
    });
  }

  delete() {
    const id = this.route.snapshot.params['tattooId'];

    const confirmation = confirm(`Do you want to delete this tattoo?`);
    if (!confirmation) {
      return;
    }

    this.apiService.deleteTattoo(id).subscribe(() => {
      this.router.navigate(['/tattoos']);
    });
  }

  addCommentToggle() {
    this.isCreatingComment = !this.isCreatingComment;
  }

  addComment(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const id = this.route.snapshot.params['tattooId'];

    this.apiService.createComment(id, form.value).subscribe(() => {
      this.apiService.getCommentsById(id).subscribe((comments) => {
        this.comments = comments;
      });
      this.addCommentToggle();
    });
  }

  deleteComment(commentId: string) {
    const confirmation = confirm(`Do you want to delete this comment?`);
    if (!confirmation) {
      return;
    }

    this.apiService.deleteComment(commentId).subscribe(() => {
      this.apiService.getCommentsById(this.tattooId).subscribe((comments) => {
        this.comments = comments;
      });
    });
  }
}
