import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtistListComponent } from './components/artist-list/artist-list.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './compponents/error/error.component';



@NgModule({
  declarations: [ArtistListComponent, HomeComponent, ErrorComponent],
  imports: [
    CommonModule
  ]
})
export class CoreModule { }
