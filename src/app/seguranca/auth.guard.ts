import { ErrorHandlerService } from './../core/error-handler.service';
import { SessaoExpiradaException } from './money-http-interceptor';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

//Guarda de rotas, cuida para que determinados usuarios não acessem rotas não permitidas

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService,
              private router: Router,
              private erroHandle: ErrorHandlerService){

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      //Protege para não entrar nas paginas, para não cair no else de baixo, redireciona para a pagina de
      //login caso o acess token estiver invalido

      if (this.auth.isAccessTokenInvalido()) {

        console.log('Navegação com acess token inválido, obtendo novo token...');

        return this.auth.obterNovoAccessToken()
        .then(() => {

          if (this.auth.isAccessTokenInvalido()) {          //Casos que o refresh token expirar
            this.router.navigate(['/login']);
            throw new SessaoExpiradaException();

            return false;
          }

          return true;

        })
        .catch(erro => {
          this.erroHandle.handle(erro);
          return false;
        });

      } else if (next.data.roles && !this.auth.temQualquerPermissao(next.data.roles)){

        //Verifica se a ROLE definida na rota do componente esta dentro do JWT do usuario
        //Se tiver algo e não tiver permissão, redireciona para outra pagina re retorna false

        this.router.navigate(['/nao-autorizado']);
        return false;

      } else {
        return true;
     }

  }

}
