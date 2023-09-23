import { IGuess } from './../../models/guess';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-puzzle-guess-log',
  templateUrl: './puzzle-guess-log.component.html'
})
export class PuzzleGuessLogComponent implements OnInit {

  @Input() guesses: IGuess[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  getBoxWrapperClass(box: number): string {
    if (box > this.guesses.length) return 'icon has-text-light';
    if (this.guesses[box - 1]?.result == 'correct') return 'icon has-text-success';
    if (this.guesses[box - 1]?.result == 'incorrect') return 'icon has-text-danger';
    if (this.guesses[box - 1]?.result == 'nearly') return 'icon has-text-warning';
    return 'icon has-text-light';
  }

  getBoxIconClass(box: number): string {
    if (box > this.guesses.length) return 'fa-solid fa-lg fa-square';
    if (this.guesses[box - 1]?.result == 'correct') return 'fa-solid fa-lg fa-square-check';
    return 'fa-solid fa-lg fa-square-xmark';
  }
}
