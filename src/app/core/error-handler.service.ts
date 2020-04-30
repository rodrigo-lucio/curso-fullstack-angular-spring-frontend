import { Router } from '@angular/router';
import { SessaoExpiradaException } from './../seguranca/money-http-interceptor';
import { ToastyService } from 'ng2-toasty';
import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpHeaderResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private toasty: ToastyService,
              private router: Router) { }

  handle(errorResponse: any) {
      let msg: string;

      if (typeof errorResponse === 'string') {

        msg = errorResponse;

      } else if (errorResponse instanceof SessaoExpiradaException) {

        msg = 'Sessão expirada, realize o login novamente';
        this.router.navigate(['/login']);

      //} else if (errorResponse instanceof Response
      } else if (errorResponse instanceof HttpErrorResponse
        && errorResponse.status >= 400 && errorResponse.status <= 499) {

          let errors;
          msg = 'Ocorreu um erro ao processar a sua solicitação';

          if (errorResponse.status === 403 ) {
            msg = 'Você não tem permissão para executar esta ação';
          }

          try {
            //errors = errorResponse.json();
            errors = errorResponse.error.json();

            msg = errors[0].mensagemUsuario;
          } catch (e) { }

          console.error('Ocorreu um erro', errorResponse);

      } else {

        msg = 'Erro ao processar serviço remoto. Tente novamente.';
        console.error('Ocorreu um erro', errorResponse);
      }

      this.toasty.error(msg);

  }
}
