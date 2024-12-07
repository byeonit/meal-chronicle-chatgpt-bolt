import { Component } from '@angular/core';
import { FirestoreService } from '../../../core/services/firestore.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-predefines-ingredients',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule, 
    MatInputModule, 
    MatChipsModule,
    FormsModule
  ],
  templateUrl: './predefines-ingredients.component.html',
  styleUrl: './predefines-ingredients.component.css'
})
export class PredefinesIngredientsComponent {
  categories: any[] = [];
  selectedIngredients: string[] = [];
  searchQuery: string = '';

  constructor(private firestoreService: FirestoreService) {}

  ngOnInit(): void {
    this.firestoreService.getPredefinedIngredients().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => {
        console.error('Error fetching predefined ingredients:', err);
      },
    });
  }

  toggleIngredient(ingredient: string): void {
    if (this.selectedIngredients.includes(ingredient)) {
      this.selectedIngredients = this.selectedIngredients.filter((i) => i !== ingredient);
    } else {
      this.selectedIngredients.push(ingredient);
    }
  }

  getFilteredIngredients(category: any): string[] {
    if (!this.searchQuery) return category.ingredients;
    return category.ingredients.filter((ingredient: string) =>
      ingredient.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
}
