import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

import { ApiService } from '../../api.service';
import { ActivatedRoute, Router } from '@angular/router';

import { Tattoo } from '../../types/tattoo';

@Component({
  selector: 'app-edit-tattoo',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-tattoo.component.html',
  styleUrl: './edit-tattoo.component.css',
})
export class EditTattooComponent {
  tattoo = {} as Tattoo;

  @ViewChild('editForm') editForm: NgForm | undefined;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const tattoId = this.route.snapshot.params['tattoId'];

    this.apiService.getSingleTattoo(tattoId).subscribe((tattoo) => {
      this.tattoo = tattoo;

      this.editForm?.form.controls['type'].setValue(this.tattoo.type);
      this.editForm?.form.controls['img'].setValue(this.tattoo.img);
      this.editForm?.form.controls['description'].setValue(
        this.tattoo.description
      );
    });
  }

  edit() {
    const { type, img, description } = this.editForm?.value;

    const tattoId = this.tattoo._id;

    this.apiService
      .updateTattoo(tattoId, type, img, description)
      .subscribe((res) => {
        console.log(res);
        this.router.navigate(['/tattoos']);
      });
  }

  onCancel(event: Event) {
    event.preventDefault();
    history.back();
  }
}
