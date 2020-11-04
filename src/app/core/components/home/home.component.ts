import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { GetToken } from 'src/app/store/auth/auth.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(new GetToken());
  }
}
