import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private isBrowser: boolean;

  constructor(
    private router: Router,
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  canActivate(): boolean {
    // No SSR, sempre permite a navegação e deixa o cliente redirecionar
    if (!this.isBrowser) {
      return true;
    }

    if (this.authService.isLogado()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}