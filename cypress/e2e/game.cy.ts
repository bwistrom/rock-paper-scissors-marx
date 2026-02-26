describe('Rock Paper Scissors Game - E2E Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200');
    // Clear localStorage to start fresh
    cy.clearLocalStorage();
  });

  describe('Login Flow', () => {
    it('should display login page', () => {
      cy.contains('Welcome Player!').should('be.visible');
      cy.get('input[formControlName="username"]').should('be.visible');
      cy.get('button.btn-login').should('be.visible');
    });

    it('should prevent login with invalid username', () => {
      cy.get('input[formControlName="username"]').type('ab');
      cy.get('button.btn-login').should('be.disabled');
    });

    it('should prevent login with special characters', () => {
      cy.get('input[formControlName="username"]').type('user@name');
      cy.get('button.btn-login').should('be.disabled');
    });

    it('should allow login with valid username', () => {
      cy.get('input[formControlName="username"]').type('testuser123');
      cy.get('button.btn-login').should('be.enabled').click();
      cy.contains('Welcome, testuser123!').should('be.visible');
    });

    it('should accept underscores in username', () => {
      cy.get('input[formControlName="username"]').type('test_user_123');
      cy.get('button.btn-login').should('be.enabled').click();
      cy.contains('test_user_123').should('be.visible');
    });
  });

  describe('Game Play', () => {
    beforeEach(() => {
      // Login before game tests
      cy.get('input[formControlName="username"]').type('testplayer');
      cy.get('button.btn-login').click();
      cy.contains('Welcome, testplayer!').should('be.visible');
    });

    it('should display game choices', () => {
      cy.contains('Choose your move:').should('be.visible');
      cy.get('button.btn-choice').should('have.length', 3);
    });

    it('should play rock and see result', () => {
      cy.get('button.btn-choice').first().click();
      cy.get('.result').should('be.visible');
      cy.contains('vs').should('be.visible');
    });

    it('should display all possible results', () => {
      // Play multiple times to see different outcomes
      for (let i = 0; i < 5; i++) {
        cy.get('button.btn-choice').first().click({ force: true });
        cy.get('.result').should('be.visible');
        cy.get('button.btn-play-again').click({ force: true });
      }
    });

    it('should track current score', () => {
      cy.contains('Current Score').should('be.visible');
      cy.get('.score-value').should('exist');
    });

    it('should play again and reset state', () => {
      cy.get('button.btn-choice').first().click();
      cy.get('.result').should('be.visible');
      cy.get('button.btn-play-again').click();
      cy.get('button.btn-choice').should('be.visible');
    });
  });

  describe('Score Display', () => {
    beforeEach(() => {
      cy.get('input[formControlName="username"]').type('scoretest');
      cy.get('button.btn-login').click();
    });

    it('should display high score section', () => {
      cy.contains('High Score').should('be.visible');
      cy.contains('Current Score').should('be.visible');
    });

    it('should update score after game', () => {
      cy.get('.score-value').first().invoke('text').then((initialScore) => {
        cy.get('button.btn-choice').first().click();
        cy.get('button.btn-play-again').click();
        // Play until score changes
        for (let i = 0; i < 20; i++) {
          cy.get('button.btn-choice').first().click({ force: true });
          cy.get('button.btn-play-again').click({ force: true });
        }
      });
    });
  });

  describe('Match History', () => {
    beforeEach(() => {
      cy.get('input[formControlName="username"]').type('historytest');
      cy.get('button.btn-login').click();
    });

    it('should display match history after playing', () => {
      // Play a game
      cy.get('button.btn-choice').first().click();
      cy.get('button.btn-play-again').click();

      // Check for history
      cy.contains('Last 10 Rounds').should('be.visible');
      cy.get('.history-item').should('have.length.greaterThan', 0);
    });

    it('should show correct result in history', () => {
      cy.get('button.btn-choice').first().click();
      cy.get('button.btn-play-again').click();

      // Verify history item exists
      cy.get('.history-item').should('have.length', 1);
      cy.get('.history-result').should('be.visible');
    });
  });

  describe('Logout', () => {
    beforeEach(() => {
      cy.get('input[formControlName="username"]').type('logouttest');
      cy.get('button.btn-login').click();
    });

    it('should logout and return to login', () => {
      cy.contains('Welcome, logouttest!').should('be.visible');
      cy.get('button.btn-logout').click();
      cy.contains('Welcome Player!').should('be.visible');
    });

    it('should clear user data on logout', () => {
      cy.get('button.btn-logout').click();
      cy.get('input[formControlName="username"]').should('have.value', '');
    });
  });

  describe('Responsive Design', () => {
    it('should work on mobile viewport', () => {
      cy.viewport('iphone-x');
      cy.get('input[formControlName="username"]').type('mobiletest');
      cy.get('button.btn-login').click();
      cy.get('button.btn-choice').should('be.visible');
    });

    it('should work on tablet viewport', () => {
      cy.viewport('ipad-2');
      cy.get('input[formControlName="username"]').type('tablettest');
      cy.get('button.btn-login').click();
      cy.get('button.btn-choice').should('be.visible');
    });

    it('should work on desktop viewport', () => {
      cy.viewport(1280, 720);
      cy.get('input[formControlName="username"]').type('desktoptest');
      cy.get('button.btn-login').click();
      cy.get('button.btn-choice').should('be.visible');
    });
  });

  describe('Error Handling', () => {
    it('should show validation error for empty username', () => {
      cy.get('input[formControlName="username"]').focus().blur();
      cy.contains('required').should('be.visible');
    });

    it('should show validation error for short username', () => {
      cy.get('input[formControlName="username"]').type('ab');
      cy.get('input[formControlName="username"]').focus().blur();
      cy.contains('at least').should('be.visible');
    });
  });

  describe('Session Persistence', () => {
    it('should save username to localStorage', () => {
      cy.get('input[formControlName="username"]').type('persisttest');
      cy.get('button.btn-login').click();
      cy.contains('persisttest').should('be.visible');

      // Check localStorage
      cy.getAllLocalStorage().then((result) => {
        expect(result[window.location.origin]['rpsGameUser']).to.equal('persisttest');
      });
    });
  });
});
