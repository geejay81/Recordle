import { Component, OnInit } from '@angular/core';

declare var cookieconsent: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {
  showHowTo: boolean = false;
  showStats: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  openHowToModal(e: Event) {
    e.preventDefault();
    this.showHowTo = true;
  }

  openCookieConsent(e: Event) {
    e.preventDefault();
    cookieconsent.openPreferencesCenter();
  }

  closeHowToModal() {
    this.showHowTo = false;
  }

  openStatsModal(e: Event) {
    e.preventDefault();
    this.showStats = true;
  }

  closeStatsModal() {
    this.showStats = false;
  }

}
