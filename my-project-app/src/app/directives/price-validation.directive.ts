import { Directive } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { priceValidator } from '../utils/price.validator';



@Directive({
  selector: '[appPriceValidation]',
  standalone: true,
  providers: [
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: PriceValidationDirective,
    },
  ],
})
export class PriceValidationDirective implements Validator {
  constructor() {}

  validate(control: AbstractControl): ValidationErrors | null {

    const validatorFn = priceValidator();
    return validatorFn(control);

  }
}