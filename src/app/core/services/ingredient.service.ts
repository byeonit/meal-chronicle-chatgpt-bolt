import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IngredientSearchResult } from '../models/ingredient-search.model';

@Injectable({
  providedIn: 'root',
})
export class IngredientService {
  /*
  constructor(private firestore: AngularFirestore) {}

  searchIngredients(queryText: string): Observable<string[]> {
    return this.firestore
      .collection<IngredientSearchResult>('ingredients', ref =>
        ref
          .where('ingredientName', '>=', queryText)
          .where('ingredientName', '<=', queryText + '\uf8ff')
          .limit(10)
      )
      .valueChanges()
      .pipe(
        map(results => results.map(result => result.ingredientName))
      );
  }
  */
  private db; // Firestore instance

  constructor(private firestore: AngularFirestore) {}

  searchIngredients(queryText: string): Observable<string[]> {
    return this.firestore
      .collection<IngredientSearchResult>('ingredients', ref =>
        ref
          .where('ingredientName', '>=', queryText)
          .where('ingredientName', '<=', queryText + '\uf8ff')
          .limit(10)
      )
      .valueChanges()
      .pipe(
        map(results => results.map(result => result.ingredientName))
      );
  }
}