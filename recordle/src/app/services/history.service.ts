import { Injectable } from '@angular/core';
import { History, IHistory } from '../models/history';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  historyStorageKey = 'popidle-history';

  constructor() { }

  gethistory(): IHistory {
    const existingHistory = localStorage.getItem(this.historyStorageKey);
    if (existingHistory !== null) 
      return Object.assign(new History(), JSON.parse(existingHistory));
    return new History();
  }

  storeResult(result: string, guesses: number): void {
    let currentHistory = this.gethistory();
    currentHistory.gamesPlayed = currentHistory.gamesPlayed + 1;
    currentHistory.gamesWon = currentHistory.gamesWon + (result === 'won' ? 1: 0);
    currentHistory.winPercentage = (currentHistory.gamesWon / currentHistory.gamesPlayed) * 100.00;
    currentHistory.currentStreak = result === 'won' 
      ? currentHistory.currentStreak + 1
      : 0;
    currentHistory.maxStreak = currentHistory.currentStreak > currentHistory.maxStreak
      ? currentHistory.currentStreak
      : currentHistory.maxStreak;
    if (result === 'won') {
      switch (guesses) {
        case 1:
          currentHistory.guesses.one = currentHistory.guesses.one + 1;
          break;
        case 2:
          currentHistory.guesses.two = currentHistory.guesses.two + 1;
          break;
        case 3:
          currentHistory.guesses.three = currentHistory.guesses.three + 1;
          break;
        case 4:
          currentHistory.guesses.four = currentHistory.guesses.four + 1;
          break;
        case 5:
          currentHistory.guesses.five = currentHistory.guesses.five + 1;
          break;
        case 6:
          currentHistory.guesses.six = currentHistory.guesses.six + 1;
          break;
      }
    } else {
      currentHistory.guesses.fail = currentHistory.guesses.fail + 1;
    }
    localStorage.setItem(this.historyStorageKey, JSON.stringify(currentHistory));
  }
}
