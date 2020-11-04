import { State, Selector, Action, StateContext, Store } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { Artist } from 'src/app/shared/models/artist.model';
import { nullSafeIsEquivalent } from '@angular/compiler/src/output/output_ast';
import { SpotifyService } from 'src/app/shared/services/spotify.service';
import {
  GetArtists,
  GetSelectedArtistAlbums,
  SaveSelectedArtistToHistory,
} from './artist.actions';
import { ApiError } from '../error/error.actions';
import { tap } from 'rxjs/operators';
import { patch } from '@ngxs/store/operators';
interface ArtistStateInterface {
  artists: Artist[];
  selectedArtist?: Artist;
  selectedArtistHistory?: Artist[];
}
@State<ArtistStateInterface>({
  name: 'artistState',
  defaults: {
    artists: [],
    selectedArtist: null,
  },
})
@Injectable()
export class ArtistState {
  @Selector()
  static artists(state: ArtistStateInterface) {
    return state?.artists;
  }
  @Selector()
  static selectedArtist(state: ArtistStateInterface) {
    return state?.selectedArtist;
  }
  @Selector()
  static selectedArtistHistory(state: ArtistStateInterface) {
    return state?.selectedArtistHistory;
  }

  constructor(private spotifyService: SpotifyService, private store: Store) {}
  @Action(GetArtists)
  getArtists(
    stateContext: StateContext<ArtistStateInterface>,
    action: GetArtists
  ) {
    const state = stateContext.getState();

    return this.spotifyService.searchArtists(action.name).pipe(
      tap((response: any) => {
        if (response) {
          stateContext.setState({
            ...state,
            artists: response.artists.items,
          });
          //return this.store.dispatch(new Navigate(['/home']));
        } else {
          stateContext.dispatch(
            new ApiError({ status: 200, message: response.message })
          );
        }
      })
    );
  }

  @Action(GetSelectedArtistAlbums)
  getSelectedArtist(
    stateContext: StateContext<ArtistStateInterface>,
    action: GetSelectedArtistAlbums
  ) {
    const state = stateContext.getState();

    return this.spotifyService.searchAlbums(state.selectedArtist.id).pipe(
      tap((response: any) => {
        if (response) {
          stateContext.setState({
            ...state,
            artists: response.items,
          });
          //return this.store.dispatch(new Navigate(['/home']));
        } else {
          stateContext.dispatch(
            new ApiError({ status: 200, message: response.message })
          );
        }
      })
    );
  }
  @Action(SaveSelectedArtistToHistory)
  SaveSelectedArtistToHistory(
    stateContext: StateContext<ArtistStateInterface>,
    action: SaveSelectedArtistToHistory
  ) {
    const state = stateContext.getState();
    let duplicateArtist = state.selectedArtistHistory.find(
      (art) => art.id === action.artist.id
    );
    if (!duplicateArtist)
      stateContext.setState(
        patch({
          selectedArtistHistory: [
            ...state.selectedArtistHistory,
            action.artist,
          ],
        })
      );
  }
}
