import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.sass']
})
export class GameComponent implements OnInit {

  @Input() gameTitle: string = '';
  @Input() gameImageUrl: string = '';
  @Input() gameUrl: string = '';
  @Input() gameDescription: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
