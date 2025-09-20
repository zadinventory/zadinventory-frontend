import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Operacao } from '../../shared/models/operacao';

@Injectable({
  providedIn: 'root',
})
export class OperacoesService {
  private apiUrl = 'http://localhost:8080/api/operacoes';

  constructor(private http: HttpClient) {}

  listar(): Observable<Operacao[]> {
    return this.http.get<Operacao[]>(this.apiUrl);
  }

  obterPorId(id: number): Observable<Operacao> {
    return this.http.get<Operacao>(`${this.apiUrl}/${id}`);
  }

  criar(operacao: Operacao): Observable<Operacao> {
    return this.http.post<Operacao>(this.apiUrl, operacao);
  }

  atualizar(id: number, operacao: Operacao): Observable<Operacao> {
    return this.http.put<Operacao>(`${this.apiUrl}/${id}`, operacao);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
