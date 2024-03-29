import { environment } from './../../environments/environment';
import { MoneyHttpInterceptor } from './money-http-interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';

import { SharedModule } from './../shared/shared.module';
import { InputTextModule } from 'primeng/inputtext';
import { LoginFormComponent } from './login-form/login-form.component';
import { SegurancaRoutingModule } from './seguranca-routing.module';
import { PanelModule } from 'primeng/panel';


export function tokenGetter(): string {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [LoginFormComponent],
  imports: [
    FormsModule,
    InputTextModule,
    ButtonModule,
    PanelModule,
    SharedModule,

    // Coloca automaticamente em TODAS as requisições HTTP o token no cabeçalho
    JwtModule.forRoot({
      config: {

        tokenGetter, // Executa o primeiro método desta classe
        whitelistedDomains: environment.tokenWhitelistedDomains,
        blacklistedRoutes: environment.tokenBlacklistedRoutes

      }
    }),

    SegurancaRoutingModule
  ],
  providers: [
    JwtHelperService,
    { // Classe interceptadora, que atualiza o token
      provide: HTTP_INTERCEPTORS,
      useClass: MoneyHttpInterceptor,
      multi: true
  }
  ]
})

export class SegurancaModule { }
