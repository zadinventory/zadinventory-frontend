// src/app/shared/models/operacao.ts
import { Produto } from './produto';
import { Usuario } from './usuario';

export interface Operacao {
  id: number;  // ← MUDADO: agora é obrigatório (não opcional)
  situacao: 'REALIZADA' | 'CANCELADA' | 'SEPARADA';
  diaOperacao: string;
  quantidade: number;
  valorTotal: number;
  produto: Produto;    // ← MUDADO: não é mais opcional
  usuario: Usuario;    // ← MUDADO: não é mais opcional
}