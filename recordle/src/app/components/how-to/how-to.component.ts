import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-how-to',
  templateUrl: './how-to.component.html',
  styleUrls: ['./how-to.component.sass']
})
export class HowToComponent implements OnInit {

  @Output() closeStats = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  closeClicked() {
    this.closeStats.emit();
  }
}
