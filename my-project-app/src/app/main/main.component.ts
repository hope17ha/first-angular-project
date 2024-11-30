import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
// import { ApiService } from '../api.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent implements OnInit {
  // constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    // this.apiService.getTattoos().subscribe((t) => {
    //   console.log(t);
    // });
  }
}
