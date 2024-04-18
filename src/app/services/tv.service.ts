import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TvService {
  private apiKey="5885fe9dd784d8e0af439f0d75b6dda5";
  private baseURL="https://api.themoviedb.org/3";
  constructor(private http:HttpClient) { }

  getTVShows(params: any) {
    const url = `${this.baseURL}/discover/tv?api_key=${this.apiKey}&${params}`;
    return this.http.get(url).toPromise();
  }

  getGenres() {
    const url = `${this.baseURL}/genre/tv/list?api_key=${this.apiKey}`;
    return this.http.get(url).toPromise();
  }

  getLanguages() {
    const url = `${this.baseURL}/configuration/languages?api_key=${this.apiKey}`;
    return this.http.get(url).toPromise();
  }
}
