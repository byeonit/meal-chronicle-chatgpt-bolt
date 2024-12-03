import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RecipeService } from '../../../../core/services/recipe.service';
import { DummyRecipe } from '../../../../core/models/recipe.model';

@Component({
  selector: 'app-firebase-test-recipe',
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
          <mat-card-title>Firebase Recipe Test</mat-card-title>
          <mat-card-subtitle>Test fetching dummy recipes from Firestore</mat-card-subtitle>
        </mat-card-header>

        <mat-card-content>
          <button 
            mat-raised-button 
            color="primary" 
            (click)="fetchDummyRecipe()"
            [disabled]="loading"
          >
            <mat-icon>restaurant_menu</mat-icon>
            Fetch Dummy Recipe from Firebase
          </button>

          <div *ngIf="loading" class="loading-container">
            <mat-spinner diameter="40"></mat-spinner>
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
                <li *ngFor="let step of recipe.instructions">{{ step }}</li>
              </ol>
            </div>

            <mat-divider></mat-divider>

            <div class="recipe-metadata">
              <p><strong>Meal Type:</strong> {{ recipe.mealType }}</p>
              <p><strong>Preparation Time:</strong> {{ recipe.time }} minutes</p>
              <p><strong>Skill Level:</strong> {{ recipe.skillLevel.join(', ') }}</p>
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
      justify-content: center;
      margin: 2rem 0;
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

    .recipe-metadata {
      margin-top: 1.5rem;
      
      p {
        margin-bottom: 0.5rem;
        color: var(--text-secondary);
      }
    }

    mat-icon {
      margin-right: 0.5rem;
    }
  `]
})
export class FirebaseTestRecipeComponent {
  recipe: DummyRecipe | null = null;
  loading = false;

  constructor(
    private recipeService: RecipeService,
    private snackBar: MatSnackBar
  ) {}

  fetchDummyRecipe(): void {
    this.loading = true;
    this.recipe = null;

    this.recipeService.getDummyRecipe().subscribe({
      next: (recipe) => {
        this.recipe = recipe;
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        this.snackBar.open(
          'Error fetching recipe. Please try again.',
          'Close',
          { duration: 5000 }
        );
        console.error('Error fetching dummy recipe:', error);
      }
    });
  }
}