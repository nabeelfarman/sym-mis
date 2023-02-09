import { Component } from '@angular/core';
import { LoaderService } from './loader/loader.service';

@Component({
  selector: 'sym-mis-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'sym-mis';
  
  constructor(public loaderService: LoaderService) {
  }

  ngOnInit() {

  }
}
