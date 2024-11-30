import { Component, OnInit } from '@angular/core';
import { Tattoo } from '../../types/tattoo';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../api.service';
import { HomeComponent } from '../../home/home.component';


@Component({
  selector: 'app-current-tattoo',
  standalone: true,
  imports: [HomeComponent],
  templateUrl: './current-tattoo.component.html',
  styleUrl: './current-tattoo.component.css',
})
export class CurrentTattooComponent implements OnInit {
  tattoo = {} as Tattoo;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    // private userService: UserService
  ) {}

  // get isLoggedIn(): boolean {
  //   return this.userService.isLogged;
  // }

  // get firstName(): string {
  //   return this.userService.user?.firstName || '';
  // }

  ngOnInit(): void {

    
    const id = this.route.snapshot.params['tattoId'];

    this.apiService.getSingleTattoo(id).subscribe((tattoo) => {
      this.tattoo = tattoo;
    });
  }
}
