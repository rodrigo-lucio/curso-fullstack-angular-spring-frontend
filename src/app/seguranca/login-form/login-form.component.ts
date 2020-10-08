import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { AuthService } from './../auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  constructor(private route: Router,
    private titulo: Title,
    private authService: AuthService,
    private errorHandle: ErrorHandlerService,
    private router: Router) { }

  ngOnInit() {
    this.titulo.setTitle('Result App');
  }

  logar(usuario: string, senha: string) {

    this.authService.login(usuario, senha)
      .then(() => {
        this.router.navigate(['/dashboard']);
      })
      .catch(erro => {
        this.errorHandle.handle(erro);
      });

  }



}
