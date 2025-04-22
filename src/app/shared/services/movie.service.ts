import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { options } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class MovieService {
  // Inject the HttpClient service to handle HTTP requests
  http = inject(HttpClient);

  // Fetch a list of movies 
  getMovies() {
    return this.http.get<any>('https://api.themoviedb.org/3/discover/movie', options);
  }

  // Fetch a list of TV shows 
  getTvShows() {
    return this.http.get<any>('https://api.themoviedb.org/3/discover/tv', options);
  }

  // Fetch rated movies
  getRatedMovies() {
    return this.http.get<any>('https://api.themoviedb.org/3/guest_session/guest_session_id/rated/movies', options);
  }

  // Fetch banner images for a specific movie by ID
  getBannerImage(id: number) {
    return this.http.get<any>(`https://api.themoviedb.org/3/movie/${id}/images`, options);
  }

  // Fetch videos (e.g., trailers) for a specific movie by ID
  getBannerVideo(id: number) {
    return this.http.get<any>(`https://api.themoviedb.org/3/movie/${id}/videos`, options);
  }

  // Fetch detailed information about a specific movie by ID
  getBannerDetail(id: number) {
    return this.http.get<any>(`https://api.themoviedb.org/3/movie/${id}`, options);
  }

  // Fetch a list of movies
  getNowPlayingMovies() {
    return this.http.get<any>('https://api.themoviedb.org/3/movie/now_playing', options);
  }

  // Fetch a list of popular movies
  getPopularMovies() {
    return this.http.get<any>('https://api.themoviedb.org/3/movie/popular', options);
  }

  // Fetch a list of top-rated movies
  getTopRated() {
    return this.http.get<any>('https://api.themoviedb.org/3/movie/top_rated', options);
  }

  // Fetch a list of upcoming movies
  getUpcomingMovies() {
    return this.http.get<any>('https://api.themoviedb.org/3/movie/upcoming', options);
  }

  // Fetch details of the latest movie
  getLatestMovies() {
    return this.http.get<any>('https://api.themoviedb.org/3/movie/latest', options);
  }

  // Fetch a list of trending movies for the week
  getTrendingMovies() {
    return this.http.get<any>('https://api.themoviedb.org/3/trending/movie/week', options);
  }

  // Fetch detailed information about a specific movie by ID
  getMovieDetails(id: string) {
    return this.http.get<any>(`https://api.themoviedb.org/3/movie/${id}`, options);
  }

}