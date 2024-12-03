import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IngredientDocument, IngredientData } from '../models/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  constructor(private firestore: AngularFirestore) {}

  addIngredient(userId: string, ingredient: string): Promise<void> {
    const ref = this.firestore.doc(`ingredients/${userId}`);
    const data: IngredientDocument = {
      ingredientList: [ingredient],
      createdAt: new Date(),
      userId
    };
    return ref.set(data, { merge: true });
  }

  getIngredients(userId: string): Observable<string[]> {
    return this.firestore
      .collection<IngredientData>('ingredients', ref =>
        ref.where('userId', '==', userId)
      )
      .valueChanges()
      .pipe(
        map(docs => docs.flatMap(doc => doc.ingredientList || []))
      );
  }
}