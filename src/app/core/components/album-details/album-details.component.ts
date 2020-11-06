import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import {
  Album,
  Artist,
  Image,
  Track,
} from 'src/app/shared/models/artist.model';
import { NavigateBackService } from 'src/app/shared/services/navigate-back.service';
import { ChangePageTitle } from 'src/app/store/app/app.actions';
import { ArtistState } from 'src/app/store/artist/artist.state';

@Component({
  selector: 'app-album-details',
  templateUrl: './album-details.component.html',
  styleUrls: ['./album-details.component.scss'],
})
export class AlbumDetailsComponent implements OnInit {
  @Select(ArtistState.selectedAlbumImages)
  image$: Observable<Image>;
  @Select(ArtistState.selectedAlbumTracks)
  tracks$: Observable<Track[]>;
  @Select(ArtistState.selectedAlbumArtists)
  artists$: Observable<Artist[]>;
  @Select(ArtistState.selectedAlbumTitle)
  title$: Observable<string>;
  trackSub: Subscription;

  constructor(private store: Store, private nav: NavigateBackService) {}

  ngOnInit(): void {
    this.store.dispatch(new ChangePageTitle('View Album Details'));
  }

  navigateBack() {
    this.nav.navigateBack();
  }
  trackByFn(index, album: Album) {
    return album.id;
  }
  previewTrack(url) {
    window.open(url, '_blank');
  }
}
