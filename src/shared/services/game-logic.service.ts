import { Injectable } from '@angular/core';

const CHOICES = ['rock', 'paper', 'scissors'];
const EMOJIS = {
  rock: '🪨',
  paper: '📄',
  scissors: '✂️'
};

@Injectable({
  providedIn: 'root'
})
export class GameLogicService {
  
  getChoices(): string[] {
    return CHOICES;
  }

  getEmojis() {
    return EMOJIS;
  }

  getEmoji(choice: string): string {
    return EMOJIS[choice as keyof typeof EMOJIS] || '';
  }

  generateCPUChoice(): string {
    return CHOICES[Math.floor(Math.random() * CHOICES.length)];
  }

  determineWinner(playerChoice: string, cpuChoice: string): 'win' | 'lose' | 'draw' {
    if (playerChoice === cpuChoice) {
      return 'draw';
    }

    if (
      (playerChoice === 'rock' && cpuChoice === 'scissors') ||
      (playerChoice === 'paper' && cpuChoice === 'rock') ||
      (playerChoice === 'scissors' && cpuChoice === 'paper')
    ) {
      return 'win';
    }

    return 'lose';
  }

  getPointsForResult(result: 'win' | 'lose' | 'draw'): number {
    if (result === 'win') return 1;
    if (result === 'lose') return -1;
    return 0;
  }
}
