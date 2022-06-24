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
    this.setPageTitle(titleValue);
    this.setCanonicalLinkUrl();
    this.setMetaData(descriptionValue);
  }

  private setPageTitle(titleValue: string) {
    this.title.setTitle(titleValue);
    this.meta.updateTag({ property: 'og:title', content: titleValue });
  }

  private setMetaData(
    descriptionValue: string
  ) {
    this.meta.updateTag({ property: 'og:description', content: descriptionValue });
    this.meta.updateTag({ property: 'og:image', content: `${environment.baseUrl}assets/images/banners/PopIdle.jpg` });
    this.meta.updateTag({ property: 'og:image:width', content: '1200' });
    this.meta.updateTag({ property: 'og:image:height', content: '630' });
  }

  private setCanonicalLinkUrl() {
    let link: HTMLLinkElement = this.doc.querySelector("link[rel='canonical']");
    if (link === null) {
      link = this.doc.createElement('link');
      this.doc.head.appendChild(link);
    };
    link.setAttribute('rel', 'canonical');
    link.setAttribute('href', this.doc.URL);
    this.meta.updateTag({ property: 'og:url', content: this.doc.URL });
 }
}
