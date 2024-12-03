import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Recipe } from '../models/recipe.model';
import { RecipeFilters } from '../models/recipe-filters.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  constructor(private firestore: AngularFirestore) {}

  getRecentRecipes(): Observable<Recipe[]> {
    return this.firestore
      .collection<Recipe>('recipes', ref =>
        ref
          .where('status', '==', 'generated')
          .orderBy('createdAt', 'desc')
          .limit(10)
      )
      .valueChanges({ idField: 'id' });
  }

  getRecipes(filters: RecipeFilters): Observable<Recipe[]> {
    let query = this.firestore.collection<Recipe>('recipes');

    if (filters.ingredients?.length) {
      query = this.firestore.collection<Recipe>('recipes', ref =>
        ref.where('ingredients', 'array-contains-any', filters.ingredients)
      );
    }

    return query.valueChanges({ idField: 'id' }).pipe(
      map(recipes => {
        let filteredRecipes = recipes;

        if (filters.mealType) {
          filteredRecipes = filteredRecipes.filter(
            recipe => recipe.mealType === filters.mealType
          );
        }

        if (filters.maxTime) {
          filteredRecipes = filteredRecipes.filter(
            recipe => recipe.time <= filters.maxTime!
          );
        }

        if (filters.skillLevel?.length) {
          filteredRecipes = filteredRecipes.filter(recipe =>
            recipe.skillLevel.some(level => filters.skillLevel?.includes(level))
          );
        }

        return filteredRecipes;
      })
    );
  }
}