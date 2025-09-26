import { inject, Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { LoginRequest } from '../../shared/models/login-request';
import { LoginResponse } from '../../shared/models/login-response';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  login(req: LoginRequest): Observable<LoginResponse> {
    if (req.email === 'admin@teste.com' && req.senha === '123') {
      const fakeResponse: LoginResponse = {
        token: 'fake-jwt-token',
        usuario: {
          id: 1,
          nome: 'Administrador',
          email: req.email,
          senha: req.senha,
          tipoUsuario: 'GERENTE',
        },
      };

      if (this.isBrowser) {
        localStorage.setItem('token', fakeResponse.token);
        localStorage.setItem('usuario', JSON.stringify(fakeResponse.usuario));
      }

      return of(fakeResponse);
    } else {
      return throwError(() => ({
        error: { message: 'Credenciais inválidas' },
      }));
    }
  }

  logout() {
    if (this.isBrowser) {
      localStorage.removeItem('token');
      localStorage.removeItem('usuario');
    }
  }

  getToken(): string | null {
    if (this.isBrowser) {
      return localStorage.getItem('token');
    }
    return null;
  }

  isLogado(): boolean {
    return !!this.getToken();
  }

  fakeLogin(email: string) {
    if (this.isBrowser) {
      localStorage.setItem('token', 'fake-jwt-token');
      localStorage.setItem(
        'usuario',
        JSON.stringify({
          id: 1,
          nome: 'Administrador',
          email,
          tipoUsuario: 'GERENTE',
        })
      );
    }
  }
}