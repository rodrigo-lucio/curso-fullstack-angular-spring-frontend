import { Router } from '@angular/router';
import { SessaoExpiradaException } from './../seguranca/money-http-interceptor';
import { MessageService } from 'primeng/api';
import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpHeaderResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private messageService: MessageService,
    private router: Router) { }

  handle(errorResponse: any) {
    let msg: string;

    if (typeof errorResponse === 'string') {

      msg = errorResponse;

    } else if (errorResponse instanceof SessaoExpiradaException) {

      msg = 'Sessão expirada, realize o login novamente';
      this.router.navigate(['/login']);

    } else if (errorResponse instanceof HttpErrorResponse
      && errorResponse.status >= 400 && errorResponse.status <= 499) {

      let errors;
      msg = 'Ocorreu um erro ao processar a sua solicitação';

      if (errorResponse.status === 403) {
        msg = 'Você não tem permissão para executar esta ação';
      }

      try {

        errors = errorResponse.error[0]['mensagemUsuario'];
        msg = errors;

      } catch (e) { }

      console.error('Ocorreu um erro', errorResponse);

    } else {

      msg = 'Erro ao processar serviço remoto. Tente novamente.';
      console.error('Ocorreu um erro', errorResponse);

    }

    this.messageService.add({ severity: 'error', detail: msg });

  }
}
