import { HistoryService } from './../../services/history.service';
import { IHistory } from './../../models/history';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stats-detail',
  templateUrl: './stats-detail.component.html',
  styleUrls: ['./stats-detail.component.sass']
})
export class StatsDetailComponent implements OnInit {
  statistics!: IHistory;

  constructor(
    private historyService: HistoryService
  ) { }

  ngOnInit(): void {
    this.statistics = this.historyService.gethistory();
  }

}
