import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { OperacoesService } from '../../../core/services/operacoes.service';
import { Operacao } from '../../../shared/models/operacao';

@Component({
  selector: 'app-operacao-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './operacao-list.component.html',
  styleUrls: ['./operacao-list.component.scss'],
})
export class OperacaoListComponent implements OnInit {
  operacoes: Operacao[] = [];
  operacaoSelecionada: Operacao | null = null;

  constructor(private operacoesService: OperacoesService) {}

  ngOnInit(): void {
    this.carregarOperacoes();
  }

  carregarOperacoes(): void {
    this.operacoesService.listar().subscribe({
      next: (data) => (this.operacoes = data),
      error: (err) => console.error('Erro ao carregar operações', err),
    });
  }

  novaOperacao(): void {
    this.operacaoSelecionada = {
      id: 0,
      tipo: 'ENTRADA', // ou SAIDA, valor inicial
      valor: 0,
      data: new Date().toISOString().split('T')[0], // data no formato yyyy-MM-dd
      descricao: '',
    };
  }

  editar(operacao: Operacao): void {
    this.operacaoSelecionada = { ...operacao };
  }

  excluir(operacao: Operacao): void {
    Swal.fire({
      title: 'Tem certeza?',
      text: `Excluir operação "${operacao.descricao}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.operacoesService.excluir(operacao.id!).subscribe({
          next: () => {
            Swal.fire('Excluída!', 'Operação removida com sucesso.', 'success');
            this.carregarOperacoes();
          },
          error: () =>
            Swal.fire('Erro', 'Não foi possível excluir a operação', 'error'),
        });
      }
    });
  }

  salvar(): void {
    if (!this.operacaoSelecionada) return;

    const req = this.operacaoSelecionada.id
      ? this.operacoesService.atualizar(
          this.operacaoSelecionada.id!,
          this.operacaoSelecionada
        )
      : this.operacoesService.criar(this.operacaoSelecionada);

    req.subscribe({
      next: () => {
        Swal.fire('Sucesso', 'Operação salva com sucesso!', 'success');
        this.carregarOperacoes();
        this.operacaoSelecionada = null;
      },
      error: () =>
        Swal.fire('Erro', 'Não foi possível salvar a operação', 'error'),
    });
  }

  fecharModal(): void {
    this.operacaoSelecionada = null;
  }
}
