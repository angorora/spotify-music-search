import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlbumsComponent } from './core/components/albums/albums.component';
import { HomeComponent } from './core/components/home/home.component';
import { TracksComponent } from './core/components/tracks/tracks.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'albums',
    component: AlbumsComponent,
  },
  {
    path: 'tracks',
    component: TracksComponent,
  },
  {
    path: 'error',
    component: HomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
