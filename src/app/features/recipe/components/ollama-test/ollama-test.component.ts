import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { OllamaRecipeService } from '../../../../core/services/ollama/ollama-recipe.service';
import { AlternativeOllamaRecipeResponse, OllamaRecipeResponse } from '../../../../core/models/ollama-recipe.model';

@Component({
  selector: 'app-ollama-test',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  template: `
    <div class="container">
      <mat-card appearance="outlined">
        <mat-card-header>
          <mat-card-title>Ollama Recipe Generator</mat-card-title>
          <mat-card-subtitle>Generate recipes using Ollama AI</mat-card-subtitle>
        </mat-card-header>

        <mat-card-content>

          <button 
            mat-raised-button 
            color="primary" 
            (click)="generateRecipe()"
            [disabled]="loading"
          >
            <mat-icon>auto_awesome</mat-icon>
            Generate Recipe with Ollama
          </button>

          <div *ngIf="loading" class="loading-container">
            <mat-spinner diameter="40"></mat-spinner>
            <p class="loading-text">Generating recipe...</p>
          </div>

          <div *ngIf="recipe && !loading" class="recipe-content">

            <div class="recipe-section">
              <h3>Recettes:</h3>            
              <h2>{{ recipe.output.title }}</h2>
            </div>
            
            <mat-divider></mat-divider>

            <div class="recipe-section">
              <h3>Ingredients:</h3>
              <ul>
                <li *ngFor="let rcp of recipe.output.ingredients ">{{ rcp }}</li>
              </ul>
            </div>

            <mat-divider></mat-divider>

            <div class="recipe-section">
              <h3>Instructions:</h3>
              <ol>
                <li *ngFor="let step of recipe.output.instructions ">{{ step }}</li>
              </ol>
            </div>
          </div>
  
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .container {
      max-width: 800px;
      margin: 2rem auto;
      padding: 0 1rem;
    }

    button {
      margin-bottom: 2rem;
    }

    .loading-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 2rem 0;
      gap: 1rem;
    }

    .loading-text {
      color: var(--text-secondary);
      font-size: 0.9rem;
    }

    .recipe-content {
      margin-top: 2rem;
    }

    .recipe-section {
      margin: 1.5rem 0;
    }

    h2 {
      color: var(--text-primary);
      font-size: 1.5rem;
      margin-bottom: 1rem;
    }

    h3 {
      color: var(--text-secondary);
      font-size: 1.1rem;
      margin-bottom: 0.5rem;
    }

    ol {
      padding-left: 1.5rem;
    }

    li {
      margin-bottom: 0.5rem;
      line-height: 1.5;
    }

    mat-icon {
      margin-right: 0.5rem;
    }
  `]
})
export class OllamaTestComponent {
  //recipe: OllamaRecipeResponse | null = null;
  recipe: AlternativeOllamaRecipeResponse | null = null;
  loading = false;

  constructor(
    private ollamaService: OllamaRecipeService,
    private snackBar: MatSnackBar
  ) {}

  generateRecipe(): void {
    this.loading = true;
    this.recipe = null;

    const request = {
      ingredients: ['chicken', 'rice', 'vegetables'],
      mealType: 'dinner',
      skillLevel: 'intermediate'
    };

    this.ollamaService.generateRecipe(request).subscribe({
      next: (response) => {
        this.recipe = response;
        this.loading = false;

      },
      error: (error) => {
        this.loading = false;
        this.snackBar.open(
          error.message || 'Error generating recipe. Please try again.',
          'Close',
          { duration: 5000 }
        );
      }
    });

  }
}
