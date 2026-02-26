import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, set, Database } from 'firebase/database';
import { Observable } from 'rxjs';

const firebaseConfig = {
  apiKey: "AIzaSyAhNm0d2NsFox2jvNDKC76twDpqold7Yvk",
  authDomain: "react-marx-fca6c.firebaseapp.com",
  databaseURL: "https://react-marx-fca6c-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "react-marx-fca6c",
  storageBucket: "react-marx-fca6c.firebasestorage.app",
  messagingSenderId: "865909733584",
  appId: "1:865909733584:web:c765f0800a1d6ee93c46d5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor() {}

  loadHighScore(username: string): Observable<number> {
    return new Observable<number>(observer => {
      const scoreRef = ref(db, `highscores/${username}`);
      
      let unsubscribe: (() => void) | null = null;

      try {
        unsubscribe = onValue(
          scoreRef,
          (snapshot) => {
            if (snapshot.exists()) {
              observer.next(snapshot.val().score || 0);
            } else {
              observer.next(0);
            }
          },
          (error) => {
            console.error('Error loading high score:', error);
            observer.error(error);
          }
        );
      } catch (error) {
        console.error('Error setting up listener:', error);
        observer.error(error);
      }

      return () => {
        if (unsubscribe) {
          unsubscribe();
        }
      };
    });
  }

  async saveHighScore(username: string, score: number): Promise<void> {
    try {
      const scoreRef = ref(db, `highscores/${username}`);
      await set(scoreRef, {
        score: score,
        lastUpdated: new Date().toISOString(),
        username: username
      });
    } catch (error) {
      console.error('Error saving high score:', error);
      throw error;
    }
  }
}
