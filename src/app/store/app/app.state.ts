import { State, Selector, Action, StateContext, Store } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { ChangePageTitle, NavigatedRoute } from './app.actions';
import { patch } from '@ngxs/store/operators';

export interface AppStateModel {
  pageTitle: string;
  previousRoute?: string;
}
@State<AppStateModel>({
  name: 'appState',
})
@Injectable()
export class AppState {
  @Selector()
  static pageTitle(state: AppStateModel) {
    return state?.pageTitle;
  }

  @Selector()
  static previousRoute(state: AppStateModel) {
    return state?.previousRoute;
  }

  constructor() {}
  @Action(ChangePageTitle)
  changePageTitle(
    stateContext: StateContext<AppStateModel>,
    action: ChangePageTitle
  ) {
    stateContext.setState(
      patch({
        pageTitle: action.pageTitle,
      })
    );
  }
  @Action(NavigatedRoute)
  navigatedRoute(ctx: StateContext<AppStateModel>, action: NavigatedRoute) {
    const state = ctx.getState();
    return ctx.setState(
      patch({
        previousRoute: action.url,
      })
    );
  }
}
