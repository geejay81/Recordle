import { GuessTheAlbumComponent } from './routes/guess-the-album/guess-the-album.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'guess-the-album', component: GuessTheAlbumComponent },
  { path: '', redirectTo: '/guess-the-album', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
