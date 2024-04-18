import { Injectable } from '@angular/core';
declare global {
  interface Window {
    localStorage: Storage;
  }
}
@Injectable({
  providedIn: 'root'
})
export class FavouritesService {
  private readonly STORAGE_KEY = 'favorites';
  favoritesList: any[] = [];

  constructor() {
    if (this.isLocalStorageSupported()) {
      this.loadFavorites();
    } else {
      console.error('localStorage is not supported.');
    }
  }

  addToFavorites(item: any) {
    if (this.isLocalStorageSupported()) {
      // Check if the movie already exists in the favorites list
      const isDuplicate = this.favoritesList.some(favorite => favorite.id === item.id);
      if (!isDuplicate) {
        this.favoritesList.push(item);
        this.saveFavorites();
      } else {
        console.warn('This movie is already in the favorites list.');
      }
    }
  }
  

  removeFromFavorites(index: number) {
    if (this.isLocalStorageSupported()) {
      this.favoritesList.splice(index, 1);
      this.saveFavorites();
    }
  }

  getFavorites() {
    if (this.isLocalStorageSupported()) {
      return this.favoritesList;
    }
    return [];
  }

  private loadFavorites() {
    const favoritesData = localStorage.getItem(this.STORAGE_KEY);
    if (favoritesData) {
      this.favoritesList = JSON.parse(favoritesData);
    }
  }

  private saveFavorites() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.favoritesList));
  }

  private isLocalStorageSupported(): boolean {
    try {
      const testKey = '__testLocalStorageSupport__';
      localStorage.setItem(testKey, testKey);
      localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  }
}