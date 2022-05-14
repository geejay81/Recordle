import { DataService } from './../../services/data.service';
import { IAlbum } from './../../models/IAlbum';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-puzzle',
  templateUrl: './puzzle.component.html',
  styleUrls: ['./puzzle.component.sass']
})
export class PuzzleComponent implements OnInit {

  puzzleData: IAlbum[] = [];
  puzzleNumber: number | undefined;
  answer: IAlbum | undefined;
  subscriptions: Subscription[] = [];

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this.dataService.getAlbumSourceData().subscribe({
        next: response => {
          this.puzzleData = response;
          this.initialisePuzzle();
        },
        error: err => console.log(err)
      })
    );
  }

  initialisePuzzle(): void {
    this.puzzleNumber = this.getIdForTodaysPuzzle();
    this.answer = this.puzzleData.filter(m => m.id === this.puzzleNumber?.toString())[0];
  }

  private getIdForTodaysPuzzle(): number {
    return 1;
  }

}
