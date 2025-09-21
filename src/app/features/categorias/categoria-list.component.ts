import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { CategoriasService } from '../../../app/core/services/categorias.service';
import { Categoria } from '../../../app/shared/models/categoria';

@Component({
  selector: 'app-categoria-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './categoria-list.component.html',
  styleUrls: ['./categoria-list.component.scss'],
})
export class CategoriaListComponent implements OnInit {
  categorias: Categoria[] = [];
  categoriaSelecionada: Categoria | null = null;

  constructor(private categoriasService: CategoriasService) {}

  ngOnInit(): void {
    this.carregarCategorias();
  }

  carregarCategorias(): void {
    this.categoriasService.listar().subscribe({
      next: (data: Categoria[]) => (this.categorias = data),
      error: (err: any) => console.error('Erro ao carregar categorias', err),
    });
  }

  novaCategoria(): void {
    this.categoriaSelecionada = {nome: '', descricao: '' };
  }

  editar(categoria: Categoria): void {
    this.categoriaSelecionada = { ...categoria };
  }

  excluir(categoria: Categoria): void {
    Swal.fire({
      title: 'Tem certeza?',
      text: `Excluir categoria "${categoria.nome}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoriasService.excluir(categoria.id!).subscribe({
          next: () => {
            Swal.fire(
              'Excluída!',
              'Categoria removida com sucesso.',
              'success'
            );
            this.carregarCategorias();
          },
          error: () =>
            Swal.fire('Erro', 'Não foi possível excluir a categoria', 'error'),
        });
      }
    });
  }

  salvar(): void {
    if (!this.categoriaSelecionada) return;

    const req = this.categoriaSelecionada.id
      ? this.categoriasService.atualizar(
          this.categoriaSelecionada.id!,
          this.categoriaSelecionada
        )
      : this.categoriasService.criar(this.categoriaSelecionada);

    req.subscribe({
      next: () => {
        Swal.fire('Sucesso', 'Categoria salva com sucesso!', 'success');
        this.carregarCategorias();
        this.categoriaSelecionada = null;
      },
      error: () =>
        Swal.fire('Erro', 'Não foi possível salvar a categoria', 'error'),
    });
  }

  fecharModal(): void {
    this.categoriaSelecionada = null;
  }
}
