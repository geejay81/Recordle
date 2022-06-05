import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GuessTheAlbumComponent } from './routes/guess-the-album/guess-the-album.component';
import { NavbarComponent } from './page-elements/navbar/navbar.component';
import { FooterComponent } from './page-elements/footer/footer.component';
import { PuzzleComponent } from './components/puzzle/puzzle.component';
import { PuzzleImageComponent } from './components/puzzle-image/puzzle-image.component';
import { SpotifyWidgetComponent } from './components/spotify-widget/spotify-widget.component';
import { UriPipe } from './pipes/uri.pipe';
import { StatsComponent } from './components/stats/stats.component';
import { HowToComponent } from './components/how-to/how-to.component';
import { StatsDetailComponent } from './components/stats-detail/stats-detail.component';
import { PreviousGuessTheAlbumComponent } from './routes/previous-guess-the-album/previous-guess-the-album.component';
import { PageNotFoundComponent } from './routes/page-not-found/page-not-found.component';
import { AlbumHistoryComponent } from './routes/album-history/album-history.component';
import { PuzzleGuessLogComponent } from './components/puzzle-guess-log/puzzle-guess-log.component';

@NgModule({
  declarations: [
    AppComponent,
    GuessTheAlbumComponent,
    NavbarComponent,
    FooterComponent,
    PuzzleComponent,
    PuzzleImageComponent,
    SpotifyWidgetComponent,
    UriPipe,
    StatsComponent,
    HowToComponent,
    StatsDetailComponent,
    PreviousGuessTheAlbumComponent,
    PageNotFoundComponent,
    AlbumHistoryComponent,
    PuzzleGuessLogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
