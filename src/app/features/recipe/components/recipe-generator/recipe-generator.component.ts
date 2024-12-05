import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeFormComponent } from './recipe-form/recipe-form.component';
import { MatCardModule } from '@angular/material/card';
import { RecipeService } from '../../../../core/services/recipe.service';
import { Recipe } from '../../../../core/models/recipe.model';
import { RecipeFilters } from '../../../../core/models/recipe-filters.model';

@Component({
  selector: 'app-recipe-generator',
  standalone: true,
  imports: [CommonModule, RecipeFormComponent, MatCardModule],
  template: `
    <mat-card appearance="outlined" class="recipe-generator-card">
      <mat-card-header>
        <mat-card-title>Recipe Generator</mat-card-title>
        <mat-card-subtitle>Create your perfect recipe by selecting ingredients and preferences</mat-card-subtitle>
      </mat-card-header>
      <mat-card-content>
        <app-recipe-form (generate)="onGenerate($event)"></app-recipe-form>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
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
  `]
})
export class RecipeGeneratorComponent {
  constructor(private recipeService: RecipeService) {}

  onGenerate(filters: RecipeFilters) {
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
}