import { Component } from '@angular/core';
import { ApiService } from '../../api.service';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-tattoo',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-tattoo.component.html',
  styleUrl: './add-tattoo.component.css',
})
export class AddTattooComponent {
  constructor(private apiService: ApiService, private router: Router) {}

  addTattoo(form: NgForm) {
    if (form.invalid) {
      return;
    }
    
    
   
    
    const { ownerName, type, description, img } = form.value;
   
    

    this.apiService.createTattoo(ownerName, type, description, img).subscribe(() => {
      this.router.navigate(['/tattoos']);
    });
  }
}
