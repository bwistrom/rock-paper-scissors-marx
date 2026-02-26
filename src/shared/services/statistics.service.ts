import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface PlayerStatistics {
  username: string;
  totalGames: number;
  wins: number;
  losses: number;
  draws: number;
  winRate: number;
  totalPoints: number;
  averagePointsPerGame: number;
  longestWinStreak: number;
  currentStreak: number;
  lastPlayed: string;
}

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  private statsKey = 'rpsGameStats';
  private stats$ = new BehaviorSubject<Map<string, PlayerStatistics>>(this.loadStats());

  constructor() {}

  getStats(username: string): PlayerStatistics | undefined {
    return this.stats$.value.get(username);
  }

  getStats$(): Observable<Map<string, PlayerStatistics>> {
    return this.stats$.asObservable();
  }

  recordGame(
    username: string,
    result: 'win' | 'lose' | 'draw',
    points: number
  ): void {
    const stats = this.stats$.value;
    let playerStats = stats.get(username);

    if (!playerStats) {
      playerStats = this.initializeStats(username);
    }

    // Update totals
    playerStats.totalGames++;
    playerStats.totalPoints += points;

    // Update result-specific stats
    if (result === 'win') {
      playerStats.wins++;
      playerStats.currentStreak++;
      if (playerStats.currentStreak > playerStats.longestWinStreak) {
        playerStats.longestWinStreak = playerStats.currentStreak;
      }
    } else if (result === 'lose') {
      playerStats.losses++;
      playerStats.currentStreak = 0;
    } else {
      playerStats.draws++;
    }

    playerStats.winRate = (playerStats.wins / playerStats.totalGames) * 100;
    playerStats.averagePointsPerGame = playerStats.totalPoints / playerStats.totalGames;
    playerStats.lastPlayed = new Date().toISOString();

    stats.set(username, playerStats);
    this.stats$.next(stats);
    this.saveStats(stats);
  }

  resetStats(username: string): void {
    const stats = this.stats$.value;
    stats.set(username, this.initializeStats(username));
    this.stats$.next(stats);
    this.saveStats(stats);
  }

  private initializeStats(username: string): PlayerStatistics {
    return {
      username,
      totalGames: 0,
      wins: 0,
      losses: 0,
      draws: 0,
      winRate: 0,
      totalPoints: 0,
      averagePointsPerGame: 0,
      longestWinStreak: 0,
      currentStreak: 0,
      lastPlayed: new Date().toISOString()
    };
  }

  private loadStats(): Map<string, PlayerStatistics> {
    const saved = localStorage.getItem(this.statsKey);
    if (!saved) {
      return new Map();
    }

    try {
      const data = JSON.parse(saved);
      return new Map(Object.entries(data));
    } catch {
      return new Map();
    }
  }

  private saveStats(stats: Map<string, PlayerStatistics>): void {
    const data = Object.fromEntries(stats);
    localStorage.setItem(this.statsKey, JSON.stringify(data));
  }
}
