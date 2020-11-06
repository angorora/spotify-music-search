import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Artist, Track } from 'src/app/shared/models/artist.model';

@Component({
  selector: 'tracks',
  templateUrl: './tracks.component.html',
  styleUrls: ['./tracks.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TracksComponent implements OnInit {
  @Input()
  track: Track;
  @Output()
  trackPreviewClick = new EventEmitter<Track>();
  constructor() {}

  ngOnInit(): void {}

  previewTrack() {
    this.trackPreviewClick.emit(this.track);
  }
}
