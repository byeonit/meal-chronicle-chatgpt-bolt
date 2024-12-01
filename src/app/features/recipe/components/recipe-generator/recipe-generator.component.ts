import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeFormComponent } from './recipe-form/recipe-form.component';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-recipe-generator',
  standalone: true,
  imports: [CommonModule, RecipeFormComponent, MatCardModule],
  template: `
    <div class="mat-elevation-z0">
      <mat-card appearance="outlined">
        <mat-card-header>
          <mat-card-title>Recipe Generator</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <app-recipe-form (generate)="onGenerate($event)"></app-recipe-form>
        </mat-card-content>
      </mat-card>
    </div>
  `
})
export class RecipeGeneratorComponent {
  onGenerate(ingredients: string[]) {
    console.log('Generating recipe with ingredients:', ingredients);
  }
}