import { IGuess } from "./guess";

export interface IState {
    puzzleNumber: number,
    guesses: IGuess[]
};

export class State implements IState {
    puzzleNumber: number = 0;
    guesses: IGuess[] = [];
}