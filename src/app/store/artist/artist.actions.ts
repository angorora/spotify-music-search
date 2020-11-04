import { Artist } from 'src/app/shared/models/artist.model';

export const GET_ARTISTS = '[Artists] Fetch Artists';
export const GET_SELECTED_ARTIST_ALBUM_TRACKS =
  '[Artists] Fetch Artist Album Tracks';
export const GET_SELECTED_ARTIST_ALBUMS = '[Artists] Fetch Artist Album';
export const SAVE_SELECTED_ARTIST = '[Artists] Save Selected Artist To History';
export class GetArtists {
  static readonly type = GET_ARTISTS;
  constructor(public name: string) {}
}
export class GetSelectedAlbumTracks {
  static readonly type = GET_SELECTED_ARTIST_ALBUM_TRACKS;
}
export class GetSelectedArtistAlbums {
  static readonly type = GET_SELECTED_ARTIST_ALBUMS;
}
export class SaveSelectedArtistToHistory {
  static readonly type = SAVE_SELECTED_ARTIST;
  constructor(public artist: Artist) {}
}
