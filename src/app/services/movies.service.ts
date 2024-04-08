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
private ApiURL="https://api.themoviedb.org/3/discover/movie?api_key=5885fe9dd784d8e0af439f0d75b6dda5";
  constructor(private http:HttpClient) { }

  public getMovies():Observable<Movies>{
    return this.http.get<Movies>(this.ApiURL);
  }
}
