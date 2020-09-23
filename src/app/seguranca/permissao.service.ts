import { Permissao } from './../core/model';
import { environment } from './../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PermissaoService {

  permissoesUrl: string;

  constructor(private httpClient: HttpClient) {
    this.permissoesUrl = `${environment.apiUrl}/permissoes`;
  }

  async buscaPorTipoPermissao(codigo: number): Promise<any> {

    let params = new HttpParams();
    params = params.set('tipoPermissao', codigo.toString());

    const response = await this.httpClient.get(this.permissoesUrl, { params })
      .toPromise();
    return response;

  }

  async buscarTodas(): Promise<any> {

    const response = await this.httpClient.get(this.permissoesUrl)
      .toPromise();
    return response;

  }

}

