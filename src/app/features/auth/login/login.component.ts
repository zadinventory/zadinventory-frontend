import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import Swal from 'sweetalert2';
import { isPlatformBrowser } from '@angular/common';

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
  private isBrowser: boolean;

  constructor(
    private authService: AuthService, 
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  onSubmit() {
    if (!this.email || !this.senha) {
      if (this.isBrowser) {
        Swal.fire('Erro', 'Preencha todos os campos!', 'error');
      }
      return;
    }

    // 🔹 login estático (validação fake)
    if (this.email === 'admin@teste.com' && this.senha === '123') {
      this.authService.fakeLogin(this.email);
      
      if (this.isBrowser) {
        Swal.fire('Bem-vindo!', 'Login realizado com sucesso!', 'success').then(
          () => {
            this.router.navigate(['/produtos']);
          }
        );
      } else {
        this.router.navigate(['/produtos']);
      }
    } else {
      if (this.isBrowser) {
        Swal.fire('Erro', 'Credenciais inválidas!', 'error');
      }
    }
  }
}