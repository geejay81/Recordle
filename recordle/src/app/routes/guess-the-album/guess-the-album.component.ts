import { PuzzleService } from './../../services/puzzle.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-guess-the-album',
  templateUrl: './guess-the-album.component.html',
  styleUrls: ['./guess-the-album.component.sass']
})
export class GuessTheAlbumComponent implements OnInit {

  puzzleIndex: number = 0;
  puzzleMode: string = 'daily';

  constructor(
    private puzzleService: PuzzleService
  ) { }

  ngOnInit(): void {
    this.puzzleIndex = this.puzzleService.calculatePuzzleIndex();
  }
}
