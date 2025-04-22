import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MovieService } from '../../shared/services/movie.service';
import { IVideoContent } from '../../shared/models/video-content.interface';
import { MovieCarouselComponent } from '../../shared/components/movie-carousel/movie-carousel.component';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css'],
})

export class VideoPlayerComponent implements OnInit {
  //Stores the movie's details,YouTube URL,image
  videoContent?: IVideoContent;
  videoUrl?: SafeResourceUrl;
  imageUrl?: string;
  movies: IVideoContent[] = [];
  tvShows: IVideoContent[] = [];

  // Injects  
  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.loadVideoDetails(id);
      }
    });
  
    this.movieService.getTrendingMovies().subscribe((response) => {
      this.movies = response.results;
    });
  
    this.movieService.getTvShows().subscribe((response) => {
      this.tvShows = response.results;
    });
  }
  
  private loadVideoDetails(id: string) {
    this.movieService.getMovieDetails(id).subscribe(video => {
      this.videoContent = video;
      this.setVideoUrl(id);
      this.setImageUrl(video);
    });
  }
  
  private setVideoUrl(id: string) {
    // Fetches the YouTube trailer for the movie by ID
    this.movieService.getBannerVideo(Number(id)).subscribe(videoData => {
      const key = videoData.results[0]?.key; // Retrieves the video key 
      if (key) {
        // Sanitizes the YouTube URL
        this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${key}?autoplay=1&mute=1&loop=1&controls=1&playlist=${key}`);
      }
    });
  }

  private setImageUrl(video: IVideoContent) {
    if (!this.videoUrl) {
      // Sets the backdrop image URL if no video URL is available
      this.imageUrl = `https://image.tmdb.org/t/p/original${video.backdrop_path}`;
    }
  }
}
