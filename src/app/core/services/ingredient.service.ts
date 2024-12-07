import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { Observable, from } from 'rxjs';

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

  constructor(private firebaseService: FirebaseService) {
    this.db = getFirestore(this.firebaseService.getApp()); // Initialize Firestore
  }

  /**
   * Search ingredients by name
   * @param queryText The search string entered by the user
   * @returns Observable of a list of matching ingredient names
   */
  searchIngredients(queryText: string): Observable<string[]> {
    const ingredientsRef = collection(this.db, 'ingredients'); // Reference to 'ingredients' collection
    const searchQuery = query(
      ingredientsRef,
      where('ingredientName', '>=', queryText),
      where('ingredientName', '<=', queryText + '\uf8ff'), // Prefix search
    );

    // Convert Firestore query results into an observable
    return new Observable<string[]>((observer) => {
      getDocs(searchQuery)
        .then((querySnapshot) => {
          const filteredIngredients = querySnapshot.docs.map(
            (doc) => doc.data()['ingredientName'] as string,
          );
          observer.next(filteredIngredients);
          observer.complete();
        })
        .catch((error) => {
          console.error('Error fetching ingredients:', error);
          observer.error(error);
        });
    });
  }
}
