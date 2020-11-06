import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AppState } from './store/app/app.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  pageTitle$: Observable<string>;
  constructor(private store: Store) {}
  ngOnInit() {
    this.pageTitle$ = this.store.select((state) => state.appState.pageTitle);
  }
}
