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
    <mat-toolbar color="primary">
      <div class="header-content">
        <div class="logo-section">
          <mat-icon>restaurant_menu</mat-icon>
          <a routerLink="/" class="logo-text">MealChronicle</a>
        </div>
        
        <nav>
          <a mat-button routerLink="/recipes" routerLinkActive="active">
            <mat-icon>book</mat-icon>
            Recipes
          </a>
          <a mat-button routerLink="/firebase-test" routerLinkActive="active">
            <mat-icon>cloud</mat-icon>
            Firebase Test
          </a>
          <a mat-button routerLink="/favorites" routerLinkActive="active">
            <mat-icon>favorite</mat-icon>
            Favorites
          </a>
        </nav>
      </div>
    </mat-toolbar>
  `
})
export class HeaderComponent {}