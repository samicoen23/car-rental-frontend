import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { StorageService } from '../storage/storage.service';

export const adminGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);

    if (StorageService.isAdminLoggedIn()) {
        return true;
    }

    router.navigateByUrl('/login');
    return false;
};

export const customerGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);

    if (StorageService.isCustomerLoggedIn()) {
        return true;
    }

    router.navigateByUrl('/login');
    return false;
};
