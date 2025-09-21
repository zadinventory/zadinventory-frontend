export interface Produto {
  id?: number;
  nome: string;
  descricao?: string;
  quantidade: number;
  preco: number; // <-- opcional
  categoria: { id: number }; // apenas o id já basta para o back
  usuario: { id: number };   // idem
  tags?: { id: number }[];   // opcional
}
