import { Injectable } from '@angular/core';
import { getAuth, EmailAuthProvider, linkWithCredential, signInAnonymously , onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, User, sendPasswordResetEmail } from 'firebase/auth';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = getAuth();
  private userSubject = new BehaviorSubject<User | null>(null);

  user$ = this.userSubject.asObservable();

  constructor() {
    // Track auth state changes
    onAuthStateChanged(this.auth, (user) => {
      this.userSubject.next(user);
    });
  }

  register(email: string, password: string): Promise<User | null> {
    return createUserWithEmailAndPassword(this.auth, email, password)
      .then((result) => result.user)
      .catch((error) => {
        console.error('Registration failed:', error);
        return null;
      });
  }

  login(email: string, password: string): Promise<User | null> {
    return signInWithEmailAndPassword(this.auth, email, password)
      .then((result) => result.user)
      .catch((error) => {
        console.error('Login failed:', error);
        return null;
      });
  }

  logout(): Promise<void> {
    return signOut(this.auth).catch((error) => {
      console.error('Logout failed:', error);
    });
  }

  getCurrentUser(): User | null {
    //return this.auth.currentUser;
    return this.userSubject.value;
  }

  resetPassword(email: string): Promise<void> {
    return sendPasswordResetEmail(this.auth, email)
      .then(() => console.log('Password reset email sent'))
      .catch((error) => console.error('Error resetting password:', error));
  }

  // Sign in anonymously
  async signInAnonymously(): Promise<User | null> {
    try {
      const result = await signInAnonymously(this.auth);
      return result.user;
    } catch (error) {
      console.error('Error signing in anonymously:', error);
      throw error;
    }
  }
  // Link anonymous account to email/password
  async linkAnonymousAccount(email: string, password: string): Promise<User | null> {
    const credential = EmailAuthProvider.credential(email, password);
    try {
      const result = await linkWithCredential(this.auth.currentUser!, credential);
      return result.user;
    } catch (error) {
      console.error('Error linking anonymous account:', error);
      throw error;
    }
  }

}
