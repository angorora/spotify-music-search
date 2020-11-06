import { Album, Artist } from 'src/app/shared/models/artist.model';

export const GET_ARTISTS = '[Artists] Fetch Artists';
export const GET_SELECTED_ARTIST_ALBUM_DETAILS =
  '[Artists] Fetch Artist Album Details';
export const GET_SELECTED_ARTIST_ALBUMS = '[Artists] Fetch Artist Album';
export const SAVE_SELECTED_ARTIST_TO_HISTORY =
  '[Artists] Save Selected Artist To History';
export const SAVE_SELECTED_ARTIST = '[Artists] Save Selected Artist ';
export const CLEAR_SELECTED_ARTIST = '[Artists] Save Selected Artist';
export const SAVE_SELECTED_ALBUM = '[Artists] Save Selected Album';

export class GetArtists {
  static readonly type = GET_ARTISTS;
  constructor(public name: string) {}
}
export class GetSelectedAlbumDetails {
  static readonly type = GET_SELECTED_ARTIST_ALBUM_DETAILS;
}
export class GetSelectedArtistAlbums {
  static readonly type = GET_SELECTED_ARTIST_ALBUMS;
}
export class SaveSelectedArtistToHistory {
  static readonly type = SAVE_SELECTED_ARTIST_TO_HISTORY;
  constructor(public artist: Artist) {}
}
export class SaveSelectedArtist {
  static readonly type = SAVE_SELECTED_ARTIST;
  constructor(public artist: Artist) {}
}
export class SaveSelectedAlbum {
  static readonly type = SAVE_SELECTED_ALBUM;
  constructor(public album: Album) {}
}
export class ClearSelectedArtist {
  static readonly type = CLEAR_SELECTED_ARTIST;
}
