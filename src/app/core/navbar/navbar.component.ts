import { Router } from '@angular/router';
import { AuthService } from './../../seguranca/auth.service';
import { Component, OnInit } from '@angular/core';
import { ErrorHandlerService } from '../error-handler.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  exibindoMenu = false;

  constructor(public auth: AuthService,
              private router: Router,
              private errrorHandle: ErrorHandlerService) { }

  ngOnInit() {
  }

  criarNovoAcessToken() {
    this.auth.obterNovoAccessToken();
  }

  logout() {
    this.auth.logout()
    .then(() => {
      this.router.navigate(['/login']);
    })
    .catch(erro => {
      this.errrorHandle.handle(erro);
    });
  }

}
