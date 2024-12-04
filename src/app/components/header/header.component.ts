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
          <mat-icon class="logo-icon">restaurant_menu</mat-icon>
          <a routerLink="/" class="logo-text">MealChronicle</a>
        </div>
        
        <nav class="nav-links">
          <a mat-button routerLink="/recipes" routerLinkActive="active" class="nav-link">
            <mat-icon>book</mat-icon>
            <span>Recipes</span>
          </a>
          <a mat-button routerLink="/firebase-test" routerLinkActive="active">
            <mat-icon>cloud</mat-icon>
            Firebase Test Cloud
          </a>
          <a mat-button routerLink="/firebase-test-recipe" routerLinkActive="active" class="nav-link">
            <mat-icon>cloud</mat-icon>
            <span>Firebase Test</span>
          </a>
          <a mat-button routerLink="/ollama-test" routerLinkActive="active" class="nav-link">
            <mat-icon>auto_awesome</mat-icon>
            <span>Ollama Test</span>
          </a>
          <a mat-button class="nav-link">
            <mat-icon>favorite</mat-icon>
            <span>Favorites</span>
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
      height: 64px;
    }

    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 var(--spacing-lg);
    }

    .logo-section {
      display: flex;
      align-items: center;
      gap: var(--spacing-sm);
    }

    .logo-icon {
      font-size: 24px;
      width: 24px;
      height: 24px;
    }

    .logo-text {
      font-size: var(--font-size-lg);
      font-weight: 500;
      text-decoration: none;
      color: white;
    }

    .nav-links {
      display: flex;
      gap: var(--spacing-sm);
    }

    .nav-link {
      display: flex;
      align-items: center;
      gap: var(--spacing-xs);
      height: 36px;
      padding: 0 var(--spacing-md);
      border-radius: var(--border-radius);
      
      mat-icon {
        margin-right: var(--spacing-xs);
      }
    }

    .active {
      background: rgba(255, 255, 255, 0.1);
    }
  `]
})
export class HeaderComponent {}