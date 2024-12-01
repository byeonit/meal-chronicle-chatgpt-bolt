import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeFormComponent } from './recipe-form/recipe-form.component';
import { MatCardModule } from '@angular/material/card';
import { RecipeService } from '../../../../core/services/recipe.service';
import { Recipe } from '../../../../core/models/recipe.model';

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
  `
})
export class RecipeGeneratorComponent {
  constructor(private recipeService: RecipeService) {}

  async onGenerate(ingredients: string[]) {
    try {
      const recipe: Partial<Recipe> = {
        ingredients,
        createdAt: new Date(),
        status: 'pending' as const
      };
      
      const recipeId = await this.recipeService.saveRecipe(recipe);
      console.log('Recipe saved with ID:', recipeId);
    } catch (error) {
      console.error('Error generating recipe:', error);
    }
  }
}