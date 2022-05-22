import { DomSanitizer } from '@angular/platform-browser';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'uri'
})
export class UriPipe implements PipeTransform {

  constructor(private domSanitizer: DomSanitizer) {}

  transform(url: string): any {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
