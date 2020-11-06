import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Navigate } from '@ngxs/router-plugin';
import { Select, Store } from '@ngxs/store';
import { fromEvent, Observable, Subscription } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  startWith,
  switchMap,
} from 'rxjs/operators';
import { Artist } from 'src/app/shared/models/artist.model';
import { ChangePageTitle, NavigatedRoute } from 'src/app/store/app/app.actions';
import {
  GetArtists,
  SaveSelectedArtist,
  SaveSelectedArtistToHistory,
} from 'src/app/store/artist/artist.actions';
import { ArtistState } from 'src/app/store/artist/artist.state';
import { GetToken } from 'src/app/store/auth/auth.actions';
import { AuthState } from 'src/app/store/auth/auth.state';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
//TODO When No ArtistsFound
// TODO Loading..
// TODO  Clear out selected Artist on landing on Home Page
// TODO Implement Back
export class HomeComponent implements OnInit {
  searchForm: FormGroup;
  formVal$: Observable<string>;
  spotifyArtists$ = Observable;
  artistsUnsub$: Subscription;
  @Select(ArtistState.artists)
  artists$: Observable<Artist[]>;
  @Select(ArtistState.selectedArtistHistory)
  history$: Observable<Artist[]>;
  @ViewChild('searchInput', { static: true }) searchInput: ElementRef;
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      songSearch: new FormControl(),
    });
    this.store.dispatch(new ChangePageTitle('Seach Artists'));
    let token = this.store.selectSnapshot<string>(AuthState.token);
    //if (!token)
    this.store.dispatch(new GetToken());
    this.formVal$ = fromEvent(this.searchInput.nativeElement, 'keyup').pipe(
      map((event: any) => event.target.value),
      debounceTime(600),
      distinctUntilChanged()
    );
    this.artistsUnsub$ = this.formVal$
      .pipe(
        switchMap((search: string) => {
          return this.store.dispatch(new GetArtists(search));
        })
      )
      .subscribe();
  }
  gotoAlbums(artist: Artist) {
    this.addToHistory(artist);
    this.saveSelectedArtist(artist);
    this.store.dispatch(new NavigatedRoute('/home'));
    this.store.dispatch(new Navigate(['/albums']));
  }
  addToHistory(artist: Artist) {
    this.store.dispatch(new SaveSelectedArtistToHistory(artist));
  }
  saveSelectedArtist(artist: Artist) {
    this.store.dispatch(new SaveSelectedArtist(artist));
  }
  trackByFn(index, artist: Artist) {
    return artist.id;
  }
  ngOnDestroy() {
    this.artistsUnsub$.unsubscribe();
  }
}
