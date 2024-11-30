import { Component, OnInit } from '@angular/core';


// import { LoaderComponent } from '../../shared/loader/loader.component';
import { RouterLink } from '@angular/router';
import { Tattoo } from '../types/tattoo';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-tattoo-list',
  standalone: true,
  imports: [RouterLink],
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
      
      
      // this.isLoading = false;
    });
  }
}
