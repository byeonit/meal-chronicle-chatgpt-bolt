import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AlternativeOllamaRecipeResponse } from '../../../../../core/models/ollama-recipe.model';

@Component({
  selector: 'app-recipe-generate',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recipe-generate.component.html',
  styleUrl: './recipe-generate.component.css'
})
export class RecipeGenerateComponent {
  @Input() recipe: AlternativeOllamaRecipeResponse | null = null;

}
