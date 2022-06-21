import { Observable } from 'rxjs';
import { IAlbum, IApiResponse } from './../models/IAlbum';
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
    return this.http.get<IApiResponse>(
      "https://v6qz2c5y.api.sanity.io/v2021-10-21/data/query/production?query=*%5B_type%20%3D%3D%20%22album%22%5D%7B%0A%20%20'id'%3A%20gameId%2C%0A%20%20artist%2C%0A%20%20albumTitle%2C%0A%20%20embedKey%2C%0A%20%20'coverArt'%3A%20coverArt.asset-%3Eurl%0A%7D");
  }
}
