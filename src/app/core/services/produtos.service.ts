import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produto } from '../../shared/models/produto';

@Injectable({
  providedIn: 'root',
})
export class ProdutosService {
  private apiUrl = 'http://localhost:8080/api/produtos';

  // Headers para garantir o Content-Type correto
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {}

  // Listar todos os produtos
  listar(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.apiUrl);
  }

  // Buscar produto por ID
  obterPorId(id: number): Observable<Produto> {
    return this.http.get<Produto>(`${this.apiUrl}/${id}`);
  }

  // Criar novo produto - CORRIGIDO com headers
  criar(produto: Produto): Observable<Produto> {
    return this.http.post<Produto>(this.apiUrl, produto, this.httpOptions);
  }

  // Atualizar produto existente - CORRIGIDO com headers
  atualizar(id: number, produto: Produto): Observable<Produto> {
    return this.http.put<Produto>(`${this.apiUrl}/${id}`, produto, this.httpOptions);
  }

  // Excluir produto
  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}