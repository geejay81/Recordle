import { PuzzleImageComponent } from './../puzzle-image/puzzle-image.component';
import { DataService } from './../../services/data.service';
import { IAlbum } from './../../models/IAlbum';
import { Component, OnInit, ViewChildren } from '@angular/core';
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
  
  constructor(
    private dataService: DataService
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
    this.puzzleNumber = this.getIdForTodaysPuzzle();
    this.answer = this.puzzleData.filter(m => m.id.toString() === this.puzzleNumber?.toString())[0];
    this.img1.width = 300;
    this.img1.height = 300;
    this.img1.onload = () => {
      this.renderImage();
    };
    this.img1.src = `../../../assets/images/albums/${this.puzzleNumber}.jpg`;
  }

  submitGuess(): void {
    const submission = (<HTMLInputElement>document.getElementById("guess")).value;
    if (submission.toLowerCase().trim() == (`${this.answer?.artist} - ${this.answer?.albumTitle}`).toLowerCase()) {
      this.handleCorrectAnswer(submission);
    } else {
      this.handleIncorrectAnswer(submission);
    }
  }

  private handleCorrectAnswer(submission: string) {
    this.logGuess("correct", submission);
    (<HTMLInputElement>document.getElementById("guess")).value = '';
    // TODO: show won screen.
  }

  private handleIncorrectAnswer(submission: string) {
    this.logGuess("incorrect", submission);
    (<HTMLInputElement>document.getElementById("guess")).value = '';
    if (this.guesses.length == this.levels.length) {
      // TODO: show lost screen.
    } else {
      // TODO: prepare next go.
      this.level++;
      this.renderImage();
    }
  }

  private logGuess(result: string, answer: string) {
    const guessToLog = new Guess();
    guessToLog.answer = answer;
    guessToLog.result = result;
    this.guesses.push(guessToLog);
  }

  private getIdForTodaysPuzzle(): number {
    return 2;
  }

  private renderImage(): void {

    const w = this.img1.width;
    const h = this.img1.height;
    
    this.c.width = w;
    this.c.height = h;
    this.ctx!.drawImage(this.img1, 0, 0);

    let pixelArr = this.ctx!.getImageData(0, 0, w, h).data;

    const sample_size = this.levels[this.level];
    
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
    //levelTitle.innerHTML = "Level " + level;
    img2.tabIndex = -1;
    img2.focus();
  }
}

