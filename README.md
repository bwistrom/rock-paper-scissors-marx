# 🎮 Rock, Paper, Scissors Game - Angular

[![Angular](https://img.shields.io/badge/Angular-17-red.svg)](https://angular.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![Firebase](https://img.shields.io/badge/Firebase-Realtime-orange.svg)](https://firebase.google.com/)
[![Jest](https://img.shields.io/badge/Jest-Testing-green.svg)](https://jestjs.io/)
[![Cypress](https://img.shields.io/badge/Cypress-E2E-blue.svg)](https://www.cypress.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A modern Angular 17 application featuring a Rock-Paper-Scissors game with user authentication, reactive form validation, score tracking, and Firebase Realtime Database integration.

---

## Overview

This project demonstrates advanced Angular development practices including:
- **Reactive Forms** with custom validators
- **RxJS Observables** for asynchronous operations
- **Service-oriented architecture** with separation of concerns
- **Firebase Realtime Database** integration
- **Responsive design** with optimized UI/UX
- **Professional code organization** with shared services and models

---

## 🚀 Features

- **🔐 Reactive Login System** - Username-based authentication with form validation
- **🎯 Real-time Game Logic** - Play Rock-Paper-Scissors against CPU with random selection
- **📊 Dynamic Score Tracking** - Current and high score display with Firebase persistence
- **📜 Match History** - Last 10 rounds with detailed results and timestamps
- **☁️ Firebase Integration** - Cloud-based high score storage and real-time updates
- **📱 Professional UI/UX** - Responsive design optimized for all screen sizes
- **🏗️ Advanced Architecture** - Standalone components, services, and dependency injection
- **🧪 Comprehensive Testing** - 130+ unit tests with Jest and 40+ E2E tests with Cypress

## 🛠️ Tech Stack

- **Framework:** Angular 17 (LTS)
- **Language:** TypeScript
- **Styling:** CSS
- **Database:** Firebase Realtime Database
- **Testing:** Jest (Unit), Cypress (E2E)
- **Build Tool:** Angular CLI

---

## Quick Start

### Prerequisites
- Node.js v16+ or higher
- npm v8+ or yarn

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/bwistrom/rock-paper-scissors-marx.git
   cd rock-paper-scissors-angular
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   ng serve
   ```

4. **Open your browser:**
   Navigate to `http://localhost:4200`

### Build for Production

```bash
npm run build
```

---

## 🧪 Testing

- **Unit Tests:** `npx jest`
- **E2E Tests:** `npx cypress open`

## How to Play

1. **Login** - Enter username (3+ characters, letters/numbers/underscores only)
2. **Choose** - Select Rock 🪨, Paper 📄, or Scissors ✂️
3. **Battle** - Instant comparison with CPU's random choice
4. **Score** - Points update in real-time
5. **Persist** - High scores automatically save to Firebase
6. **History** - View your last 10 rounds

### Scoring System

| Result | Points |
|--------|--------|
| Win    | +1     |
| Lose   | -1     |
| Draw   | 0      |

### Game Rules

- **Rock** defeats Scissors
- **Scissors** defeats Paper
- **Paper** defeats Rock
- Identical choices result in **Draw**

---

## Project Architecture

### Directory Structure

```
src/
├── app.component.ts              # Root component with state management
├── app.component.html            # Root template with conditional rendering
├── components/
│   ├── login/
│   │   ├── login.component.ts    # Reactive Forms implementation
│   │   └── login.component.html  # Form with validation
│   └── game/
│       ├── game.component.ts     # Game presentation logic
│       └── game.component.html   # Game UI template
├── shared/
│   ├── models/
│   │   └── match.model.ts        # Match interface definition
│   └── services/
│       └── game-logic.service.ts # Game rules and logic
├── environments/
│   ├── environment.ts            # Development configuration
│   └── environment.prod.ts       # Production configuration
├── styles/
│   ├── Game.css                  # Game component styles
│   └── Login.css                 # Login component styles
├── firebase.service.ts           # Firebase RxJS integration
├── main.ts                       # Angular bootstrap
├── App.css                       # App component styles
└── styles.css                    # Global styles
```

### Architecture Highlights

**Component-Based Design**
- Standalone Angular components
- Input/Output bindings for data flow
- Event-driven communication

**Service Layer**
- `FirebaseService` - RxJS Observable-based Firebase Realtime Database interface
- `GameLogicService` - Pure logic functions for game rules
- Dependency injection for loose coupling

**Reactive Programming**
- RxJS Observables for asynchronous operations
- `takeUntil` pattern for proper cleanup
- Type-safe subscription handling

**Form Validation**
- Reactive Forms with FormBuilder
- Custom validators for username field
- Real-time validation feedback

---

## Technology Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Angular | 17.0.0 | Web framework |
| TypeScript | 5.2.2 | Type-safe language |
| Firebase SDK | 10.14.1 | Backend services |
| RxJS | 7.8.0 | Reactive programming |
| CSS3 | Latest | Styling & animations |

---

## Key Features & Implementation

### 1. Reactive Forms with Validation

**Login Component** implements Reactive Forms with multiple validators:

```typescript
loginForm = this.fb.group({
  username: [
    '',
    [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern(/^[a-zA-Z0-9_]+$/)
    ]
  ]
});
```

**Validation Rules:**
- Required field
- Minimum 3 characters
- Only alphanumeric and underscore characters

### 2. RxJS Observable Pattern

**Firebase Service** uses Observables for clean async operations:

```typescript
loadHighScore(username: string): Observable<number> {
  return new Observable<number>(observer => {
    const scoreRef = ref(db, `highscores/${username}`);
    const unsubscribe = onValue(scoreRef, (snapshot) => {
      observer.next(snapshot.val().score || 0);
    });
    return () => unsubscribe();
  });
}
```

**App Component** subscribes with proper cleanup:

```typescript
loadHighScore(username: string) {
  this.firebaseService
    .loadHighScore(username)
    .pipe(takeUntil(this.destroy$))
    .subscribe({ next: (score) => { ... } });
}
```

### 3. Service-Oriented Architecture

**GameLogicService** encapsulates all game rules:
- `determineWinner()` - Game logic
- `generateCPUChoice()` - Random selection
- `getPointsForResult()` - Score calculation
- `getEmoji()` - Emoji mapping

### 4. Environment Configuration

**Environment Files** manage Firebase credentials:

```typescript
// environment.ts
export const environment = {
  production: false,
  firebase: { /* config */ }
};
```

---

## Build Commands

```bash
npm start              # Development server (hot reload)
npm run build         # Optimized production build
npm test              # Run unit tests with Karma
npm run watch         # Watch mode with live rebuild
```

---

## Firebase Configuration

### Database Structure

```
/highscores
  /{username}
    ├── score: number          # Current high score
    ├── username: string       # Username reference
    └── lastUpdated: string    # ISO timestamp
```

### Configuration

Firebase credentials are stored in `src/environments/environment.ts` and `environment.prod.ts`

**Key Features:**
- Real-time database updates
- Automatic score persistence
- User-specific score tracking
- Timestamp tracking for audits

---

## Browser Compatibility

| Browser | Version | Support |
|---------|---------|---------|
| Chrome | Latest | ✅ Full |
| Firefox | Latest | ✅ Full |
| Safari | Latest | ✅ Full |
| Edge | Latest | ✅ Full |

---

## Performance & Optimization

- **Standalone Components** - Reduced bundle size
- **OnPush Change Detection** - Optional for optimization
- **Lazy Loading** - Component imports on demand
- **CSS Optimization** - Minified styles in production
- **Tree Shaking** - Unused code removal

---

## Development Notes

- **Local Storage** - Session data persists across page reloads
- **Username Validation** - Case-sensitive, alphanumeric only
- **High Scores** - Per-username, permanent Firebase storage
- **Match History** - Last 10 rounds displayed in reverse chronological order
- **Error Recovery** - Graceful fallbacks for Firebase connection issues

---

## File Management

- Username input accepts letters, numbers, and underscores
- Minimum 3 character requirement enforced
- Case-sensitive username matching
- All game data cleared on logout

---

## Code Quality

- **TypeScript Strict Mode** - Type safety throughout
- **Modular Architecture** - Reusable services
- **Separation of Concerns** - Logic, presentation, and data separated
- **Error Handling** - Try-catch blocks and Observable error handling
- **Code Comments** - Clear documentation where needed

---

## ✅ Implemented Enhancements

### 1. **Unit Tests** - Jasmine/Karma
- `game-logic.service.spec.ts` - 25+ test cases for game logic
- `login.component.spec.ts` - Form validation and submission tests
- `game.component.spec.ts` - Game flow and state management tests
- Run: `npm test`

### 2. **E2E Tests** - Cypress
- Comprehensive test suite in `cypress/e2e/game.cy.ts`
- Login flow validation
- Game play scenarios
- Responsive design testing
- Error handling verification
- Run: `npx cypress open`

### 3. **Dark Mode Support**
- `ThemeService` - Real-time theme switching
- CSS variables for seamless theming
- Persistent theme preference in localStorage
- System preference detection
- Smooth transitions between light/dark modes

### 4. **PWA Capabilities**
- Web App Manifest (`public/manifest.webmanifest`)
- Service Worker (`public/service-worker.js`)
- Offline support with cache-first strategy
- Install to home screen capability
- Add to taskbar functionality

### 5. **Leaderboard**
- `LeaderboardService` - Real-time top scores
- `LeaderboardComponent` - Standalone leaderboard display
- Top 10 scores with rankings
- Medal indicators (🥇 🥈 🥉)
- Real-time Firebase updates

### 6. **Statistics & Analytics**
- `StatisticsService` - Comprehensive player stats
- Track wins, losses, draws, streaks
- Win rate calculation
- Average points per game
- Longest win streak tracking
- Local storage persistence

### 7. **Multiplayer Foundations**
- Architecture ready for real-time multiplayer
- Firebase Realtime Database integration
- User presence tracking capability
- Match history synchronization

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Marx Björn Wiström**

---

⭐ If you like this project, please give it a star!

**Author:** Marx Björn Wiström  
**Date:** February 2026

