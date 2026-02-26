import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameLogicService } from '../shared/services/game-logic.service';
import { Match } from '../shared/models/match.model';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game.component.html',
  styleUrls: ['../styles/Game.css']
})
export class GameComponent {
  @Input() username: string | null = null;
  @Input() currentScore: number = 0;
  @Input() highScore: number = 0;
  @Input() matchHistory: Match[] = [];
  @Output() gameResult = new EventEmitter<number>();
  @Output() logout = new EventEmitter<void>();
  @Output() showLeaderboard = new EventEmitter<void>();
  @Output() updateMatchHistory = new EventEmitter<{playerChoice: string, cpuChoice: string, result: string, points: number}>();

  playerChoice: string | null = null;
  cpuChoice: string | null = null;
  result: 'win' | 'lose' | 'draw' | null = null;
  gameActive: boolean = false;
  choices: string[] = [];
  emojis: { [key: string]: string } = {};

  constructor(private gameLogicService: GameLogicService) {
    this.choices = this.gameLogicService.getChoices();
    this.emojis = this.gameLogicService.getEmojis();
  }

  handlePlay(choice: string) {
    const cpu = this.gameLogicService.generateCPUChoice();
    const gameResult = this.gameLogicService.determineWinner(choice, cpu);
    const points = this.gameLogicService.getPointsForResult(gameResult);

    this.playerChoice = choice;
    this.cpuChoice = cpu;
    this.result = gameResult;
    this.gameActive = true;

    // Emit points
    this.gameResult.emit(points);

    // Update match history
    this.updateMatchHistory.emit({
      playerChoice: choice,
      cpuChoice: cpu,
      result: gameResult,
      points: points
    });
  }

  handlePlayAgain() {
    this.playerChoice = null;
    this.cpuChoice = null;
    this.result = null;
    this.gameActive = false;
  }

  handleLogout() {
    this.logout.emit();
  }

  handleShowLeaderboard() {
    this.showLeaderboard.emit();
  }

  getEmoji(choice: string): string {
    return this.gameLogicService.getEmoji(choice);
  }
}
