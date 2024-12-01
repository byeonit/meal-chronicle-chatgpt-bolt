import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-recipe-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="form-group">
      <label for="ingredients">Enter your ingredients:</label>
      <textarea
        id="ingredients"
        rows="4"
        [(ngModel)]="ingredients"
        placeholder="Enter ingredients, one per line..."
      ></textarea>
    </div>
    <button class="generate-btn" (click)="onGenerateClick()">Generate Recipe</button>
  `,
  styles: [`
    .form-group {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    
    label {
      font-weight: bold;
      color: #34495e;
    }
    
    textarea {
      padding: 12px;
      border: 1px solid #ddd;
      border-radius: 4px;
      resize: vertical;
    }
    
    .generate-btn {
      padding: 12px 24px;
      background-color: #3498db;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: bold;
      transition: background-color 0.3s;
      margin-top: 16px;
    }
    
    .generate-btn:hover {
      background-color: #2980b9;
    }
  `]
})
export class RecipeFormComponent {
  ingredients = '';
  @Output() generate = new EventEmitter<string>();

  onGenerateClick() {
    this.generate.emit(this.ingredients);
  }
}