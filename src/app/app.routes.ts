import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { MoviesComponent } from './components/movies/movies.component';

export const routes: Routes = [
    {path:'',component:HomeComponent},
    {path:'home',redirectTo:'',pathMatch:'full'},
    {path: 'movies',component:MoviesComponent},
    {path:'**',component:PageNotFoundComponent}
];
