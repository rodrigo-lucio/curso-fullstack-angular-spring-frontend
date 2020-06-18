import { CalendarModule } from 'primeng/calendar';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RelatoriosRoutingModule } from './relatorios-routing.module';
import { RelatorioLancamentosComponent } from './relatorio-lancamentos/relatorio-lancamentos.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [RelatorioLancamentosComponent],
  imports: [
    CommonModule,
    FormsModule,
    CalendarModule,
    SharedModule,
    RelatoriosRoutingModule,

  ],
})
export class RelatoriosModule { }
