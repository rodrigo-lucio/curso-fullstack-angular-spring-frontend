import { Usuario } from './../core/model';
import { environment } from './../../environments/environment';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class UsuarioFiltro {
  usuario: string;
  ativo = true;
  pagina = 0;
  itensPorPagina = 8;
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuariosUrl: string;

  constructor(private httpClient: HttpClient) {
    this.usuariosUrl = `${environment.apiUrl}/usuarios`;
  }

  async pesquisar(filtro: UsuarioFiltro): Promise<any> {

    let params = new HttpParams();

    if (filtro.usuario) {
      params = params.set('usuario', filtro.usuario);
    }


    if (filtro.ativo != null) {
      params = params.set('ativo', filtro.ativo.toString());
    }

    params = params.set('page', filtro.pagina.toString());
    params = params.set('size', filtro.itensPorPagina.toString());

    const response = await this.httpClient.get(`${this.usuariosUrl}?resumo`, { params })
      .toPromise();

    const pessoas = response['content'];

    const resultado = {
      pessoas,
      total: response['totalElements']
    }

    return resultado;

  }

  async buscaPorCodigo(codigo: number): Promise<Usuario> {

    const response = await this.httpClient.get<Usuario>(`${this.usuariosUrl}/${codigo}`)
      .toPromise();
    return response;

  }

  async adicionar(usuario: Usuario): Promise<Usuario> {

    const response = await this.httpClient.post<Usuario>(this.usuariosUrl, usuario)
      .toPromise();
    return response;

  }

  async atualizar(usuario: Usuario): Promise<Usuario> {

    const response = await this.httpClient.put<Usuario>(`${this.usuariosUrl}/${usuario.codigo}`, usuario)
      .toPromise();
    return response;

  }

  async alterarSenha(codigoUsuario: number, senhaAtual: string, novaSenha: string, novaSenhaConfirma: string): Promise<any> {

    const headers = new HttpHeaders()
      .append('Content-Type', 'application/x-www-form-urlencoded');

    const body = `senha_atual=${senhaAtual}&nova_senha=${novaSenha}&nova_senha_conf=${novaSenhaConfirma}`;
    const response = await this.httpClient.put(`${this.usuariosUrl}/alterarsenha/${codigoUsuario}`, body, { headers }).toPromise();
    return response;

  }

}
