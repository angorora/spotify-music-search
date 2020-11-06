import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ArtistListComponent } from './components/artist-list/artist-list.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { AlbumsComponent } from './components/albums/albums.component';
import { TracksComponent } from './components/tracks/tracks.component';
import { AlbumCardComponent } from './components/album-card/album-card.component';
import { AlbumDetailsComponent } from './components/album-details/album-details.component';

@NgModule({
  declarations: [
    ArtistListComponent,
    HomeComponent,
    ErrorComponent,
    AlbumCardComponent,
    AlbumsComponent,
    TracksComponent,
    AlbumDetailsComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule],
})
export class CoreModule {}
