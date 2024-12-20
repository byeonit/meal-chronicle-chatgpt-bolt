import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FirestoreService } from '../../../core/services/firestore.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-predefines-ingredients-steps1',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    FormsModule,
  ],
  templateUrl: './predefines-ingredients-steps1.component.html',
  styleUrl: './predefines-ingredients-steps1.component.css'
})
export class PredefinesIngredientsSteps1Component {
  @Input() selectedIngredients: string[] = [];
  @Output() selectedIngredientsChange = new EventEmitter<string[]>();

  categories: any[] = [];
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
      this.selectedIngredients = this.selectedIngredients.filter(
        (i) => i !== ingredient,
      );
    } else {
      this.selectedIngredients.push(ingredient);
    }
    this.selectedIngredientsChange.emit(this.selectedIngredients);
  }

  getFilteredIngredients(category: any): string[] {
    if (!this.searchQuery) return category.ingredients;
    return category.ingredients.filter((ingredient: string) =>
      ingredient.toLowerCase().includes(this.searchQuery.toLowerCase()),
    );
  }
}
