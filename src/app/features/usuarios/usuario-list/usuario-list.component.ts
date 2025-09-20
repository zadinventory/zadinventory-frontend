import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuariosService } from '../../../core/services/usuarios.service';
import { Usuario } from '../../../shared/models/usuario';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.scss'],
})
export class UsuarioListComponent implements OnInit {
  usuarios: Usuario[] = [];
  usuarioSelecionado: Usuario | null = null;

  constructor(private usuarioService: UsuariosService) {}

  ngOnInit(): void {
    this.carregarUsuarios();
  }

  carregarUsuarios(): void {
    this.usuarioService.listar().subscribe({
      next: (data) => (this.usuarios = data),
      error: (err) => console.error('Erro ao carregar usuários', err),
    });
  }

  novoUsuario(): void {
    this.usuarioSelecionado = {
      id: 0,
      nome: '',
      email: '',
      senha: '',
      role: 'FUNCIONARIO'
    };
  }

  editar(usuario: Usuario): void {
    this.usuarioSelecionado = { ...usuario };
  }

  excluir(usuario: Usuario): void {
    if (!usuario.id) {
      Swal.fire('Erro', 'Usuário sem ID válido.', 'error');
      return;
    }

    Swal.fire({
      title: 'Tem certeza?',
      text: `Excluir "${usuario.nome}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.excluir(usuario.id!).subscribe({
          next: () => {
            Swal.fire('Excluído!', 'Usuário removido com sucesso.', 'success');
            this.carregarUsuarios();
          },
          error: () => Swal.fire('Erro', 'Não foi possível excluir', 'error'),
        });
      }
    });
  }

  salvar(): void {
    if (!this.usuarioSelecionado) return;

    const req = this.usuarioSelecionado.id
      ? this.usuarioService.atualizar(
          this.usuarioSelecionado.id,
          this.usuarioSelecionado
        )
      : this.usuarioService.criar(this.usuarioSelecionado);

    req.subscribe({
      next: () => {
        Swal.fire('Sucesso', 'Usuário salvo com sucesso!', 'success');
        this.carregarUsuarios();
        this.usuarioSelecionado = null;
      },
      error: () => Swal.fire('Erro', 'Não foi possível salvar', 'error'),
    });
  }

  fecharModal(): void {
    this.usuarioSelecionado = null;
  }
}
