import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Venda } from '../../shared/models/venda';

@Injectable({ providedIn: 'root' })
export class OperacoesService {
  private apiUrl = 'http://localhost:8080/api/operacoes';

  constructor(private http: HttpClient) {}

  listar(): Observable<Venda[]> {
    return this.http.get<Venda[]>(this.apiUrl);
  }

  obterPorId(id: number): Observable<Venda> {
    return this.http.get<Venda>(`${this.apiUrl}/${id}`);
  }

  criar(venda: Venda): Observable<Venda> {
    return this.http.post<Venda>(this.apiUrl, venda);
  }

  atualizar(id: number, venda: Venda): Observable<Venda> {
    return this.http.put<Venda>(`${this.apiUrl}/${id}`, venda);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
