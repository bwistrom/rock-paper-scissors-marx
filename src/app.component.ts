import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LoginComponent } from './components/login.component';
import { GameComponent } from './components/game.component';
import { LeaderboardComponent } from './components/leaderboard.component';
import { FirebaseService } from './firebase.service';
import { Match } from './shared/models/match.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, LoginComponent, GameComponent, LeaderboardComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./App.css'],
  providers: [FirebaseService]
})
export class AppComponent implements OnInit, OnDestroy {
  user: string | null = null;
  highScore: number = 0;
  currentScore: number = 0;
  matchHistory: Match[] = [];
  errorMessage: string = '';
  view: 'login' | 'game' | 'leaderboard' = 'login';
  
  private destroy$ = new Subject<void>();

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit() {
    // Load user from localStorage on mount
    const savedUser = localStorage.getItem('rpsGameUser');
    if (savedUser) {
      this.user = savedUser;
      this.loadHighScore(savedUser);
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  handleLogin(username: string) {
    this.user = username;
    this.view = 'game';
    this.currentScore = 0;
    this.matchHistory = [];
    this.errorMessage = '';
    localStorage.setItem('rpsGameUser', username);
    this.loadHighScore(username);
  }

  handleLogout() {
    this.user = null;
    this.view = 'login';
    this.currentScore = 0;
    this.highScore = 0;
    this.matchHistory = [];
    this.errorMessage = '';
    localStorage.removeItem('rpsGameUser');
  }

  handleShowLeaderboard() {
    this.view = 'leaderboard';
  }

  loadHighScore(username: string) {
    this.firebaseService
      .loadHighScore(username)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (score: number) => {
          this.highScore = score;
        },
        error: (error: any) => {
          console.error('Error loading high score:', error);
          this.errorMessage = 'Could not load high score. Continuing anyway.';
          setTimeout(() => {
            this.errorMessage = '';
          }, 3000);
        }
      });
  }

  saveHighScore(username: string, score: number) {
    this.firebaseService.saveHighScore(username, score).catch((error: any) => {
      console.error('Error saving high score:', error);
      this.errorMessage = 'Could not save high score to Firebase.';
      setTimeout(() => {
        this.errorMessage = '';
      }, 3000);
    });
  }

  handleGameResult(points: number) {
    const newScore = this.currentScore + points;
    this.currentScore = newScore;

    // Update high score if current score exceeds it
    if (newScore > this.highScore && this.user) {
      this.highScore = newScore;
      this.saveHighScore(this.user, newScore);
    }
  }

  updateMatchHistory(data: {playerChoice: string, cpuChoice: string, result: string, points: number}) {
    const newMatch: Match = {
      playerChoice: data.playerChoice,
      cpuChoice: data.cpuChoice,
      result: data.result,
      points: data.points,
      timestamp: new Date().toLocaleTimeString()
    };
    this.matchHistory = [newMatch, ...this.matchHistory].slice(0, 10);
  }
}
