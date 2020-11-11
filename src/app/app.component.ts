import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';

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
