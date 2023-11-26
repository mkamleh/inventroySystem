import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AuthService } from './auth.server';

@Injectable({
  providedIn: 'root',
})
export class ManagerGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    console.log('CanActivate called');
    let userData = this.authService.getData();
    if (!userData.token) {
      this.router.navigate(['/login']);
    }
    console.log(userData);
    if (userData.roles.includes('manager')) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
