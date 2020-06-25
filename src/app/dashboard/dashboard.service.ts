import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  lancamentosUrl: string;

  constructor(private http: HttpClient) {
    this.lancamentosUrl = `${environment.apiUrl}/lancamentos`;
  }

  lancamentosPorCategoria(): Promise<Array<any>> {
    return this.http.get(`${this.lancamentosUrl}/estatisticas/por-categoria`)
    .toPromise()
    .then(response => response as Array<any>);
  }

  lancamentosPorDia(): Promise<Array<any>> {
    return this.http.get(`${this.lancamentosUrl}/estatisticas/por-dia`)
    .toPromise()
    .then(response => {
       const dados = response as Array<any>;
       this.converterStringsParaDatas(dados);
       this.converterRealBrasileiro(dados);
       return dados;
    });
  }

  pessoasMaisDevem(): Promise<Array<any>> {
    return this.http.get(`${this.lancamentosUrl}/estatisticas/valor-por-pessoa`)
    .toPromise()
    .then(response => response as Array<any>);
  }

  lancamentosPorAno(ano: number): Promise<Array<any>> {
    return this.http.get(`${this.lancamentosUrl}/estatisticas/por-ano/${ano}`)
    .toPromise()
    .then(response => {
       const dados = response as Array<any>;
       return dados;
    });
  }

  private converterStringsParaDatas(dados: Array<any>) {
    for (const dado of dados) {
      dado.dia = moment(dado.dia, 'YYYY-MM-DD').toDate();
    }
  }

  private converterRealBrasileiro(dados: Array<any>){
    for (const dado of dados) {
     // dado.total = dado.total.toLocaleString('pt-br', {minimumFractionDigits: 2});
    }
  }
}
