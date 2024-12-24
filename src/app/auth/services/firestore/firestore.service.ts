import { Injectable } from '@angular/core';
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  db = getFirestore();

  async getItems() {
    const querySnapshot = await getDocs(collection(this.db, 'items'));
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }

  async addItem(item: any) {
    return await addDoc(collection(this.db, 'items'), item);
  }
}
