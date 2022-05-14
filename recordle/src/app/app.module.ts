import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GuessTheAlbumComponent } from './routes/guess-the-album/guess-the-album.component';
import { NavbarComponent } from './page-elements/navbar/navbar.component';
import { FooterComponent } from './page-elements/footer/footer.component';
import { PuzzleComponent } from './components/puzzle/puzzle.component';

@NgModule({
  declarations: [
    AppComponent,
    GuessTheAlbumComponent,
    NavbarComponent,
    FooterComponent,
    PuzzleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
