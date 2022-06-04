import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PuzzleService {

  constructor() { }

  calculatePuzzleIndex() {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    const startDate = new Date(environment.goLiveDate);
    const today = new Date();
    return Math.floor((today.getTime() - startDate.getTime()) / _MS_PER_DAY) + 1;
  }
}
