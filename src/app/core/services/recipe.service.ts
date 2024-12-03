import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, from, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Recipe, DummyRecipe } from '../models/recipe.model';
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
      .valueChanges({ idField: 'id' })
      .pipe(
        catchError(error => {
          console.error('Error fetching recent recipes:', error);
          return [];
        })
      );
  }

  getDummyRecipe(): Observable<DummyRecipe> {
    return this.firestore
      .collection<DummyRecipe>('recipes_dummy')
      .get()
      .pipe(
        map(snapshot => {
          if (snapshot.empty) {
            throw new Error('No dummy recipes found');
          }
          const recipes = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          } as DummyRecipe));
          
          if (!recipes.length) {
            throw new Error('No dummy recipes available');
          }
          
          const randomIndex = Math.floor(Math.random() * recipes.length);
          return recipes[randomIndex];
        }),
        catchError(error => {
          console.error('Error fetching dummy recipe:', error);
          return throwError(() => error);
        })
      );
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
      }),
      catchError(error => {
        console.error('Error fetching recipes:', error);
        return [];
      })
    );
  }
}