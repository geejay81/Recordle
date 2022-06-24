import { PuzzleService } from './../../services/puzzle.service';
import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { SeoService } from 'src/app/services/seo.service';

@Component({
  selector: 'app-guess-the-album',
  templateUrl: './guess-the-album.component.html',
  styleUrls: ['./guess-the-album.component.sass']
})
export class GuessTheAlbumComponent implements OnInit {

  puzzleIndex: number = 0;
  puzzleMode: string = 'daily';

  constructor(
    private puzzleService: PuzzleService,
    private seoService: SeoService
  ) { }

  ngOnInit(): void {
    this.puzzleIndex = this.puzzleService.calculatePuzzleIndex();
    this.seoService.configureSeo(
      "PopIdle - Guess today's album puzzle", "Can you guess the album from the pixelated images of the cover art?");
  }
}
