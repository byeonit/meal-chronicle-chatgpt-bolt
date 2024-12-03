import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { OllamaRecipeService } from '../../../../core/services/ollama/ollama-recipe.service';
import { OllamaRecipeResponse } from '../../../../core/models/ollama-recipe.model';

@Component({
  selector: 'app-ollama-test',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
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
            <h2>{{ recipe.title }}</h2>
            
            <div class="recipe-section">
              <h3>Ingredients:</h3>
              <p>{{ recipe.ingredients.join(', ') }}</p>
            </div>

            <mat-divider></mat-divider>

            <div class="recipe-section">
              <h3>Instructions:</h3>
              <ol>
                <li *ngFor="let step of recipe.instructions ">{{ step }}</li>
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
  recipe: OllamaRecipeResponse | null = null;
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
console.log("request = "+ JSON.stringify(request) )
    this.ollamaService.generateRecipe(request).subscribe({
      next: (response) => {
        console.log("next value = " + response);
        this.recipe = response;
        this.loading = false;
      },      
      complete : () => {
        console.log("Complete *** " );
      },
      error: (error) => {
        console.log("error area with " + error);
        console.log("error area with error.response = " + error.response);
        console.log("error area with error.request = " + error.request);
        console.log("error area with error.snackBar = " + error.snackBar);
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
