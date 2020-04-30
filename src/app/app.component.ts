import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { ToastOptions, ToastyConfig } from 'ng2-toasty';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

    constructor(
      private toastyConfig: ToastyConfig,
      private route: Router) {

      this.toastyConfig.theme = 'bootstrap';

    }

    exibirNavBar() {
      return this.route.url !== '/login';
    }


}
