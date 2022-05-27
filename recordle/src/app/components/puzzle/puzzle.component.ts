import { HistoryService } from './../../services/history.service';
import { StateService } from './../../services/state.service';
import { PuzzleImageComponent } from './../puzzle-image/puzzle-image.component';
import { DataService } from './../../services/data.service';
import { IAlbum } from './../../models/IAlbum';
import { Component, Input, OnInit, ViewChildren } from '@angular/core';
import { Subscription } from 'rxjs';
import { autocomplete } from 'src/assets/scripts/autocomplete';
import { Guess } from 'src/app/models/guess';

@Component({
  selector: 'app-puzzle',
  templateUrl: './puzzle.component.html',
  styleUrls: ['./puzzle.component.sass']
})
export class PuzzleComponent implements OnInit {
  @ViewChildren(PuzzleImageComponent) puzzleImageComponent!: PuzzleImageComponent;
  @Input() title: string = '';

  gameMode = 'play';
  levels = [40, 30, 20, 15, 10, 5];
  level = 0;
  puzzleData: IAlbum[] = [];
  puzzleNumber: number | undefined;
  answer: IAlbum | undefined;
  subscriptions: Subscription[] = [];
  c = document.createElement("canvas");
  ctx = this.c.getContext('2d');
  img1 = new Image();
  guessInput = document.getElementById("guess");
  guesses: Guess[] = [];
  correctBox = '🟩';
  incorrectBox = '🟥';
  skippedBox = '⬜';
  
  constructor(
    private dataService: DataService,
    private historyService: HistoryService,
    private stateService: StateService
  ) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this.dataService.getAlbumSourceData().subscribe({
        next: response => {
          this.puzzleData = response;
          this.initialisePuzzle();
          this.initialiseAutocomplete();
        },
        error: err => console.log(err)
      })
    );
  }

  initialiseAutocomplete(): void {
    const matches = 
      this.puzzleData
        .map(album => `${album["artist"]} - ${album["albumTitle"]}`)
        .sort();
    
    autocomplete(this.guessInput, matches);
  }

  initialisePuzzle(): void {
    const existingState = this.stateService.getState();
    this.puzzleNumber = this.getIdForTodaysPuzzle();
    if (this.puzzleNumber == existingState.puzzleNumber) {
      this.guesses = existingState.guesses;
      if (this.guesses[this.guesses.length - 1].result == 'correct') {
        this.gameMode = 'won';
      } else if (this.guesses.length === 6) {
        this.gameMode = 'lost';
      }
    };
    this.answer = this.puzzleData.filter(m => m.id.toString() === this.puzzleNumber?.toString())[0];
    this.img1.width = 300;
    this.img1.height = 300;
    this.img1.onload = () => {
      this.showCurrentLevelImage();
    };
    this.img1.src = `../../../assets/images/albums/${this.puzzleNumber}.jpg`;
  }

  submitGuess(): void {
    const submission = this.getGuessField();
    if (submission.toLowerCase().trim() == (`${this.answer?.artist} - ${this.answer?.albumTitle}`).toLowerCase()) {
      this.handleCorrectAnswer(submission);
    } else {
      this.handleIncorrectAnswer(submission);
    }
  }

  getBoxWrapperClass(box: number): string {
    if (box > this.guesses.length) return 'icon has-text-light';
    if (this.guesses[box - 1]?.result == 'correct') return 'icon has-text-success';
    if (this.guesses[box - 1]?.result == 'incorrect') return 'icon has-text-danger';
    return 'icon has-text-light';
  }

  getBoxIconClass(box: number): string {
    if (box > this.guesses.length) return 'fa-solid fa-square';
    if (this.guesses[box - 1]?.result == 'correct') return 'fa-solid fa-square-check';
    if (this.guesses[box - 1]?.result == 'incorrect') return 'fa-solid fa-square-xmark';
    return 'fa-solid fa-square';
  }

  share(): void {

    const textToShare = `
    #PopIdle #${this.puzzleNumber}

    ${this.getResultEmojiBoard()}

    https://popidle.the-sound.co.uk
    `;

    if (navigator.share) { 
      navigator.share({
         title: `PopIdle #${this.puzzleNumber}`,
         text: textToShare
      })
      .then(() => {
        console.log('Thanks for sharing!');
      })
      .catch(console.error);
    } else {
      // Copy to clipboard instead ...
      navigator.clipboard.writeText(textToShare).then(() => {
        alert("Result to clipboard");
      });
    };
  }

  getResultEmojiBoard(): string {
    let result = '';

    for (let i = 0; i < this.guesses.length; i++) {
      switch (this.guesses[i].result) {
        case 'correct':
          result += this.correctBox;
          break;
        case 'incorrect':
          result += this.incorrectBox;
          break;
        default:
          result += this.skippedBox;
          break;
      }
    }

    for (let i = 0; i < (6 - this.guesses.length); i++) {
      result += this.skippedBox;
    }

    return result;
  }

  private handleCorrectAnswer(submission: string) {
    this.logGuess("correct", submission);
    this.setGuessField('');
    this.renderImage(1);
    this.gameMode = 'won';
    this.historyService.storeResult(this.gameMode, this.guesses.length);
  }

  private handleIncorrectAnswer(submission: string) {
    this.logGuess("incorrect", submission);
    this.setGuessField('');
    if (this.guesses.length == this.levels.length) {
      this.renderImage(1);
      this.gameMode = 'lost';
      this.historyService.storeResult(this.gameMode, this.guesses.length);
    } else {
      this.level++;
      this.showCurrentLevelImage();
    }
  }

  private logGuess(result: string, answer: string) {
    const guessToLog = new Guess();
    guessToLog.answer = answer;
    guessToLog.result = result;
    this.guesses.push(guessToLog);
    this.saveState();
  }

  private getIdForTodaysPuzzle(): number {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    const startDate = new Date('2022-05-21');
    const today = new Date();
    return Math.floor((today.getTime() - startDate.getTime()) / _MS_PER_DAY) + 1;
  }

  private showCurrentLevelImage(): void {
    this.renderImage(this.levels[this.level]);
  }

  private renderImage(pixelSize: number): void {

    const w = this.img1.width;
    const h = this.img1.height;
    
    this.c.width = w;
    this.c.height = h;
    this.ctx!.drawImage(this.img1, 0, 0);

    let pixelArr = this.ctx!.getImageData(0, 0, w, h).data;

    const sample_size = pixelSize;
    
    for (let y = 0; y < h; y += sample_size) {
        for (let x = 0; x < w; x += sample_size) {
        let p = (x + (y * w)) * 4;
        this.ctx!.fillStyle = "rgba(" + pixelArr![p] + "," + pixelArr![p + 1] + "," + pixelArr![p + 2] + "," + pixelArr![p + 3] + ")";
        this.ctx!.fillRect(x, y, sample_size, sample_size);
        }
    }
    
    let img2 = new Image();
    img2.src = this.c.toDataURL("image/jpeg");
    img2.width = 300;
    
    document.getElementById("puzzle-image")?.remove();
    img2.id = "puzzle-image";
    document.getElementById("puzzle-box")?.appendChild(img2);
    img2.tabIndex = -1;
    img2.focus();
  }

  private setGuessField(textToFill: string): void {
    (<HTMLInputElement>document.getElementById("guess")).value = textToFill;
  }

  private getGuessField(): string {
    return (<HTMLInputElement>document.getElementById("guess")).value;
  }

  private saveState(): void {
    this.stateService.setState(
      this.puzzleNumber!,
      this.guesses
    );
  }
}

