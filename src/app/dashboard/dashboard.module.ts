import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { ChartModule } from 'primeng/chart';
import { DropdownModule } from 'primeng/dropdown';
import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { SharedModule } from './../shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  declarations: [DashboardComponent],
  imports: [

    PanelModule,
    ChartModule,
    DropdownModule,
    ButtonModule,

    CommonModule,
    SharedModule,
    DashboardRoutingModule,
  ],
  providers: [ DecimalPipe ]
})
export class DashboardModule { }
