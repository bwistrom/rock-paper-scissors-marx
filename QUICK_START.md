# Quick Start Guide - Angular Rock, Paper, Scissors Game

## ⚡ Quick Setup (2 minutes)

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start Development Server
```bash
ng serve
```

### Step 3: Open Browser
Navigate to `http://localhost:4200`

---

## 🎮 How to Use the Game

1. **Enter Username** - Type a username (minimum 3 characters) and click "Login & Play"
2. **Choose Your Move** - Click on Rock 🪨, Paper 📄, or Scissors ✂️
3. **See Result** - The game shows your choice, CPU's choice, and who won
4. **View Score** - Your current score updates instantly
5. **Repeat** - Click "Play Again" to play more rounds
6. **Logout** - Click logout when you're done

---

## 📊 Scoring

| Result | Points |
|--------|--------|
| Win    | +1     |
| Loss   | -1     |
| Draw   | 0      |

Your **High Score** is automatically saved to Firebase!

---

## 🔧 Available Commands

```bash
ng serve              # Start development server (http://localhost:4200)
npm run build         # Create production build
npx jest              # Run unit tests
npm run watch         # Watch mode - rebuild on changes
```

---

## 📁 Project Files

**Key Files to Know:**

| File | Purpose |
|------|---------|
| `src/components/Login.js` | Login form component |
| `src/components/Game.js` | Game logic component |
| `src/App.js` | Root component (state management) |
| `src/firebase.js` | Firebase integration service |
| `src/main.ts` | Angular bootstrap file |

---

## 🔥 Firebase Integration

The game uses Firebase Realtime Database to store high scores:
- High scores are saved automatically when beaten
- Scores persist across sessions
- Your score is tied to your username

Configuration in `src/firebase.js`

---

## 📱 Responsive Design

The game works perfectly on:
- Desktop computers
- Tablets
- Mobile phones

All styling adapts automatically!

---

## ✅ Features

- ✅ Local login (no signup needed)
- ✅ Play against CPU
- ✅ Real-time score tracking
- ✅ High score persistence (Firebase)
- ✅ Match history (last 10 rounds)
- ✅ Beautiful animations
- ✅ Mobile responsive

---

## 🆘 Troubleshooting

### Port 4200 already in use?
```bash
ng serve --port 4300
```

### Module not found errors?
```bash
npm install
```

### Firebase not connecting?
Check that your Firebase config in `src/firebase.js` is correct

---

## 📚 Additional Resources

- [README.md](./README.md) - Full project documentation
- [Angular Documentation](https://angular.io/docs)

---

## 🚀 Tips

- The game generates a random CPU choice each round
- Your high score only updates if you beat it
- All scores are saved in real-time
- Click "Play Again" quickly to play multiple rounds
- Your username appears in all saved scores

---

**Enjoy the game! // Marx🎮**

PS. My personal firebase credentials is included in order for the leaderboard should be collaborative so please don´t ruin this feature . DS 
