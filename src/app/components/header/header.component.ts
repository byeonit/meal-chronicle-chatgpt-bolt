import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <mat-toolbar color="primary" class="header">
      <div class="header-content">
        <div class="logo-section">
          <mat-icon>restaurant_menu</mat-icon>
          <a routerLink="/" class="logo-text">MealChronicle</a>
        </div>
        
        <nav class="nav-links">
          <a mat-button routerLink="/recipes" routerLinkActive="active">
            <mat-icon>book</mat-icon>
            Recipes
          </a>
          <a mat-button routerLink="/favorites" routerLinkActive="active">
            <mat-icon>favorite</mat-icon>
            Favorites
          </a>
        </nav>
      </div>
    </mat-toolbar>
  `,
  styles: [`
    .header {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
    }

    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 16px;
    }

    .logo-section {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .logo-text {
      font-size: 1.5rem;
      font-weight: 500;
      text-decoration: none;
      color: white;
    }

    .nav-links {
      display: flex;
      gap: 16px;
    }

    .nav-links a {
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .active {
      background-color: rgba(255, 255, 255, 0.1);
    }

    @media (max-width: 600px) {
      .logo-text {
        font-size: 1.2rem;
      }

      .nav-links {
        gap: 8px;
      }

      .nav-links a {
        padding: 0 8px;
      }
    }
  `]
})
export class HeaderComponent {}