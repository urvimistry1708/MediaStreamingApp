import { Component } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { CommonModule } from '@angular/common';
import { MoviesComponent } from '../movies/movies.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MoviesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
