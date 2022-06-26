import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(
    private meta: Meta,
    private title: Title,
    @Inject(DOCUMENT) private doc: any
    ) { }

  configureSeo(
    titleValue: string,
    descriptionValue: string
  ): void {
    this.setMetaData(titleValue, descriptionValue);
  }

  private setMetaData(
    titleValue: string,
    descriptionValue: string
  ) {
    this.title.setTitle(titleValue);
    this.meta.updateTag({ itemprop: 'name', content: titleValue });
    this.meta.updateTag({ itemprop: 'description', content: descriptionValue });
    this.meta.updateTag({ name: 'description', content: descriptionValue });

    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:site', content: '@popidlegame' });
    this.meta.updateTag({ name: 'twitter:creator', content: '@popidlegame' });
    this.meta.updateTag({ name: 'twitter:title', content: titleValue });
    this.meta.updateTag({ name: 'twitter:description', content: descriptionValue });
    this.meta.updateTag({ name: 'twitter:image', content: `${environment.baseUrl}assets/images/banners/PopIdle.png` });
    this.meta.updateTag({ name: 'twitter:url', content: this.doc.URL });
    this.meta.updateTag({ name: 'twitter:image:alt', content: 'PopIdle - Guess the album' });

    this.meta.updateTag({ property: 'og:description', content: descriptionValue });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:image', content: `${environment.baseUrl}assets/images/banners/PopIdle.png` });
    this.meta.updateTag({ property: 'og:url', content: this.doc.URL });
    this.meta.updateTag({ property: 'og:image:alt', content: 'PopIdle - Guess the album' });
    this.meta.updateTag({ property: 'og:image:width', content: '1200' });
    this.meta.updateTag({ property: 'og:image:height', content: '630' });
  }
}
