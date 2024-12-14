import { ValidatorFn } from '@angular/forms';

export function priceValidator(): ValidatorFn {
  
    const regex = /\d+\s+BGN/;
    
    

    return (control) => {
        const isInvalid = control.value === '' || regex.test(control.value);
        return isInvalid ? null : { priceValidator: true };
    }
}
