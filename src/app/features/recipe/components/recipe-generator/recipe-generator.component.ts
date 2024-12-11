import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeFormComponent } from './recipe-form/recipe-form.component';
import { MatCardModule } from '@angular/material/card';
import { RecipeService } from '../../../../core/services/recipe.service';
import { Recipe } from '../../../../core/models/recipe.model';
import { RecipeFilters } from '../../../../core/models/recipe-filters.model';
import { OllamaRecipeService } from '../../../../core/services/ollama/ollama-recipe.service';
import {
  AlternativeOllamaRecipeResponse,
  ListOfAlternativeOllamaRecipeResponse,
} from '../../../../core/models/ollama-recipe.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RecipeGenerateComponent } from './recipe-generate/recipe-generate.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { RecipeGenerateAlternativeComponent } from './recipe-generate-alternative/recipe-generate-alternative.component';
import { RecipeFeedbackComponent } from "./recipe-feedback/recipe-feedback.component";

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
    RecipeGenerateAlternativeComponent,
    RecipeFeedbackComponent
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

        <app-recipe-generate [recipe]="recipe" *ngIf="recipe && !loading" />
      </mat-card-content>
      <mat-card-footer *ngIf="recipe && !loading">
        <!-- Generate Variations -->
        <button mat-raised-button color="accent" (click)="generateVariations()">
          Generate Variations
        </button>
      </mat-card-footer>
    </mat-card>
    
    <app-recipe-feedback [recipe]="recipe" *ngIf="recipe && !loading"/>

    <div *ngIf="loadingVariations" class="loading-container">
      <mat-spinner diameter="40"></mat-spinner>
      <p class="loading-text">Generating variations...</p>
    </div>

    <app-recipe-generate-alternative [recipes]="listOfAlternativeRecipe"/>
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

  listOfAlternativeRecipe: ListOfAlternativeOllamaRecipeResponse | null = null;
  loadingVariations = false;

  constructor(
    private snackBar: MatSnackBar,
    private ollamaService: OllamaRecipeService,
  ) {}

  onGenerate(filters: RecipeFilters) {
    this.loading = true;
    this.recipe = null;

    this.ollamaService.generateRecipe(filters).subscribe({
      next: (response) => {
        this.recipe = response;
        console.log('this.recipe = ' + this.recipe);
      },
      error: (error) => {
        this.loading = false;
        this.snackBar.open(
          error.message || 'Error generating recipe. Please try again.',
          'Close',
          { duration: 5000 },
        );
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  generateVariations(): void {
    this.loadingVariations = true;
    this.listOfAlternativeRecipe = null;

    this.ollamaService
      .generateAlternativeRecipe(this.recipe?.output)
      .subscribe({
        next: (response) => {
          this.listOfAlternativeRecipe = response;
          this.loadingVariations = false;
        },
        error: (error) => {
          this.loadingVariations = false;
          this.snackBar.open(
            error.message || 'Error generating recipe. Please try again.',
            'Close',
            { duration: 5000 },
          );
        },
      });
  }
}
