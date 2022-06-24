import { PuzzleService } from './../../services/puzzle.service';
import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { SeoService } from 'src/app/services/seo.service';

@Component({
  selector: 'app-album-history',
  templateUrl: './album-history.component.html',
  styleUrls: ['./album-history.component.sass']
})
export class AlbumHistoryComponent implements OnInit {
  previousPuzzles: number[] = [];

  constructor(
    private puzzleService: PuzzleService,
    private seoService: SeoService) { }

  ngOnInit(): void {
    for (let i = 0; i < this.puzzleService.calculatePuzzleIndex(); i++) {
      this.previousPuzzles.push(i + 1);
    };
    this.seoService.configureSeo(
      "PopIdle - Album puzzle history", "View the back catalogue of PopIdle puzzles to fill the gap until the next daily puzzle is released.");
  }
}
