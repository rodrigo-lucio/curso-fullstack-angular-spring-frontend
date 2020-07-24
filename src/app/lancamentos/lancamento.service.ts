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
  itensPorPagina = 7 ;
}

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

lancamentosUrl: string;

constructor(private http: HttpClient) {
  this.lancamentosUrl = `${environment.apiUrl}/lancamentos`;
}

  async pesquisar(filtro: LancamentoFiltro): Promise<any> {

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

    const response = await this.http.get(`${this.lancamentosUrl}?resumo`, { params })
      .toPromise();
    const lancamentos = response['content'];
    const resultado = {
      lancamentos,
      total: response['totalElements']
    };
    return resultado;
  }

  async buscarPorCodigo(codigo: number): Promise<Lancamento> {

    const response = await this.http.get<Lancamento>(
      `${this.lancamentosUrl}/${codigo}`)
      .toPromise();
    const lancamento = response;
    this.converterStringsParaDatas([lancamento]);
    return lancamento;

  }

  async excluir(codigo: number): Promise<void> {

    await this.http.delete(`${this.lancamentosUrl}/${codigo}`)
      .toPromise();
    return null;

  }

  adicionar(lancamento: Lancamento): Promise<Lancamento> {

    return this.http.post<Lancamento>(
      this.lancamentosUrl, lancamento)
    .toPromise();

  }

  async atualizar(lancamento: Lancamento): Promise<Lancamento> {

    const response = await this.http.put<Lancamento>(
      `${this.lancamentosUrl}/${lancamento.codigo}`, lancamento)
      .toPromise();
    const lancamentoAlterado = response;
    this.converterStringsParaDatas([lancamentoAlterado]);
    return lancamentoAlterado;

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

  urlUploadAnexo(): string {
    return `${this.lancamentosUrl}/anexo`;
  }

}
