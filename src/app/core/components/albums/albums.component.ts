import { Component, OnInit } from '@angular/core';
import { Navigate } from '@ngxs/router-plugin';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Album } from 'src/app/shared/models/artist.model';
import { NavigateBackService } from 'src/app/core/services/navigate-back.service';
import { ChangePageTitle, NavigatedRoute } from 'src/app/store/app/app.actions';
import { AppState } from 'src/app/store/app/app.state';
import { SaveSelectedAlbum } from 'src/app/store/artist/artist.actions';
import { ArtistState } from 'src/app/store/artist/artist.state';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss'],
})

//TODO Add more media query breakpoints
export class AlbumsComponent implements OnInit {
  @Select(ArtistState.selectedArtistAlbums)
  albums$: Observable<Album[]>;
  @Select(AppState.previousRoute)
  previousRoute$: Observable<string>;
  constructor(private store: Store, private nav: NavigateBackService) {}

  ngOnInit(): void {
    this.store.dispatch(new ChangePageTitle('View Albums'));
  }
  gotoAlbumDetails(album) {
    this.saveSelectedALbum(album);

    this.store.dispatch(new NavigatedRoute('/albums'));
    this.store.dispatch(new Navigate(['/album-details']));
  }
  saveSelectedALbum(album: Album) {
    this.store.dispatch(new SaveSelectedAlbum(album));
  }
  navigateBack() {
    this.nav.navigateBack();
  }

  trackByFn(album: Album) {
    return album.id;
  }
}
