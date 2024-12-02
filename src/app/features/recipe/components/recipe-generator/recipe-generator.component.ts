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
    <mat-card appearance="outlined">
      <mat-card-header>
        <mat-card-title>Recipe Generator</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <app-recipe-form (generate)="onGenerate($event)"></app-recipe-form>
      </mat-card-content>
    </mat-card>
  `,
})
export class RecipeGeneratorComponent {
  constructor(private recipeService: RecipeService) {}

  onGenerate(filters: RecipeFilters) {
    console.log('Filters passed to getRecipes:', filters);
    this.recipeService.getRecipes(filters).subscribe({
      next: (recipes) => {
        console.log('Filtered recipes:', recipes);
       if (recipes.length === 0) {
          console.log('No recipes found for the given filters.');
        }
        // Handle the filtered recipes (e.g., display them in the UI)
      },
      error: (error) => {
        console.error('Error fetching recipes:', error);
      },
    });
  }
}
