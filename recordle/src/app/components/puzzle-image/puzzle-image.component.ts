import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-puzzle-image',
  templateUrl: './puzzle-image.component.html',
  styleUrls: ['./puzzle-image.component.sass']
})
export class PuzzleImageComponent implements OnInit {

  level = 0;
  puzzleNumber: number = 0;

  constructor() {}

  ngOnInit() {
  }

  renderImage(puzzleNumber: number, level: number) {
    this.level = level;
    this.puzzleNumber = puzzleNumber;
  }

}
