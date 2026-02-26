import { TestBed } from '@angular/core/testing';
import { GameComponent } from './game.component';
import { GameLogicService } from '../shared/services/game-logic.service';
import { CommonModule } from '@angular/common';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: any;
  let gameLogicService: GameLogicService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameComponent, CommonModule],
      providers: [GameLogicService]
    }).compileComponents();

    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    gameLogicService = TestBed.inject(GameLogicService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with choices and emojis', () => {
    expect(component.choices.length).toBe(3);
    expect(component.emojis).toBeDefined();
  });

  describe('handlePlay', () => {
    it('should emit gameResult with 1 for win', (done) => {
      component.gameResult.subscribe((points: number) => {
        if (points === 1) done();
      });

      spyOn(gameLogicService, 'generateCPUChoice').and.returnValue('scissors');
      component.handlePlay('rock');
    });

    it('should set gameActive to true after play', () => {
      component.handlePlay('rock');
      expect(component.gameActive).toBeTruthy();
    });

    it('should set playerChoice and cpuChoice', () => {
      component.handlePlay('rock');
      expect(component.playerChoice).toBe('rock');
      expect(component.cpuChoice).toBeDefined();
    });

    it('should emit updateMatchHistory', (done) => {
      component.updateMatchHistory.subscribe(() => {
        done();
      });
      component.handlePlay('rock');
    });
  });

  describe('handlePlayAgain', () => {
    it('should reset game state', () => {
      component.handlePlay('rock');
      component.handlePlayAgain();
      expect(component.playerChoice).toBeNull();
      expect(component.cpuChoice).toBeNull();
      expect(component.result).toBeNull();
      expect(component.gameActive).toBeFalsy();
    });
  });

  describe('handleLogout', () => {
    it('should emit logout event', (done) => {
      component.logout.subscribe(() => {
        done();
      });
      component.handleLogout();
    });
  });

  describe('getEmoji', () => {
    it('should return correct emoji for choice', () => {
      expect(component.getEmoji('rock')).toBe('🪨');
      expect(component.getEmoji('paper')).toBe('📄');
      expect(component.getEmoji('scissors')).toBe('✂️');
    });
  });
});
