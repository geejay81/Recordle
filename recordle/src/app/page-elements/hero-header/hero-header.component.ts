import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-hero-header',
  templateUrl: './hero-header.component.html',
  styleUrls: ['./hero-header.component.sass']
})
export class HeroHeaderComponent implements OnInit {
  @Input() pageTitle = '';
  
  constructor() { }

  ngOnInit(): void {
  }

}
