import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {
  private commonIngredients: string[] = [
    'Pasta', 'Rice', 'Chicken', 'Beef', 'Pork',
    'Tomatoes', 'Onions', 'Garlic', 'Cheese',
    'Olive Oil', 'Salt', 'Pepper', 'Butter',
    'Eggs', 'Milk', 'Flour', 'Sugar',
    'Carrots', 'Potatoes', 'Mushrooms'
  ];

  searchIngredients(query: string): Observable<string[]> {
    const filteredIngredients = this.commonIngredients.filter(ingredient => 
      ingredient.toLowerCase().includes(query.toLowerCase())
    );
    return of(filteredIngredients);
  }
}