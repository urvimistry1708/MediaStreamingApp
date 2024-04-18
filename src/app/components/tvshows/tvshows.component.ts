import { Component } from '@angular/core';
import { TvService } from '../../services/tv.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FavouritesService } from '../../services/favourites.service';
interface TVShow {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  first_air_date: string;
  name: string;
  vote_average: number;
  vote_count: number;
}

interface TVShows{
  results:TVShow[];
}
@Component({
  selector: 'app-tvshows',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './tvshows.component.html',
  styleUrl: './tvshows.component.css'
})
export class TvshowsComponent {
  genres: any[] = [];
  languages: any[] = [];
  releaseDateURL: string='';
  languageURL: string='';
  genreURL: number[] = [];
  tvList: TVShow[] = [];

  constructor(private tvService: TvService,private router:Router, private favoritesService: FavouritesService) { }

  ngOnInit(): void {
    this.fetchGenreAndLanguage();
    this.fetchData();
  }

  async fetchData() {
    try {
      let params = `page=1`;
      if (this.releaseDateURL) {
        params += `&first_air_date.gte=${this.releaseDateURL}&first_air_date.lte=${this.releaseDateURL}`;
      }
      if (this.languageURL) {
        params += `&language=${this.languageURL}`;
      }
      if (this.genreURL.length > 0) {
        params += `&with_genres=${this.genreURL.join(',')}`;
      }

      const response: any = await this.tvService.getTVShows(params);

      console.log("TV= "+response.results[0].name)
      if (response && response.results.length > 0) {
        this.tvList = response.results;
        console.log(this.tvList[0].name)
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async fetchGenreAndLanguage() {
    try {
      const genreResponse: any = await this.tvService.getGenres();
      console.log("Genres: "+genreResponse.genres)
      if (genreResponse.genres) {
        this.genres = genreResponse.genres;
      }

      const languageResponse: any = await this.tvService.getLanguages();
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

  addToFavorites(movie: any) {
    console.log("fav movie= "+movie)
    this.favoritesService.addToFavorites(movie);
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
