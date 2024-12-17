import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../environments/environment.development';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

import { ErrorMessagesService } from './error-messages/error-messages.service';

const API = '/api';
const { apiUrl } = environment;

export const appInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.startsWith(API)) {
    req = req.clone({
      url: req.url.replace(API, apiUrl),
    });
  }

  const token = localStorage.getItem('X-Authorization');
  if (token) {
    req = req.clone({
      setHeaders: {
        'X-Authorization': token,
      },
    });
  }

  const errorService = inject(ErrorMessagesService);
  const router = inject(Router);

  return next(req)
  .pipe(
    catchError((err) => {
      if (err.status === 401) {
        router.navigate(['/login']);
      } else if (err.status === 403){
        localStorage.removeItem('X-Authorization');
        errorService.setError(err);
        router.navigate(['/error']);
      } else if (err.status === 404){
        errorService.setError(err);
        router.navigate(['/404']);
      }
       else {
        errorService.setError(err);
        router.navigate(['/error']);
      }

      return throwError(() => err);
    })
  );
};