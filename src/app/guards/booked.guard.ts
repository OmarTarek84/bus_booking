import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { RouteService } from '../services/routes.service';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class BookedGuard implements CanActivate {
    constructor(private routeService: RouteService, private router: Router) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.routeService.getIsBooked()) {
            return true;
        } else {
            this.router.navigate(['/']);
            return false;
        }
    }
}
