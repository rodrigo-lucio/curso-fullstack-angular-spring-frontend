import { NaoAutorizadoComponent } from './core/nao-autorizado.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaginaNaoEncontradaComponent } from './core/pagina-nao-encontrada.component';

const rotas: Routes = [

  // Essas duas linhas são para não carregar todos os modulos de uma só vez
  // O que precisa de pessoas só vai ser carregado quando chamar pessoas, o mesmo para lançamentos
  { path: 'lancamentos', loadChildren: () => import('./lancamentos/lancamentos.module').then(m => m.LancamentosModule) },
  { path: 'pessoas', loadChildren: () => import('./pessoas/pessoas.module').then(m => m.PessoasModule) },
  { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)},
  { path: 'relatorios', loadChildren: () => import('./relatorios/relatorios.module').then(m => m.RelatoriosModule)},

  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},   // Redireciona para dashboard quando digitar localhost:8080
  {path: 'pagina-nao-encontrada', component: PaginaNaoEncontradaComponent},
  {path: 'nao-autorizado', component: NaoAutorizadoComponent},
  {path: '**', component: PaginaNaoEncontradaComponent} // os ** serve para dizer, qualquer coisa que for diferente ou não foi encontrado nas rotas, cai para pagina nao encontrada
];


@NgModule({
  imports: [
    RouterModule.forRoot(rotas)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
