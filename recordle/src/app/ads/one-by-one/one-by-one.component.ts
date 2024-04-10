import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ScriptService } from 'src/app/services/script.service';

@Component({
  selector: 'app-one-by-one',
  templateUrl: './one-by-one.component.html',
  styleUrls: ['./one-by-one.component.sass']
})
export class OneByOneComponent implements OnInit, AfterViewInit {

  constructor(private scriptService: ScriptService) { }
  
  ngAfterViewInit(): void {
    this.loadExternalScript();
  }

  ngOnInit(): void {
    
  }

  private loadExternalScript(): void {
    this.scriptService.loadScript('https://pl23034930.profitablegatecpm.com/ac634aa3d45d8b72c58b0ea9ec0ca26a/invoke.js').then(() => {
    }).catch(error => {
      console.error('Error loading script:', error);
    });
  }


}
