import { PessoasRoutingModule } from './pessoas-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';

import { SharedModule } from './../shared/shared.module';
import { PessoaCadastroComponent } from './pessoa-cadastro/pessoa-cadastro.component';
import { PessoasPesquisaComponent } from './pessoas-pesquisa/pessoas-pesquisa.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PessoaCadastroComponent,
    PessoasPesquisaComponent
  ],
  exports: [
  //  PessoaCadastroComponent, NAO PRECISAMOS MAIS EXPORTAR, pois agora o roteador cuida disso, não chamamos mais o componente <app-pessoas-component> no app-component
  //  PessoasPesquisaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,

    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    DropdownModule,
    InputTextareaModule,
    CalendarModule,
    SelectButtonModule,
    InputMaskModule,

    SharedModule,

    PessoasRoutingModule
  ]
})
export class PessoasModule { }
