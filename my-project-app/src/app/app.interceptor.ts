import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../environments/environment.development';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { ErrorMsgService } from './error/err-message.service';

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

  const errorMessage = inject(ErrorMsgService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((err) => {
      if (err.status === 401) {
        localStorage.removeItem('X-Authorization');
      } else if (err.status === 403) {
        localStorage.removeItem('X-Authorization');
      } else {
        errorMessage.setError(err);
        router.navigate(['/404']);
      }
      return [err];
    })
  );
};
