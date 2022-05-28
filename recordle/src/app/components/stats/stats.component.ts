import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.sass']
})
export class StatsComponent implements OnInit {

  @Output() closeStats = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  closeClicked() {
    this.closeStats.emit();
  }
}
