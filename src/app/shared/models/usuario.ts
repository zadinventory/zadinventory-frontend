export interface Usuario {
  id?: number;  // <-- opcional
  nome: string;
  email: string;
  senha: string;
  tipoUsuario: 'FUNCIONARIO' | 'GERENTE';
}

