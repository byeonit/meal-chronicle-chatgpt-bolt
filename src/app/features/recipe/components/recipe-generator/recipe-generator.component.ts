import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeFormComponent } from './recipe-form/recipe-form.component';

@Component({
  selector: 'app-recipe-generator',
  standalone: true,
  imports: [CommonModule, RecipeFormComponent],
  template: `
    <div class="recipe-generator">
      <h2>Recipe Generator</h2>
      <div class="form-container">
        <app-recipe-form (generate)="onGenerate($event)"></app-recipe-form>
      </div>
    </div>
  `,
  styles: [`
    .recipe-generator {
      padding: 20px;
      background-color: #fff;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    
    h2 {
      color: #2c3e50;
      margin-bottom: 20px;
    }
    
    .form-container {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
  `]
})
export class RecipeGeneratorComponent {
  onGenerate(ingredients: string) {
    console.log('Generating recipe with ingredients:', ingredients);
    // Recipe generation logic will be implemented later
  }
}