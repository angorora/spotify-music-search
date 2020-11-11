import { Injectable } from '@angular/core';
import { Navigate } from '@ngxs/router-plugin';
import { Store } from '@ngxs/store';
import { AppState } from 'src/app/store/app/app.state';

@Injectable({
  providedIn: 'root',
})
export class NavigateBackService {
  constructor(private store: Store) {}

  navigateBack() {
    let prevRoute = this.store.selectSnapshot<string>(AppState.previousRoute);
    this.store.dispatch(new Navigate([prevRoute]));
  }
}
