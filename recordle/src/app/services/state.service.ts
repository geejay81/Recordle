import { IState, State } from './../models/state';
import { Injectable } from '@angular/core';
import { IGuess } from './../models/guess';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  stateKey: string = "popidle-albums-state";

  constructor() { }

  getState(): IState {
    const existingState = localStorage.getItem(this.stateKey);
    if (existingState !== null) 
      return Object.assign(new State(), JSON.parse(existingState));
    return new State();
  }

  setState(puzzleNumber: number, guesses: IGuess[]): void {
    let state = new State();
    state.puzzleNumber = puzzleNumber;
    state.guesses = guesses;
    localStorage.setItem(this.stateKey, JSON.stringify(state));
  }
}
