import { Component} from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../user.service';
import { TattooListComponent } from '../tattoo-list/tattoo-list.component';
import { HomeComponent } from '../home/home.component';


@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterLink, TattooListComponent, HomeComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent {


  get isLoggedIn(): boolean {
    return this.userService.isLogged;
  }

  constructor(private userService: UserService) {}
}
