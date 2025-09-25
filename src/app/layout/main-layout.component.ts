import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, CommonModule],
  template: `
    <div class="d-flex flex-column vh-100">
      <ng-container *ngIf="isAuthenticated()">
        <app-header></app-header>
      </ng-container>

      <main class="flex-fill container mt-4">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
})
export class MainLayoutComponent {
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token'); // simples por enquanto
  }
}