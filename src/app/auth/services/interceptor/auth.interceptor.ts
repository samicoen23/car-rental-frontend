import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../storage/storage.service';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const token = StorageService.getToken();
    const router = inject(Router); // Inject router to redirect

    let authReq = req;
    if (token) {
        authReq = req.clone({
            setHeaders: { Authorization: `Bearer ${token}` }
        });
    }

    return next(authReq).pipe(
        catchError((error: HttpErrorResponse) => {
            // If session expired (401) or permissions changed (403)
            if (error.status === 401 || error.status === 403) {
                StorageService.logout(); // Clear the local storage
                router.navigateByUrl('/login');
            }
            return throwError(() => error);
        })
    );
};
