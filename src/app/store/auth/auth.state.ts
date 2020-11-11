import { State, Selector, Action, StateContext, Store } from '@ngxs/store';

import { GetToken } from './auth.actions';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

import { ApiError } from '../error/error.actions';

import { Router } from '@angular/router';
import { Navigate } from '@ngxs/router-plugin';
import { SpotifyService } from '../../core/services/spotify.service';
@State<{ token: string; expires_in: number }>({
  name: 'authState',
})
@Injectable()
export class AuthState {
  @Selector()
  static token(state: { token: string; expires_in: number }) {
    return state?.token;
  }
  @Selector()
  static tokenExpiry(state: { token: string; expires_in: number }) {
    return state?.expires_in;
  }

  constructor(
    private spotifyService: SpotifyService,
    private store: Store,
    private router: Router
  ) {}
  @Action(GetToken)
  getAuthToken(
    stateContext: StateContext<{ token: string; expires_in: number }>,
    action: GetToken
  ) {
    const state = stateContext.getState();

    return this.spotifyService.getAuth().pipe(
      tap((response: any) => {
        if (response) {
          stateContext.setState({
            ...state,
            token: response.access_token,
            expires_in: response.expires_in,
          });
          return this.store.dispatch(new Navigate(['/home']));
        } else {
          stateContext.dispatch(
            new ApiError({ status: 200, message: response.message })
          );
        }
      })
    );
  }
}
