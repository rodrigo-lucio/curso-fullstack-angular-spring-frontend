import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginFormComponent } from './login-form/login-form.component';

const rotas: Routes = [
  {path: 'login', component: LoginFormComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(rotas) //usa chield por que não é o modulo app-module
  ],
  exports: [RouterModule]
})
export class SegurancaRoutingModule { }
