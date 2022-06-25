import { AlbumHistoryComponent } from './routes/album-history/album-history.component';
import { PageNotFoundComponent } from './routes/page-not-found/page-not-found.component';
import { PreviousGuessTheAlbumComponent } from './routes/previous-guess-the-album/previous-guess-the-album.component';
import { GuessTheAlbumComponent } from './routes/guess-the-album/guess-the-album.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'album-history', component: AlbumHistoryComponent },
  { path: 'guess-the-album', component: GuessTheAlbumComponent },
  { path: 'guess-the-album/:id', component: PreviousGuessTheAlbumComponent },
  { path: 'page-not-found', component: PageNotFoundComponent },
  { path: '', redirectTo: '/guess-the-album', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
