import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

/* Classe interceptadora, que antes de chamar qualquer requisição (post, put, get), verifica se o token
 é invalido e obtem um novo caso for (utilizando o refresh token)
 Se o refresh token estiver expirado, estoura uma exception, onde no errorhandler direciona para o login
 */
export class SessaoExpiradaException {}

@Injectable()
export class MoneyHttpInterceptor implements HttpInterceptor {

    constructor(private auth: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (!req.url.includes('/oauth/token') && this.auth.isAccessTokenInvalido()) {

          return from(this.auth.obterNovoAccessToken())
              .pipe(
                  mergeMap(() => {

                      if (this.auth.isAccessTokenInvalido()) {        // Casos que o refresh token expirar
                        throw new SessaoExpiradaException();
                      }

                      req = req.clone({
                          setHeaders: {
                              Authorization: `Bearer ${localStorage.getItem('token')}`
                          }
                      });

                      return next.handle(req);

                  })
              );
        }

        return next.handle(req);
    }
}
