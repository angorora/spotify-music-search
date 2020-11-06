import { State, Selector, Action, StateContext, Store } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { Album, Artist, Track } from 'src/app/shared/models/artist.model';
import { SpotifyService } from 'src/app/shared/services/spotify.service';
import {
  ClearSelectedArtist,
  GetArtists,
  GetSelectedAlbumDetails,
  GetSelectedArtistAlbums,
  SaveSelectedAlbum,
  SaveSelectedArtist,
  SaveSelectedArtistToHistory,
} from './artist.actions';
import { ApiError } from '../error/error.actions';
import { tap } from 'rxjs/operators';
import { patch } from '@ngxs/store/operators';
import { Navigate } from '@ngxs/router-plugin';
interface ArtistStateInterface {
  artists: Artist[];
  selectedArtist?: Artist;
  selectedAlbum?: Album;
  selectedArtistHistory?: Artist[];
}
@State<ArtistStateInterface>({
  name: 'artistState',
  defaults: {
    artists: [],
    selectedArtistHistory: [],
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
  static selectedArtistAlbums(state: ArtistStateInterface) {
    return state?.selectedArtist?.albums;
  }
  @Selector()
  static selectedAlbum(state: ArtistStateInterface) {
    return state?.selectedAlbum;
  }
  @Selector()
  static selectedAlbumImages(state: ArtistStateInterface) {
    return state?.selectedAlbum?.images[1].url;
  }
  @Selector()
  static selectedAlbumTitle(state: ArtistStateInterface) {
    return state?.selectedAlbum?.name;
  }
  @Selector()
  static selectedAlbumTracks(state: ArtistStateInterface) {
    return state?.selectedAlbum.tracks
      .slice()
      .sort((a, b) => 0 - (a.name > b.name ? -1 : 1));
  }
  @Selector()
  static selectedAlbumArtists(state: ArtistStateInterface) {
    return state?.selectedAlbum?.artists;
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
  GetSelectedArtistAlbums(stateContext: StateContext<ArtistStateInterface>) {
    const state = stateContext.getState();
    if (!!state.selectedArtist?.id) {
      return this.spotifyService.searchAlbums(state.selectedArtist.id).pipe(
        tap((response: any) => {
          if (response) {
            stateContext.setState({
              ...state,
              selectedArtist: {
                ...state.selectedArtist,
                albums: response.items,
              },
            });
          } else {
            stateContext.dispatch(
              new ApiError({ status: 200, message: response.message })
            );
          }
        })
      );
    } else {
      this.store.dispatch(new Navigate(['/home']));
    }
  }
  @Action(GetSelectedAlbumDetails)
  GetSelectedArtistAlbumDetails(
    stateContext: StateContext<ArtistStateInterface>
  ) {
    const state = stateContext.getState();
    if (!!state.selectedAlbum?.id) {
      return this.spotifyService.getAlbumDetails(state.selectedAlbum.id).pipe(
        tap((response: any) => {
          if (response) {
            stateContext.setState({
              ...state,
              selectedAlbum: {
                ...state.selectedAlbum,
                artists: response.artists,
                release_date: response.release_date,
                images: response.images,
                tracks: response.tracks.items,
              },
            });
          } else {
            stateContext.dispatch(
              new ApiError({ status: 200, message: response.message })
            );
          }
        })
      );
    } else {
      this.store.dispatch(new Navigate(['/home']));
    }
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

  @Action(SaveSelectedArtist)
  SaveSelectedArtist(
    stateContext: StateContext<ArtistStateInterface>,
    action: SaveSelectedArtist
  ) {
    const state = stateContext.getState();
    if (action.artist.id !== state.selectedArtist?.id) {
      stateContext.setState(
        patch({
          selectedArtist: action.artist,
        })
      );
      return stateContext.dispatch(new GetSelectedArtistAlbums());
    } else {
      stateContext.setState(
        patch({
          selectedArtist: { ...state.selectedArtist },
        })
      );
    }
  }
  @Action(SaveSelectedAlbum)
  SaveSelectedAlbum(
    stateContext: StateContext<ArtistStateInterface>,
    action: SaveSelectedAlbum
  ) {
    const state = stateContext.getState();
    if (action.album.id !== state.selectedAlbum?.id) {
      stateContext.setState(
        patch({
          selectedAlbum: action.album,
        })
      );
      stateContext.dispatch(new GetSelectedAlbumDetails());
    } else {
      stateContext.setState(
        patch({
          selectedAlbum: { ...state.selectedAlbum },
        })
      );
    }
  }
  @Action(ClearSelectedArtist)
  ClearSelectedArtist(stateContext: StateContext<ArtistStateInterface>) {
    stateContext.setState(
      patch({
        selectedArtist: null,
      })
    );
  }
}
