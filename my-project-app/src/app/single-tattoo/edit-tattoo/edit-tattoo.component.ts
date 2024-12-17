import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

import { ApiService } from '../../api.service';
import { ActivatedRoute, Router } from '@angular/router';

import { Tattoo } from '../../types/tattoo';
import { ImageUrlValidationDirective } from '../../directives/image-validation.directive';
import { PriceValidationDirective } from '../../directives/price-validation.directive';

@Component({
  selector: 'app-edit-tattoo',
  standalone: true,
  imports: [FormsModule, ImageUrlValidationDirective, PriceValidationDirective],
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
    const tattooId = this.route.snapshot.params['tattooId'];

    this.apiService.getSingleTattoo(tattooId).subscribe((tattoo) => {
      this.tattoo = tattoo;

      this.editForm?.form.controls['type'].setValue(this.tattoo.type);
      this.editForm?.form.controls['img'].setValue(this.tattoo.img);
      this.editForm?.form.controls['description'].setValue(
        this.tattoo.description
      );
      this.editForm?.form.controls['price'].setValue(this.tattoo.price);
    });
  }

  edit() {
    const { type, img, description, price } = this.editForm?.value;

    const tattooId = this.tattoo._id;

    this.apiService
      .updateTattoo(tattooId, type, img, description, price)
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
