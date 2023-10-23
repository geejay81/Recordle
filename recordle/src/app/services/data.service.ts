import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { IApiResponse } from './../models/IAlbum';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // Query to fetch the albums 
  //
  // *[_type == "album"]{
  //   'id': gameId,
  //   artist,
  //   albumTitle,
  //   embedKey,
  //   'coverArt': coverArt.asset->url
  // }

  constructor(
    private http: HttpClient
  ) { }

  getAlbumApiData(): Observable<IApiResponse> {
    return this.http.get<IApiResponse>(environment.dataUrl);
  }
}
