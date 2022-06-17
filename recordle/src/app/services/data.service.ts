import { Observable } from 'rxjs';
import { IAlbum } from './../models/IAlbum';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private http: HttpClient
  ) { }

  getAlbumSourceData(): Observable<IAlbum[]> {
    return this.http.get<IAlbum[]>('/assets/data/albums.json?v17-6-22');
  }
}
