import { NaoAutorizadoComponent } from './core/nao-autorizado.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaginaNaoEncontradaComponent } from './core/pagina-nao-encontrada.component';

const rotas: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},   //Redireciona para lancamentos quando digitar localhost:8080
  {path: 'pagina-nao-encontrada', component: PaginaNaoEncontradaComponent},
  {path: 'nao-autorizado', component: NaoAutorizadoComponent},
  {path: '**', component: PaginaNaoEncontradaComponent} //os ** serve para dizer, qualquer coisa que for diferente ou não foi encontrado nas rotas, cai para pagina nao encontrada
];


@NgModule({
  imports: [
    RouterModule.forRoot(rotas)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
