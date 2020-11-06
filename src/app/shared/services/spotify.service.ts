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

  searchArtists(query: string) {
    const searchUrl = `${environment.baseURL}/search?q=${query}&offset=0&limit=20&type=artist`;
    return this.http.get(searchUrl);
  }

  searchAlbums(id: string) {
    const searchUrl = `${environment.baseURL}/artists/${id}/albums`;
    return this.http.get(searchUrl);
  }

  getAlbumDetails(id: string) {
    const searchUrl = `${environment.baseURL}/albums/${id}`;
    return this.http.get(searchUrl);
  }
}
