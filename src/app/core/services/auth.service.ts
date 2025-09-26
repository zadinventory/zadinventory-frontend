import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { LoginRequest } from '../../shared/models/login-request';
import { LoginResponse } from '../../shared/models/login-response';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);

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

      localStorage.setItem('token', fakeResponse.token);
      localStorage.setItem('usuario', JSON.stringify(fakeResponse.usuario));

      return of(fakeResponse);
    } else {
      return throwError(() => ({
        error: { message: 'Credenciais inválidas' },
      }));
    }
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLogado(): boolean {
    return !!this.getToken();
  }
  fakeLogin(email: string) {
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
