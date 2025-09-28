// src/app/core/services/operacoes.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Operacao } from '../../shared/models/operacao';
import { OperacaoRequest } from '../../shared/models/operacao-request';

@Injectable({
  providedIn: 'root'
})
export class OperacoesService {
  private base = 'http://localhost:8080/api/operacoes';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {}

  listar(): Observable<Operacao[]> {
    return this.http.get<Operacao[]>(this.base);
  }

  obterPorId(id: number): Observable<Operacao> {
    return this.http.get<Operacao>(`${this.base}/${id}`);
  }

  criar(operacao: OperacaoRequest): Observable<Operacao> {
    return this.http.post<Operacao>(this.base, operacao, this.httpOptions);
  }

  atualizar(id: number, operacao: OperacaoRequest): Observable<Operacao> {
    // Remove o id do body para evitar duplicação
    const { id: _, ...body } = operacao;
    return this.http.put<Operacao>(`${this.base}/${id}`, body, this.httpOptions);
  }

  atualizarSituacao(id: number, situacao: string): Observable<Operacao> {
    return this.http.patch<Operacao>(
      `${this.base}/${id}/situacao?situacao=${situacao}`, 
      {}, 
      this.httpOptions
    );
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }

  totalVendas(inicio: string, fim: string): Observable<any> {
    return this.http.get(`${this.base}/total-vendas?inicio=${inicio}&fim=${fim}`);
  }

  relatorioVendasPorProduto(inicio: string, fim: string): Observable<any> {
    return this.http.get(`${this.base}/total-vendas-produto?inicio=${inicio}&fim=${fim}`);
  }
}