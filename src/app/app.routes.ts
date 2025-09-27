// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout.component';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  // Rota raiz redireciona para login
  { 
    path: '', 
    redirectTo: 'login', 
    pathMatch: 'full' 
  },

  // Rota de login (pública)
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },

  // Rotas protegidas
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard], // Usa o AuthGuard corrigido para SSR
    children: [
      {
        path: 'produtos',
        loadComponent: () =>
          import('./features/produtos/produto-list/produto-list.component').then(
            (m) => m.ProdutoListComponent
          ),
      },
      {
        path: 'usuarios',
        loadComponent: () =>
          import('./features/usuarios/usuario-list/usuario-list.component').then(
            (m) => m.UsuarioListComponent
          ),
      },
      {
        path: 'operacoes',
        loadComponent: () =>
          import('./features/operacoes/operacao-list/operacao-list.component').then(
            (m) => m.OperacaoListComponent
          ),
      },
      {
        path: 'categorias',
        loadComponent: () =>
          import('./features/categorias/categoria-list.component').then(
            (m) => m.CategoriaListComponent
          ),
      },
      {
        path: 'tags',
        loadComponent: () =>
          import('./features/tags/tag-list.component').then(
            (m) => m.TagListComponent
          ),
      },

      // Redirecionamento interno para produtos (apenas quando autenticado)
      { 
        path: '', 
        redirectTo: 'produtos', 
        pathMatch: 'full' 
      },
    ],
  },

  // Rota wildcard - qualquer rota não encontrada vai para login
  { 
    path: '**', 
    redirectTo: 'login' 
  },
];