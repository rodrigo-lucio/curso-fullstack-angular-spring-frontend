import { MenuItem } from 'primeng/api';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { CoreModule } from './core/core.module';

import { SegurancaModule } from './seguranca/seguranca.module';

import { AppComponent } from './app.component';

import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

import { TieredMenuModule } from 'primeng/tieredmenu';


registerLocaleData(localePt, 'pt-BR');

@NgModule({
  declarations: [
    AppComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,

    CoreModule,
    SegurancaModule,
    AppRoutingModule,
    TieredMenuModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
