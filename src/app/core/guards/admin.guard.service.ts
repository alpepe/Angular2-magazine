import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivate,
  CanLoad,
  Router,
  Route
} from '@angular/router';

import { AuthenticationService } from '../services/auth.service';

@Injectable()
export class AdminGuard implements CanActivate, CanLoad {
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.checkAdmin(state.url);
  }

  canLoad(route: Route): boolean {
    return this.checkAdmin(route.path);
  }

  checkAdmin(url: string): boolean {
    if (this.authService.isAdminRole()) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
