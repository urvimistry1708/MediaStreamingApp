import { Component, OnInit } from '@angular/core';
import { FavouritesService } from '../../services/favourites.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-favourites',
  standalone: true,
  imports: [ CommonModule],
  templateUrl: './favourites.component.html',
  styleUrl: './favourites.component.css'
})
export class FavouritesComponent implements OnInit {
  favoritesList: any[] = [];

  constructor(private favoritesService: FavouritesService) { }

  ngOnInit(): void {
    this.getFavorites();
  }

  getFavorites() {
    this.favoritesList = this.favoritesService.getFavorites();
  }

  removeFromFavorites(index: number) {
    this.favoritesService.removeFromFavorites(index);
    this.getFavorites(); // Refresh the list after removal
  }
}
