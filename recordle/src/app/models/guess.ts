export interface IGuess {
    result: string,
    answer: string
}

export class Guess implements IGuess {
    result: string = "";
    answer: string = "";
}