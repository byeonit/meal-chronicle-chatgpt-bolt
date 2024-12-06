import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeFormComponent } from './recipe-form/recipe-form.component';
import { MatCardModule } from '@angular/material/card';
import { RecipeService } from '../../../../core/services/recipe.service';
import { Recipe } from '../../../../core/models/recipe.model';
import { RecipeFilters } from '../../../../core/models/recipe-filters.model';
import { OllamaRecipeService } from '../../../../core/services/ollama/ollama-recipe.service';
import { AlternativeOllamaRecipeResponse } from '../../../../core/models/ollama-recipe.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RecipeGenerateComponent } from './recipe-generate/recipe-generate.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-recipe-generator',
  standalone: true,
  imports: [
    CommonModule,
    RecipeFormComponent,
    MatCardModule,
    RecipeGenerateComponent,
    MatProgressSpinnerModule,
    MatDividerModule,
  ],
  template: `
    <mat-card appearance="outlined" class="recipe-generator-card">
      <mat-card-header>
        <mat-card-title>Recipe Generator</mat-card-title>
        <mat-card-subtitle
          >Create your perfect recipe by selecting ingredients and
          preferences</mat-card-subtitle
        >
      </mat-card-header>
      <mat-card-content>
        <app-recipe-form (generate)="onGenerate($event)"></app-recipe-form>
        <br />
        <mat-divider></mat-divider>

        <div *ngIf="loading" class="loading-container">
          <mat-spinner diameter="40"></mat-spinner>
          <p class="loading-text">Generating variations...</p>
        </div>

        <app-recipe-generate
          [recipe]="recipe"
          *ngIf="recipe && !loading"
        ></app-recipe-generate>
      </mat-card-content>
    </mat-card>
  `,
  styles: [
    `
      .recipe-generator-card {
        max-width: 800px;
        margin: 0 auto;

        mat-card-header {
          margin-bottom: var(--spacing-lg);
        }

        mat-card-title {
          font-size: var(--font-size-xl);
          margin-bottom: var(--spacing-xs);
        }

        mat-card-subtitle {
          color: var(--text-secondary);
        }
      }
      .loading-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 2rem 0;
        gap: 1rem;
      }
    `,
  ],
})
export class RecipeGeneratorComponent {
  loading = false;
  recipe: AlternativeOllamaRecipeResponse | null = null;

  constructor(
    private recipeService: RecipeService,
    private snackBar: MatSnackBar,
    private ollamaService: OllamaRecipeService,
  ) {}

  onGenerate(filters: RecipeFilters) {
    this.loading = true;
    this.recipe = null;
    /*
      constructor(private recipeService: RecipeService) {}

  onGenerate(filters: RecipeFilters) {
    console.log('Filters passed to getRecipes:', filters);

    this.recipeService.getRecipes(filters).subscribe({
      next: (recipes) => {
        console.log('Filtered recipes:', recipes);
        if (recipes.length === 0) {
          console.log('No recipes found for the given filters.');
        }
      },
      error: (error) => {
        console.error('Error fetching recipes:', error);
      },
    });
  }
    */
    /*
    this.recipeService.getRecipes(filters).subscribe({
      next: (recipes) => {
        console.log('Filtered recipes:', recipes);
        if (recipes.length === 0) {
          console.log('No recipes found for the given filters.');
        }
      },
      error: (error) => {
        console.error('Error fetching recipes:', error);
      },
    });
    */
    this.ollamaService.generateRecipe(filters).subscribe({
      next: (response) => {
        this.recipe = response;
        console.log('this.recipe = ' + this.recipe);
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        this.snackBar.open(
          error.message || 'Error generating recipe. Please try again.',
          'Close',
          { duration: 5000 },
        );
      },
    });
  }
}
