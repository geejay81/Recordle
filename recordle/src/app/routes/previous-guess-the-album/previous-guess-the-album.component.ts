import { PuzzleService } from './../../services/puzzle.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

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
    private router: Router
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

        if (this.puzzleIndex > this.puzzleService.calculatePuzzleIndex()) {

          throw 'Puzzle does not exist.';
        };

      } catch (e) {

        this.router.navigate(['/page-not-found']);
      }
    });
  }
}
