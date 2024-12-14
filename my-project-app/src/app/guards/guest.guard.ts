import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";

export const guestAuthGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    const router = inject(Router)

    const token = localStorage.getItem('X-Authorization');

    if (token) {
        return true
    }

    router.navigate(['/login']);
    return false;
}