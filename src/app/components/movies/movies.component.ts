import { CommonModule } from '@angular/common';
import { Component , OnInit} from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FavouritesService } from '../../services/favourites.service';


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
  imports: [CommonModule,FormsModule],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css'
})
export class MoviesComponent implements OnInit {
 
  genres: any[] = [];
  languages: any[] = [];
  releaseDateURL: string='';
  languageURL: string='';
  genreURL: number[] = [];
  movieList: Movie[] = [];

  constructor(private movieService: MoviesService,private router:Router,private favoritesService:FavouritesService) { }

  ngOnInit(): void {
    this.fetchGenreAndLanguage();
    this.fetchData();
  }

  async fetchData() {
    try {
      let params = `page=1`;
      if (this.releaseDateURL) {
        params += `&primary_release_date.gte=${this.releaseDateURL}&primary_release_date.lte=${this.releaseDateURL}`;
      }
      if (this.languageURL) {
        params += `&language=${this.languageURL}`;
      }
      if (this.genreURL.length > 0) {
        params += `&with_genres=${this.genreURL.join(',')}`;
      }

      const response: any = await this.movieService.getMovies(params);

      if (response && response.results.length > 0) {
        this.movieList = response.results;
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  addToFavorites(movie: any) {
    console.log("fav movie= "+movie)
    this.favoritesService.addToFavorites(movie);
  }

  async fetchGenreAndLanguage() {
    try {
      const genreResponse: any = await this.movieService.getGenres();
      console.log("Genres: "+genreResponse.genres)
      if (genreResponse.genres) {
        this.genres = genreResponse.genres;
      }

      const languageResponse: any = await this.movieService.getLanguages();
      console.log("Language: "+languageResponse)
      if (languageResponse) {
        this.languages = languageResponse;
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }


  handleDateChange(event: any) {
    this.releaseDateURL = event.target.value;
    this.fetchData();
  }

  handleLanguageChange(event: any) {
    this.languageURL = event.target.value;
    this.fetchData();
  }

  handleGenreChange(event: any) {
    const genreId = parseInt(event.target.value);
    if (event.target.checked) {
      this.genreURL.push(genreId);
    } else {
      this.genreURL = this.genreURL.filter(item => item !== genreId);
    }
    this.fetchData();
  }

  handleSearchCategoryChange(e: any) {

    if (e.target.value === "Movies") {
     
      this.router.navigate(['/movies']);
    }
    if (e.target.value === "TV") {
      this.router.navigate(['/tvshows']);
    }
  }
 

}
