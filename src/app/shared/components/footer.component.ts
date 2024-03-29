import {Component} from '@angular/core';
import {environment} from '@env';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  version: string;
  profile: string;
  backEndCore: string;

  constructor() {
    this.version = environment.VERSION;
    this.profile = environment.production ? 'Prod' : 'Dev';
    this.backEndCore = environment.REST_CORE;
  }
}
