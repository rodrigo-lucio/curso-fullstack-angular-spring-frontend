import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './../seguranca/auth.guard';
import { LancamentoCadastroComponent } from './lancamento-cadastro/lancamento-cadastro.component';
import { LancamentosPesquisaComponent } from './lancamentos-pesquisa/lancamentos-pesquisa.component';

const rotas: Routes = [
  {

    path: 'lancamentos',
    component: LancamentosPesquisaComponent,
    //Parametro para guardião de rotas e role do JWT
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_LANCAMENTO']}
  },
  {
    path: 'lancamentos/novo',
    component: LancamentoCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_LANCAMENTO']}
  },
  {
    path: 'lancamentos/:codigo',
    component: LancamentoCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_LANCAMENTO']}
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(rotas) //usa chield por que não é o modulo app-module
  ],
  exports: [RouterModule]
})

export class LancamentosRoutingModule { }
