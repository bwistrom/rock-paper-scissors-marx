import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LeaderboardService, LeaderboardEntry } from '../shared/services/leaderboard.service';

@Component({
  selector: 'app-leaderboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="leaderboard-container">
      <div class="leaderboard-card">
        <h2>🏆 Leaderboard</h2>
        
        <div class="leaderboard-list">
          <div *ngIf="leaderboard.length === 0" class="empty-state">
            <p>No scores yet. Start playing to get on the leaderboard!</p>
          </div>

          <div *ngFor="let entry of leaderboard" [ngClass]="['leaderboard-item', 'rank-' + entry.rank]">
            <div class="rank">
              <span *ngIf="entry.rank === 1" class="medal">🥇</span>
              <span *ngIf="entry.rank === 2" class="medal">🥈</span>
              <span *ngIf="entry.rank === 3" class="medal">🥉</span>
              <span *ngIf="entry.rank > 3" class="number">#{{ entry.rank }}</span>
            </div>
            <div class="username">{{ entry.username }}</div>
            <div class="score">{{ entry.score }} pts</div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .leaderboard-container {
      padding: 2rem;
      max-width: 600px;
      margin: 0 auto;
    }

    .leaderboard-card {
      background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
      border-radius: 15px;
      padding: 2rem;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.12);
      border: 2px solid #6B46C1;
    }

    .leaderboard-card h2 {
      margin: 0 0 1.5rem 0;
      color: #333;
      font-size: 1.5rem;
      text-align: center;
    }

    .leaderboard-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .empty-state {
      text-align: center;
      color: #888;
      padding: 2rem;
    }

    .leaderboard-item {
      display: grid;
      grid-template-columns: 60px 1fr 100px;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      background: #f9f9f9;
      border-radius: 10px;
      border-left: 4px solid #6B46C1;
      transition: all 0.3s ease;
    }

    .leaderboard-item:hover {
      transform: translateX(5px);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    }

    .leaderboard-item.rank-1 {
      background: linear-gradient(135deg, rgba(107, 70, 193, 0.1) 0%, #f9f9f9 100%);
      border-left-color: #6B46C1;
    }

    .leaderboard-item.rank-2 {
      background: linear-gradient(135deg, rgba(249, 115, 22, 0.1) 0%, #f9f9f9 100%);
      border-left-color: #F97316;
    }

    .leaderboard-item.rank-3 {
      background: linear-gradient(135deg, rgba(107, 114, 128, 0.1) 0%, #f9f9f9 100%);
      border-left-color: #6B7280;
    }

    .rank {
      font-weight: 700;
      font-size: 1.2rem;
      text-align: center;
    }

    .medal {
      font-size: 1.5rem;
    }

    .number {
      color: #667eea;
    }

    .username {
      font-weight: 600;
      color: #333;
    }

    .score {
      text-align: right;
      font-weight: 700;
      color: #667eea;
      font-size: 1.1rem;
    }

    :root.dark-mode .leaderboard-card {
      background: linear-gradient(135deg, #252525 0%, #1a1a1a 100%);
    }

    :root.dark-mode .leaderboard-card h2,
    :root.dark-mode .username {
      color: #e8e8e8;
    }

    :root.dark-mode .leaderboard-item {
      background: #303030;
      color: #b0b0b0;
    }

    :root.dark-mode .empty-state {
      color: #808080;
    }
  `]
})
export class LeaderboardComponent implements OnInit, OnDestroy {
  leaderboard: LeaderboardEntry[] = [];
  private destroy$ = new Subject<void>();

  constructor(private leaderboardService: LeaderboardService) {}

  ngOnInit() {
    this.loadLeaderboard();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadLeaderboard() {
    this.leaderboardService
      .getTopScores(10)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (entries) => {
          this.leaderboard = entries;
        },
        error: (error) => {
          console.error('Error loading leaderboard:', error);
        }
      });
  }
}
