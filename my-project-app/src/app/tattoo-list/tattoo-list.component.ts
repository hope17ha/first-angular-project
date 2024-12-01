import { Component, OnInit } from '@angular/core';



import { RouterLink } from '@angular/router';
import { Tattoo } from '../types/tattoo';
import { ApiService } from '../api.service';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-tattoo-list',
  standalone: true,
  imports: [RouterLink, LoaderComponent],
  templateUrl: './tattoo-list.component.html',
  styleUrl: './tattoo-list.component.css',
})
export class TattooListComponent implements OnInit {
  tattoos: Tattoo[] = [];
  isLoading = true;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getTattoos().subscribe((tattoos) => {
      this.tattoos = tattoos;
      
      
      this.isLoading = false;
    });
  }
}
