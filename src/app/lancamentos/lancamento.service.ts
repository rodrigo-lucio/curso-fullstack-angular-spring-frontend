import { environment } from './../../environments/environment';
import { Lancamento } from './../core/model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import * as moment from 'moment';
export class LancamentoFiltro {
  descricao: string;
  dataVencimentoDe: Date;
  dataVencimentoAte: Date;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

lancamentosUrl: string;

constructor(private http: HttpClient) {
  this.lancamentosUrl = `${environment.apiUrl}/lancamentos`;
}

  pesquisar(filtro: LancamentoFiltro): Promise<any> {

    let params = new HttpParams();

    if (filtro.descricao) {
      params = params.set('descricao', filtro.descricao);
    }

    if (filtro.dataVencimentoDe) {
      params = params.set('dataVencimentoDe', moment(filtro.dataVencimentoDe).format('YYYY-MM-DD'));
    }

    if (filtro.dataVencimentoAte) {
      params = params.set('dataVencimentoAte', moment(filtro.dataVencimentoAte).format('YYYY-MM-DD'));
    }

    params = params.set('page', filtro.pagina.toString());
    params = params.set('size', filtro.itensPorPagina.toString());

    return this.http.get(`${this.lancamentosUrl}?resumo`, { params })
      .toPromise()
      .then(response => {

        const lancamentos = response['content'];

        const resultado = {
          lancamentos,
          total: response['totalElements']
        }

        return resultado;

      });
  }

  buscarPorCodigo(codigo: number): Promise<Lancamento> {
    //Caso queira passar o header para basic
    //const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return this.http.get<Lancamento>(
      `${this.lancamentosUrl}/${codigo}`)
    .toPromise()
    .then(response => {
      const lancamento = response;

      this.converterStringsParaDatas([lancamento]);

      return lancamento;
    });

  }

  excluir(codigo: number): Promise<void> {

    return this.http.delete(`${this.lancamentosUrl}/${codigo}`)
      .toPromise()
      .then(() => null);

  }

  adicionar(lancamento: Lancamento): Promise<Lancamento> {

    return this.http.post<Lancamento>(
      this.lancamentosUrl, lancamento)
    .toPromise();

  }

  atualizar(lancamento: Lancamento): Promise<Lancamento> {

    return this.http.put<Lancamento>(
      `${this.lancamentosUrl}/${lancamento.codigo}` , lancamento)
    .toPromise()
    .then(response => {
      const lancamentoAlterado = response;

      this.converterStringsParaDatas([lancamentoAlterado]);

      return lancamentoAlterado;
    });

  }

  private converterStringsParaDatas(lancamentos: Lancamento[]) {
    for (const lancamento of lancamentos) {
      lancamento.dataVencimento = moment(lancamento.dataVencimento,
        'YYYY-MM-DD').toDate();

      if (lancamento.dataPagamento) {
        lancamento.dataPagamento = moment(lancamento.dataPagamento,
          'YYYY-MM-DD').toDate();
      }
    }
  }


}
