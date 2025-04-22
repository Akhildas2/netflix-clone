import { Component, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css',
  standalone: true,
  imports: [CommonModule]
})

export class BannerComponent implements OnChanges {
  // Inputs for the component
  @Input({ required: true }) bannerTitle = '';
  @Input() bannerOverview = '';
  @Input() key = '';

  // URL sanitization and trust
  private sanitizer = inject(DomSanitizer);
  //create trust URL embedding
  videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.key}?autoplay=1&mute=1&loop=1&controls=0&playlist=${this.key}`)

  // Lifecycle hook that reacts to changes in input properties
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['key']) {
      // Update videoUrl if the 'key' input changes
      this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.key}?autoplay=1&mute=1&loop=1&controls=0&playlist=${this.key}`);
    }
  }

}
