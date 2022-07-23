import { HistoryService } from './../../services/history.service';
import { StateService } from './../../services/state.service';
import { PuzzleImageComponent } from './../puzzle-image/puzzle-image.component';
import { DataService } from './../../services/data.service';
import { IAlbum } from './../../models/IAlbum';
import { Component, Input, OnInit, ViewChildren, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { autocomplete } from 'src/assets/scripts/autocomplete';
import { Guess } from 'src/app/models/guess';

@Component({
  selector: 'app-puzzle',
  templateUrl: './puzzle.component.html',
  styleUrls: ['./puzzle.component.sass']
})
export class PuzzleComponent implements OnInit, OnDestroy {
  @ViewChildren(PuzzleImageComponent) puzzleImageComponent!: PuzzleImageComponent;
  @Input() title: string = '';
  @Input() puzzleIndex: number = 0;
  @Input() puzzleMode: string = 'daily';

  gameMode = 'play';
  levels = [40, 25, 15, 10, 5, 2];
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

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.dataService.getAlbumApiData().subscribe({
        next: response => {
          this.puzzleData = response.result;
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
    this.answer = this.puzzleData.filter(m => m.id != null && m.id?.toString() === this.puzzleNumber?.toString())[0];
    this.img1.width = 300;
    this.img1.height = 300;
    this.img1.onload = () => {
      if (this.gameMode === 'play') {
        this.showCurrentLevelImage();
      } else {
        this.renderImage(1);
      }
    };
    
    this.img1.setAttribute('crossOrigin', '');
    this.img1.src = this.answer!.coverArt;
  }

  submitGuess(): void {
    const submission = this.getGuessField();
    if (submission.toLowerCase().trim() == (`${this.answer?.artist} - ${this.answer?.albumTitle}`).toLowerCase()) {
      this.handleCorrectAnswer(submission);
    } else {
      this.handleIncorrectAnswer(submission);
    }
  }

  share(): void {

    const textToShare = `#PopIdle #${this.puzzleNumber} #PopIdle${this.puzzleNumber}

${this.getResultEmojiBoard()}

${this.getPuzzleUrl()}`;

    if (navigator.share) { 
      navigator.share({
        files: this.generateImageAsShareableFile(),
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
  getPuzzleUrl() {
    return this.puzzleMode !== 'daily'
        ? `https://popidle.the-sound.co.uk/guess-the-album/${this.puzzleIndex + 1}`
        : 'https://popidle.the-sound.co.uk';
  }

  private getResultEmojiBoard(): string {
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
    this.saveResult();
  }

  private saveResult() {
    if (this.puzzleMode === 'daily') {
      this.historyService.storeResult(
        this.gameMode, this.guesses.length, this.puzzleNumber!);
    }
  }

  private handleIncorrectAnswer(submission: string) {
    this.logGuess("incorrect", submission);
    this.setGuessField('');
    if (this.guesses.length == this.levels.length) {
      this.renderImage(1);
      this.gameMode = 'lost';
      this.saveResult();
    } else {
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
    const numberOfPuzzles = this.puzzleData.filter(d => d.id != null).length;
    return (this.puzzleIndex % numberOfPuzzles) + 1;
  }

  private showCurrentLevelImage(): void {
    this.renderImage(this.levels[this.guesses.length]);
  }

  private generateImage(pixelSize: number): HTMLImageElement {
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
    const dimension = window.innerWidth < window.innerHeight ? window.innerWidth : window.innerHeight;
    img2.width = dimension;
    img2.height = dimension;
    img2.id = "puzzle-image";

    return img2;
  }

  private generateImageAsShareableFile(): File[] {
    const result: File[] = [];
    const img = this.generateImage(this.levels[0]);
    fetch(img.src)
      .then(response => response.blob())
      .then(blob => {
        result.push(
          new File(
            [blob],
            'popidle.png',
            {
              type: blob.type,
              lastModified: new Date().getTime()
            }
          ));
      });
    return result;
  }

  private renderImage(pixelSize: number): void {

    const img = this.generateImage(pixelSize);
    
    document.getElementById("puzzle-image")?.remove();
    document.getElementById("puzzle-box")?.appendChild(img);
    img.tabIndex = -1;
    img.focus();
  }

  private setGuessField(textToFill: string): void {
    (<HTMLInputElement>document.getElementById("guess")).value = textToFill;
  }

  private getGuessField(): string {
    return (<HTMLInputElement>document.getElementById("guess")).value;
  }

  private saveState(): void {
    if (this.puzzleMode === 'daily') {
      this.stateService.setState(
        this.puzzleNumber!,
        this.guesses
      );
    }
  }
}

