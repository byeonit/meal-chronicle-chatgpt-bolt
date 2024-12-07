import { Component, Input } from '@angular/core';
import { AlternativeOllamaRecipeResponse } from '../../../core/models/ollama-recipe.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recipe-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recipe-display.component.html',
  styleUrl: './recipe-display.component.css'
})
export class RecipeDisplayComponent {
  @Input() recipe: AlternativeOllamaRecipeResponse | null = null;
  
}
