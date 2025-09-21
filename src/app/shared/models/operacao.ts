export interface Operacao {
  id?: number;  // <-- opcional
  tipo: 'ENTRADA' | 'SAIDA';
  valor: number;
  data: string;
  descricao: string;
}
