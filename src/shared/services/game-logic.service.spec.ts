/// <reference types="jest" />

import { GameLogicService } from './game-logic.service';

describe('GameLogicService', () => {
  let service: GameLogicService;

  beforeEach(() => {
    service = new GameLogicService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getChoices', () => {
    it('should return array of valid choices', () => {
      const choices = service.getChoices();
      expect(choices).toEqual(['rock', 'paper', 'scissors']);
    });

    it('should return array with 3 items', () => {
      const choices = service.getChoices();
      expect(choices.length).toBe(3);
    });
  });

  describe('generateCPUChoice', () => {
    it('should return a valid choice', () => {
      const cpuChoice = service.generateCPUChoice();
      expect(['rock', 'paper', 'scissors']).toContain(cpuChoice);
    });

    it('should return different choices over multiple calls', () => {
      const choices: string[] = [];
      for (let i = 0; i < 100; i++) {
        choices.push(service.generateCPUChoice());
      }
      expect(choices.some(choice => choice !== choices[0])).toBe(true);
    });
  });

  describe('determineWinner', () => {
    it('should return draw when choices are same', () => {
      expect(service.determineWinner('rock', 'rock')).toBe('draw');
      expect(service.determineWinner('paper', 'paper')).toBe('draw');
      expect(service.determineWinner('scissors', 'scissors')).toBe('draw');
    });

    it('should return win for rock vs scissors', () => {
      expect(service.determineWinner('rock', 'scissors')).toBe('win');
    });

    it('should return win for paper vs rock', () => {
      expect(service.determineWinner('paper', 'rock')).toBe('win');
    });

    it('should return win for scissors vs paper', () => {
      expect(service.determineWinner('scissors', 'paper')).toBe('win');
    });

    it('should return lose for rock vs paper', () => {
      expect(service.determineWinner('rock', 'paper')).toBe('lose');
    });

    it('should return lose for paper vs scissors', () => {
      expect(service.determineWinner('paper', 'scissors')).toBe('lose');
    });

    it('should return lose for scissors vs rock', () => {
      expect(service.determineWinner('scissors', 'rock')).toBe('lose');
    });
  });

  describe('getPointsForResult', () => {
    it('should return 1 for win', () => {
      expect(service.getPointsForResult('win')).toBe(1);
    });

    it('should return -1 for lose', () => {
      expect(service.getPointsForResult('lose')).toBe(-1);
    });

    it('should return 0 for draw', () => {
      expect(service.getPointsForResult('draw')).toBe(0);
    });
  });

  describe('getEmoji', () => {
    it('should return rock emoji', () => {
      expect(service.getEmoji('rock')).toBe('🪨');
    });

    it('should return paper emoji', () => {
      expect(service.getEmoji('paper')).toBe('📄');
    });

    it('should return scissors emoji', () => {
      expect(service.getEmoji('scissors')).toBe('✂️');
    });

    it('should return empty string for invalid choice', () => {
      expect(service.getEmoji('invalid')).toBe('');
    });
  });
});
