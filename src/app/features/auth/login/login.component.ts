import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email = '';
  senha = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.authService.login({ email: this.email, senha: this.senha }).subscribe({
      next: () => {
        Swal.fire('Bem-vindo!', 'Login realizado com sucesso!', 'success');
        this.router.navigate(['/produtos']);
      },
      error: (err) => {
        Swal.fire(
          'Erro',
          err.error?.message || 'Credenciais inválidas',
          'error'
        );
      },
    });
  }
}
