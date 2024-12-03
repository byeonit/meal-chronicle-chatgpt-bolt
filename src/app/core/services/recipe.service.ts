import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, from, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Recipe, DummyRecipe } from '../models/recipe.model';
import { RecipeFilters } from '../models/recipe-filters.model';
/*
import { FirebaseService } from './firebase.service';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
} from 'firebase/firestore';
*/
@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  constructor(private firestore: AngularFirestore) {}

  /*private db;

  constructor(private firebaseService: FirebaseService) {
    this.db = getFirestore(this.firebaseService.getApp());
  }*/
/*
  async saveRecipe(recipe: Partial<Recipe>): Promise<string> {
    try {
      const docRef = await addDoc(collection(this.db, 'recipes'), recipe);
      return docRef.id;
    } catch (error) {
      console.error('Error saving recipe:', error);
      throw error;
    }
  }

  getUserRecipes(userId: string): Observable<Recipe[]> {
    return new Observable((observer) => {
      getDocs(
        query(
          collection(this.db, 'recipes'),
          where('userId', '==', userId),
          orderBy('createdAt', 'desc')
        )
      )
        .then((snapshot) => {
          const recipes = snapshot.docs.map(
            (doc) =>
              ({
                id: doc.id,
                ...doc.data(),
              } as Recipe)
          );
          observer.next(recipes);
          observer.complete();
        })
        .catch((error) => observer.error(error));
    });
  }

  getUserRecipes(userId: string): Observable<Recipe[]> {
    return new Observable((observer) => {
      getDocs(
        query(
          collection(this.db, 'recipes'),
          where('userId', '==', userId),
          orderBy('createdAt', 'desc')
        )
      )
        .then((snapshot) => {
          const recipes = snapshot.docs.map(
            (doc) =>
              ({
                id: doc.id,
                ...doc.data(),
              } as Recipe)
          );
          observer.next(recipes);
          observer.complete();
        })
        .catch((error) => observer.error(error));
    });
  }

  getRecentRecipes(): Observable<Recipe[]> {
    return new Observable((observer) => {
      getDocs(
        query(
          collection(this.db, 'recipes'),
          orderBy('createdAt', 'desc'),
          where('status', '==', 'generated')
        )
      )
        .then((snapshot) => {
          const recipes = snapshot.docs.map(
            (doc) =>
              ({
                id: doc.id,
                ...doc.data(),
              } as Recipe)
          );
          observer.next(recipes);
          observer.complete();
        })
        .catch((error) => observer.error(error));
    });
  }

  getRecipes(filters: RecipeFilters): Observable<Recipe[]> {
    return new Observable<Recipe[]>((observer) => {
      // Start with a basic query
      let baseQuery = query(collection(this.db, 'recipes'));

      // Apply the primary filters that can be handled by Firestore
      if (filters.ingredients && filters.ingredients.length > 0) {
        baseQuery = query(
          baseQuery,
          where('ingredients', 'array-contains-any', filters.ingredients)
        );
      }

      if (filters.mealType) {
        baseQuery = query(baseQuery, where('mealType', '==', filters.mealType));
      }

      if (filters.maxTime) {
        baseQuery = query(baseQuery, where('time', '<=', filters.maxTime));
      }

      // Execute the query
      getDocs(baseQuery)
        .then((querySnapshot) => {
          let recipes = querySnapshot.docs.map(
            (doc) => ({ id: doc.id, ...doc.data() } as Recipe)
          );

          // Apply additional filters in memory
          if (filters.skillLevel && filters.skillLevel.length > 0) {
            recipes = recipes.filter((recipe) =>
              recipe.skillLevel.some((level) =>
                filters.skillLevel?.includes(level)
              )
            );
          }

          observer.next(recipes);
          observer.complete();
        })
        .catch((error) => {
          console.error('Error fetching recipes:', error);
          observer.error(error);
        });
    });
  }
*/
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