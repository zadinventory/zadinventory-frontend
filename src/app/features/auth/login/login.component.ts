import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import Swal from 'sweetalert2';

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

  onSubmit() {
    if (!this.email || !this.senha) {
      Swal.fire('Erro', 'Preencha todos os campos!', 'error');
      return;
    }

    // 🔹 login estático (validação fake)
    if (this.email === 'admin@teste.com' && this.senha === '123') {
      this.authService.fakeLogin(this.email); // salva no localStorage
      Swal.fire('Bem-vindo!', 'Login realizado com sucesso!', 'success').then(
        () => {
          this.router.navigate(['/produtos']);
        }
      );
    } else {
      Swal.fire('Erro', 'Credenciais inválidas!', 'error');
    }
  }
}
