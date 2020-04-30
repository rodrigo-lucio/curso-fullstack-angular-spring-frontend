import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Pessoa } from '../core/model';

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

  constructor(private http: HttpClient) {
    this.pessoasUrl = `${environment.apiUrl}/pessoas`;
  }

  pesquisar(filtro: PessoaFiltro): Promise<any> {

    let params = new HttpParams();

    if (filtro.nome) {
      params = params.set('nome', filtro.nome);
    }
    params = params.set('page', filtro.pagina.toString());
    params = params.set('size', filtro.itensPorPagina.toString());

    return this.http.get(this.pessoasUrl, { params })
      .toPromise()
      .then(response => {

        const pessoas = response['content'];

        const resultado = {
          pessoas,
          total: response['totalElements']
        }

        return resultado;

      });

  }

  buscaPorCodigo(codigo: number): Promise<Pessoa> {

    return this.http.get<Pessoa>(
      `${this.pessoasUrl}/${codigo}`)
        .toPromise()
        .then(response => {
          const pessoa = response;
          return pessoa;
        });


  }

  listarTodas(): Promise<any> {

    return this.http.get(this.pessoasUrl)
      .toPromise()
      .then(response => {
        return response['content'];
      });

  }

  excluir(codigo: number): Promise<void> {

    return this.http.delete(`${this.pessoasUrl}/${codigo}`)
    .toPromise()
    .then(() => null);

  }

  alterarStatus(codigo: number, ativo: boolean): Promise<void> {

    const headers = new HttpHeaders()
    .append('Content-Type', 'application/json');

    return this.http.put(`${this.pessoasUrl}/${codigo}/ativo`, ativo, {headers})
    .toPromise()
    .then(() => null);

  }

  adicionar(pessoa: Pessoa): Promise<Pessoa> {

    return this.http.post<Pessoa>(
      this.pessoasUrl, pessoa)
    .toPromise();

  }

  atualizar(pessoa: Pessoa): Promise<Pessoa> {

    return this.http.put<Pessoa>(
      `${this.pessoasUrl}/${pessoa.codigo}`, pessoa)
      .toPromise()
      .then(response => {
        const pessoaAlterada = response;
        return pessoaAlterada;
      });

  }

}
