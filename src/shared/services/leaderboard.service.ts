import { Injectable } from '@angular/core';
import { ref, onValue, Database, query, orderByChild, limitToLast } from 'firebase/database';
import { Observable } from 'rxjs';
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyAhNm0d2NsFox2jvNDKC76twDpqold7Yvk",
  authDomain: "react-marx-fca6c.firebaseapp.com",
  databaseURL: "https://react-marx-fca6c-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "react-marx-fca6c",
  storageBucket: "react-marx-fca6c.firebasestorage.app",
  messagingSenderId: "865909733584",
  appId: "1:865909733584:web:c765f0800a1d6ee93c46d5"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export interface LeaderboardEntry {
  username: string;
  score: number;
  lastUpdated: string;
  rank: number;
}

@Injectable({
  providedIn: 'root'
})
export class LeaderboardService {
  constructor() {}

  getTopScores(limit: number = 10): Observable<LeaderboardEntry[]> {
    return new Observable(observer => {
      let unsubscribe: (() => void) | null = null;
      try {
        const scoresRef = ref(db, 'highscores');
        unsubscribe = onValue(
          scoresRef,
          (snapshot) => {
            if (snapshot.exists()) {
              const data = snapshot.val();
              const entries: LeaderboardEntry[] = Object.entries(data).map(
                ([username, userData]: [string, any]) => ({
                  username,
                  score: userData.score || 0,
                  lastUpdated: userData.lastUpdated || new Date().toISOString(),
                  rank: 0 // Will be set after sorting
                })
              );

              // Sort by score descending
              entries.sort((a, b) => b.score - a.score);

              // Add rank
              entries.forEach((entry, index) => {
                entry.rank = index + 1;
              });

              // Return top N
              observer.next(entries.slice(0, limit));
            } else {
              observer.next([]);
            }
          },
          (error) => {
            console.error('Error loading leaderboard:', error);
            observer.error(error);
          }
        );
      } catch (error) {
        console.error('Error setting up leaderboard listener:', error);
        observer.error(error);
      }
      
      // Always return unsubscribe function
      return () => {
        if (unsubscribe) {
          unsubscribe();
        }
      };
    });
  }

  getUserRank(username: string): Observable<number | null> {
    return new Observable(observer => {
      let unsubscribe: (() => void) | null = null;
      try {
        const scoresRef = ref(db, 'highscores');
        unsubscribe = onValue(
          scoresRef,
          (snapshot) => {
            if (snapshot.exists()) {
              const data = snapshot.val();
              const userScore = data[username]?.score || 0;

              let rank = 1;
              Object.entries(data).forEach(([_, userData]: [string, any]) => {
                if ((userData.score || 0) > userScore) {
                  rank++;
                }
              });

              observer.next(rank);
            } else {
              observer.next(null);
            }
          },
          (error) => {
            console.error('Error getting user rank:', error);
            observer.error(error);
          }
        );
      } catch (error) {
        console.error('Error setting up rank listener:', error);
        observer.error(error);
      }

      // Always return unsubscribe function
      return () => {
        if (unsubscribe) {
          unsubscribe();
        }
      };
    });
  }
}
