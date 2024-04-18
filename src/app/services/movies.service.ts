import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
interface Movies{
  results:Movie[]
}
@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private apiKey="5885fe9dd784d8e0af439f0d75b6dda5";
  private baseURL="https://api.themoviedb.org/3";
  constructor(private http:HttpClient) { }

  getMovies(params: any) {
    const url = `${this.baseURL}/discover/movie?api_key=${this.apiKey}&${params}`;
    return this.http.get(url).toPromise();
  }

  getGenres() {
    const url = `${this.baseURL}/genre/movie/list?api_key=${this.apiKey}`;
    return this.http.get(url).toPromise();
  }

  getLanguages() {
    const url = `${this.baseURL}/configuration/languages?api_key=${this.apiKey}`;
    return this.http.get(url).toPromise();
  }
}
