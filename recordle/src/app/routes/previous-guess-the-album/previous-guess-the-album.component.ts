import { PuzzleService } from './../../services/puzzle.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Meta } from '@angular/platform-browser';
import { SeoService } from 'src/app/services/seo.service';

@Component({
  selector: 'app-previous-guess-the-album',
  templateUrl: './previous-guess-the-album.component.html',
  styleUrls: ['./previous-guess-the-album.component.sass']
})
export class PreviousGuessTheAlbumComponent implements OnInit, OnDestroy {
  puzzleIndex: number = 0;
  puzzleMode: string = 'history';
  parameterSubscription$: Subscription = new Subscription();
  
  constructor(
    private puzzleService: PuzzleService,
    private route: ActivatedRoute,
    private router: Router,
    private seoService: SeoService
  ) { }

  ngOnDestroy(): void {
    this.parameterSubscription$.unsubscribe();
  }

  ngOnInit(): void {
    this.parameterSubscription$ = this.route.params.subscribe(params => {
      try {

        const id = params['id'];

        if (isNaN(id) || id < 1) {
          
          throw 'Puzzle does not exist.';
        };

        this.puzzleIndex = (+params['id']) - 1;

        this.seoService.configureSeo(
          `PopIdle - Guess the album puzzle #${this.puzzleIndex + 1}`, "Can you guess the album from the pixelated images of the cover art?");

        if (this.puzzleIndex > this.puzzleService.calculatePuzzleIndex()) {
          throw 'Puzzle does not exist.';
        };

      } catch (e) {

        this.router.navigate(['/page-not-found']);
      }
    });
  }
}
