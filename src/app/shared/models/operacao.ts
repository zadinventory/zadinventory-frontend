export interface Operacao {
  id?: number;
  tipo: 'ENTRADA' | 'SAIDA';
  valor: number;
  data: string;
  descricao: string;
}
