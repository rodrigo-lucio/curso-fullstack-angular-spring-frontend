import { NaoAutorizadoComponent } from './nao-autorizado.component';
import { RouterModule } from '@angular/router';
import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';

import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastyModule } from 'ng2-toasty';
import { ConfirmationService } from 'primeng/api';

import { ErrorHandlerService } from './error-handler.service';
import { NavbarComponent } from './navbar/navbar.component';
import { LancamentoService } from './../lancamentos/lancamento.service';
import { PessoaService } from './../pessoas/pessoa.service';
import { AuthService } from './../seguranca/auth.service';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';
import { DashboardService } from './../dashboard/dashboard.service';
import { RelatoriosService } from './../relatorios/relatorios.service';

@NgModule({
  declarations: [NavbarComponent, PaginaNaoEncontradaComponent, NaoAutorizadoComponent],
  imports: [
    CommonModule,
    RouterModule,

    ToastyModule.forRoot(),
    ConfirmDialogModule,

  ],
  exports: [
    NavbarComponent,
    ToastyModule,
    ConfirmDialogModule
  ],
  providers: [
    ErrorHandlerService,
    LancamentoService,
    PessoaService,
    DashboardService,
    RelatoriosService,
    ConfirmationService,
    Title,
    AuthService,
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ]
})
export class CoreModule { }
