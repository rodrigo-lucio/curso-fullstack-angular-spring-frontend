import { TieredMenuModule } from 'primeng/tieredmenu';
import { UsuarioModificarSenhaComponent } from './usuario-modificar-senha/usuario-modificar-senha.component';
import { UsuariosModule } from './../usuarios/usuarios.module';
import { SharedModule } from './../shared/shared.module';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { NaoAutorizadoComponent } from './nao-autorizado.component';
import { RouterModule } from '@angular/router';
import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';

import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';

import { ErrorHandlerService } from './error-handler.service';
import { NavbarComponent } from './navbar/navbar.component';
import { LancamentoService } from './../lancamentos/lancamento.service';
import { PessoaService } from './../pessoas/pessoa.service';
import { AuthService } from './../seguranca/auth.service';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';
import { DashboardService } from './../dashboard/dashboard.service';
import { RelatoriosService } from './../relatorios/relatorios.service';

import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { PasswordModule } from 'primeng/password';

@NgModule({
  declarations: [NavbarComponent, PaginaNaoEncontradaComponent, NaoAutorizadoComponent, UsuarioModificarSenhaComponent],
  imports: [
    CommonModule,
    RouterModule,
    ConfirmDialogModule,
    MessagesModule,
    MessageModule,
    ToastModule,

    FormsModule,
    ReactiveFormsModule,

    InputTextModule,
    ButtonModule,
    DialogModule,


    TableModule,
    TooltipModule,
    DropdownModule,
    CheckboxModule,
    PasswordModule,
    TieredMenuModule,
    SharedModule

  ],
  exports: [
    NavbarComponent,
    ToastModule,
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
    MessageService,
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ]
})
export class CoreModule { }
