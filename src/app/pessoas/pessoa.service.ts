import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Pessoa, Estado, Cidade } from '../core/model';

export class PessoaFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}
@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  pessoasUrl: string;
    cidadesUrl: string;
  estadosUrl: string;

  constructor(private http: HttpClient) {
    this.pessoasUrl = `${environment.apiUrl}/pessoas`;
    this.cidadesUrl = `${environment.apiUrl}/cidades`;
    this.estadosUrl = `${environment.apiUrl}/estados`;
  }

  async pesquisar(filtro: PessoaFiltro): Promise<any> {

    let params = new HttpParams();

    if (filtro.nome) {
      params = params.set('nome', filtro.nome);
    }
    params = params.set('page', filtro.pagina.toString());
    params = params.set('size', filtro.itensPorPagina.toString());

    const response = await this.http.get(this.pessoasUrl, { params })
      .toPromise();
    const pessoas = response['content'];
    const resultado = {
      pessoas,
      total: response['totalElements']
    };

    return resultado;

  }

  async buscaPorCodigo(codigo: number): Promise<Pessoa> {

    const response = await this.http.get<Pessoa>(
      `${this.pessoasUrl}/${codigo}`)
      .toPromise();
    const pessoa = response;
    return pessoa;


  }

  async listarTodas(): Promise<any> {

    const response = await this.http.get(this.pessoasUrl)
      .toPromise();
    return response['content'];

  }

  async excluir(codigo: number): Promise<void> {

    await this.http.delete(`${this.pessoasUrl}/${codigo}`)
      .toPromise();
    return null;

  }

  async alterarStatus(codigo: number, ativo: boolean): Promise<void> {

    const headers = new HttpHeaders()
    .append('Content-Type', 'application/json');

    await this.http.put(`${this.pessoasUrl}/${codigo}/ativo`, ativo, { headers })
      .toPromise();
    return null;

  }

  adicionar(pessoa: Pessoa): Promise<Pessoa> {

    return this.http.post<Pessoa>(
      this.pessoasUrl, pessoa)
    .toPromise();

  }

  async atualizar(pessoa: Pessoa): Promise<Pessoa> {

    const response = await this.http.put<Pessoa>(
      `${this.pessoasUrl}/${pessoa.codigo}`, pessoa)
      .toPromise();
    const pessoaAlterada = response;
    return pessoaAlterada;

  }

  async listarEstados(): Promise<Estado[]> {
    const response = await this.http.get<Estado[]>(this.estadosUrl)
      .toPromise();
    return response;
  }

  async pesquisarCidades(estado): Promise<Cidade[]> {

    let params = new HttpParams();
    params = params.set('estado', estado);

    const response = await this.http.get<Cidade[]>(this.cidadesUrl, { params })
      .toPromise();
    return response;
  }

}
