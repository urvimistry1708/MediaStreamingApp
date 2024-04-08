import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MoviesService } from '../../services/movies.service';

export interface Movie {
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

interface Movies {
  results: Movie[]
}
@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css'
})
export class MoviesComponent {

  movieList: Movie[] = [];

  constructor(private moviesService: MoviesService) {
    this.moviesService.getMovies().subscribe((data) => {
      this.movieList = data.results;
    })
  }

}
