import { Injectable, NgZone } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScriptService {

  constructor(private zone: NgZone) { }

  loadScript(url: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const scriptElement = document.createElement('script');
      scriptElement.src = url;
      scriptElement.async = true;
      scriptElement.onload = () => this.zone.run(() => resolve());
      scriptElement.onerror = () => this.zone.run(() => reject());
      document.body.appendChild(scriptElement);
    });
  }
}
