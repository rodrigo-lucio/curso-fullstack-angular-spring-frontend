import { environment } from './../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
@Injectable({
  providedIn: 'root'
})
export class RelatoriosService {

  lancamentosUrl: string;

  constructor(private httpClient: HttpClient) {
    this.lancamentosUrl = `${environment.apiUrl}/lancamentos`;
   }

  async relatorioLancamentosPorPessoa(inicio: Date, fim: Date) {

    // Para declarar os parâmetros
    let params = new HttpParams();

    params = params.set('inicio', moment(inicio).format('YYYY-MM-DD'));
    params = params.set('fim', moment(fim).format('YYYY-MM-DD'));

    const response = await this.httpClient.get(`${this.lancamentosUrl}/relatorios/por-pessoa`,
      { params, responseType: 'blob' })
      .toPromise();
    return response;

  }
}
