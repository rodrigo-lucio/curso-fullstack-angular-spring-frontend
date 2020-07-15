import { AuthGuard } from './../seguranca/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PessoasPesquisaComponent } from './pessoas-pesquisa/pessoas-pesquisa.component';
import { PessoaCadastroComponent } from './pessoa-cadastro/pessoa-cadastro.component';


const rotas: Routes = [
  {
    path: '',
    component: PessoasPesquisaComponent,
    // Parametro para guardião de rotas e role do JWT
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_PESSOA']}
  },
  {
    path: 'novo',
    component: PessoaCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_PESSOA']}
  },

  {
    path: ':codigo',
    component: PessoaCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_PESSOA']}
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(rotas) // usa CHILD por que não é o modulo app-module
  ],
  exports: [RouterModule]
})
export class PessoasRoutingModule { }
