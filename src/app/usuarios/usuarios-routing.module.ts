import { UsuarioCadastroComponent } from './usuario-cadastro/usuario-cadastro.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './../seguranca/auth.guard';
import { NgModule } from '@angular/core';
import { UsuariosPesquisaComponent } from './usuarios-pesquisa/usuarios-pesquisa.component';

const rotas: Routes = [
  {
    path: '',
    component: UsuariosPesquisaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_USUARIO'] }
  },
  {
    path: 'novo',
    component: UsuarioCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_USUARIO'] }
  },
  {
    path: ':codigo',
    component: UsuarioCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_USUARIO'] }
  }

];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(rotas)
  ],
  exports: [
    RouterModule
  ]
})
export class UsuariosRoutingModule { }
