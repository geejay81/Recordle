import { Injectable } from '@angular/core';
import { History, IGuessHistory, IHistory } from '../models/history';

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

  storeResult(result: string, guesses: number, puzzleNumber: number): void {
    let currentHistory = this.gethistory();
    currentHistory.gamesPlayed = currentHistory.gamesPlayed + 1;
    currentHistory.gamesWon = currentHistory.gamesWon + (result === 'won' ? 1: 0);
    currentHistory.winPercentage = (currentHistory.gamesWon / currentHistory.gamesPlayed) * 100.00;
    if (
      currentHistory.previousGame !== 0 && 
      currentHistory.previousGame !== (puzzleNumber - 1) &&
      currentHistory.previousGame !== 1) { // TODO: remove this after 2022-08-09
      currentHistory.currentStreak = 0;
    }
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
    currentHistory.averageGuesses = this.calculateAverageGuesses(currentHistory.guesses, currentHistory.gamesPlayed);
    currentHistory.previousGame = puzzleNumber;
    localStorage.setItem(this.historyStorageKey, JSON.stringify(currentHistory));
  }

  private calculateAverageGuesses(guesses: IGuessHistory, gamesPlayed: number): number {
    const totalGuesses = 
      (guesses.one * 1) +
      (guesses.two * 2) +
      (guesses.three * 3) +
      (guesses.four * 4) +
      (guesses.five * 5) +
      (guesses.six * 6) +
      (guesses.fail * 6);

    return Number((totalGuesses / gamesPlayed).toPrecision(3));
  }
}
