import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeaponsService {
  baseURL: string = 'https://api.steamapis.com/image/items';

  constructor(private http: HttpClient) {}

  getItems(): Observable<any> {
    // return this.http.get(`${this.baseURL}/571740`);
    return this.http.get(`${this.baseURL}/730`);
  }
}

// https://steamcommunity.com/dev/apikey

// https://api.steamapis.com/image/items/730

// https://steamapis.com/docs/images#items
