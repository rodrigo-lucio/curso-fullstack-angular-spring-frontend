import { DialogModule } from 'primeng/dialog';
import { SharedModule } from './../shared/shared.module';
import { DropdownModule } from 'primeng/dropdown';
import { TooltipModule } from 'primeng/tooltip';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { UsuariosRoutingModule } from './usuarios-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosPesquisaComponent } from './usuarios-pesquisa/usuarios-pesquisa.component';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';
import { UsuarioCadastroComponent } from './usuario-cadastro/usuario-cadastro.component';
import { PasswordModule } from 'primeng/password';

@NgModule({
  declarations: [UsuariosPesquisaComponent, UsuarioCadastroComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    DropdownModule,
    CheckboxModule,
    UsuariosRoutingModule,
    PasswordModule,
    DialogModule,

    SharedModule
  ]
})
export class UsuariosModule { }

