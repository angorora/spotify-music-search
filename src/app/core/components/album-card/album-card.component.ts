import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Navigate } from '@ngxs/router-plugin';
import { Store } from '@ngxs/store';
import { Album } from 'src/app/shared/models/artist.model';
import { SaveSelectedAlbum } from 'src/app/store/artist/artist.actions';

@Component({
  selector: 'album-card',
  templateUrl: './album-card.component.html',
  styleUrls: ['./album-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlbumCardComponent implements OnInit {
  @Input()
  album: Album;
  @Output()
  albumClick = new EventEmitter<Album>();

  constructor(private store: Store) {}
  selectAlbum(album) {
    this.albumClick.emit(album);
  }
  ngOnInit(): void {}
}
