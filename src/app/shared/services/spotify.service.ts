import { HttpClient, HttpParams } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  constructor(private http: HttpClient) {}
  getAuth = () => {
    let params = new URLSearchParams();
    params.set('grant_type', 'client_credentials');

    return this.http.post(
      'https://cors-anywhere.herokuapp.com/https://accounts.spotify.com/api/token',
      params.toString()
    );
  };

  // Get search results for a query
  searchMusic(query: string, type = 'artist', authToken: string) {
    // let headers = new Headers();
    // headers.append('Authorization', 'Bearer ' + authToken);
    // this.searchUrl = 'https://api.spotify.com/v1/search?query=' + query + '&offset=0&limit=20&type=' + type + '&market=US';
    // return this._http.get(this.searchUrl, { headers: headers })
    //   .map(res => res.json());
  }

  // Get data about artist that has been chosen to view
  getArtist(id: string, authToken: string) {
    // let headers = new Headers();
    // headers.append('Authorization', 'Bearer ' + authToken);
    // this.artistUrl = 'https://api.spotify.com/v1/artists/' + id;
    // return this._http.get(this.artistUrl, { headers: headers })
    //   .map(res => res.json());
  }

  // Get the albums about the artist that has been chosen
  getAlbums(id: string, authToken: string) {
    // let headers = new Headers();
    // headers.append('Authorization', 'Bearer ' + authToken);
    // this.albumsUrl = 'https://api.spotify.com/v1/artists/' + id + '/albums?market=US&album_type=single';
    // return this._http.get(this.albumsUrl, { headers: headers })
    //   .map(res => res.json());
  }

  // Get Tracks in ablum selected
  getAlbum(id: string, authToken: string) {}

  // let headers = new Headers();
  // headers.append('Authorization', 'Bearer ' + authToken);

  // this.albumUrl = 'https://api.spotify.com/v1/albums/' + id;

  // return this._http.get(this.albumUrl, { headers: headers })
  //   .map(res => res.json());
}
