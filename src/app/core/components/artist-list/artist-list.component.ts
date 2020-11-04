import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Observable } from 'rxjs';
import { Artist } from 'src/app/shared/models/artist.model';

@Component({
  selector: 'artist-list',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArtistListComponent implements OnInit {
  @Input()
  artist: Artist;
  @Output()
  artistClick = new EventEmitter<Artist>();
  constructor() {}

  ngOnInit(): void {}

  selectArtist() {
    this.artistClick.emit(this.artist);
  }
}
