import { PuzzleService } from './../../services/puzzle.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-album-history',
  templateUrl: './album-history.component.html',
  styleUrls: ['./album-history.component.sass']
})
export class AlbumHistoryComponent implements OnInit {
  previousPuzzles: number[] = [];

  constructor(private puzzleService: PuzzleService) { }

  ngOnInit(): void {
    for (let i = 0; i < this.puzzleService.calculatePuzzleIndex(); i++) {
      this.previousPuzzles.push(i + 1);
    };
  }

}
