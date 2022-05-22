import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-spotify-widget',
  templateUrl: './spotify-widget.component.html',
  styleUrls: ['./spotify-widget.component.sass']
})
export class SpotifyWidgetComponent implements OnInit {

  @Input() albumId: string = 'xxx';

  constructor() { }

  ngOnInit(): void {
  }
}
