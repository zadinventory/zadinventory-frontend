import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdutosService } from '../../../core/services/produtos.service';
import { Produto } from '../../../shared/models/produto';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-produto-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './produto-list.component.html',
  styleUrls: ['./produto-list.component.scss'],
})
export class ProdutoListComponent implements OnInit {
  produtos: Produto[] = [];
  produtoSelecionado: Produto | null = null;

  constructor(private produtoService: ProdutosService) {}

  ngOnInit(): void {
    this.carregarProdutos();
  }

  carregarProdutos(): void {
    this.produtoService.listar().subscribe({
      next: (data) => (this.produtos = data),
      error: (err) => console.error('Erro ao carregar produtos', err),
    });
  }

novoProduto(): void {
  this.produtoSelecionado = {
    nome: '',
    descricao: '',
    quantidade: 0,
    preco: 0,
    categoria: { id: 1 }, // você pode setar um default
    usuario: { id: 1 },   // ou pegar do usuário logado
    tags: []
  };
}


  editar(produto: Produto): void {
    this.produtoSelecionado = { ...produto };
  }

  excluir(produto: Produto): void {
    if (!produto.id) {
      Swal.fire('Erro', 'Produto sem ID válido.', 'error');
      return;
    }

    Swal.fire({
      title: 'Tem certeza?',
      text: `Excluir "${produto.nome}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.produtoService.excluir(produto.id!).subscribe({
          next: () => {
            Swal.fire('Excluído!', 'Produto removido com sucesso.', 'success');
            this.carregarProdutos();
          },
          error: () => Swal.fire('Erro', 'Não foi possível excluir', 'error'),
        });
      }
    });
  }

  salvar(): void {
    if (!this.produtoSelecionado) return;

    const req = this.produtoSelecionado.id
      ? this.produtoService.atualizar(
          this.produtoSelecionado.id,
          this.produtoSelecionado
        )
      : this.produtoService.criar(this.produtoSelecionado);

    req.subscribe({
      next: () => {
        Swal.fire('Sucesso', 'Produto salvo com sucesso!', 'success');
        this.carregarProdutos();
        this.fecharModal();
      },
      error: () => Swal.fire('Erro', 'Não foi possível salvar', 'error'),
    });
  }

  fecharModal(): void {
    this.produtoSelecionado = null;
  }
}