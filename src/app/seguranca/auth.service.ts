import { environment } from './../../environments/environment';

import { Router } from '@angular/router';
import { JwtHelperService,  JwtModule} from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

JwtModule.forRoot({
  config: {
    tokenGetter: () => {
      return '';
    }
  }
});

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  oauthTokenUrl: string;
  revokeTokenUrl: string;

  jwtPayload: any;

  constructor(private http: HttpClient,
              private jwtHelper: JwtHelperService,
              private router: Router) {
                this.carregarToken();
                this.oauthTokenUrl = `${environment.apiUrl}/oauth/token`;
                this.revokeTokenUrl = `${environment.apiUrl}/tokens/revoke`;
  }

  login(usuario: string, senha: string ): Promise<void> {

    const headers = new HttpHeaders()
    .append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==')
    .append('Content-Type', 'application/x-www-form-urlencoded');
    const body = `username=${usuario}&password=${senha}&grant_type=password`;

    // withCredentials: true = para enviar o cookie em resquisições de origens diferentes, se for a mesma nao precisa
    return this.http.post(this.oauthTokenUrl, body, { headers, withCredentials: true })
    .toPromise()
    .then(response => {

      this.decodificarToken(response['access_token']);
      this.armazenarToken(response['access_token']);

    })
    .catch(response => {
      const responseError = response.error;

      if (response.status === 400) {
        if (responseError.error === 'invalid_grant') {
          return Promise.reject('Usuário ou senha inválida.');
        }
      }

      return Promise.reject(response);

    });

  }

  logout(): Promise<any> {

    return this.http.delete(this.revokeTokenUrl, {withCredentials: true})
    .toPromise()
    .then(() => {
      this.limparAccessToken();
    });
  }

  private carregarToken() {
    const token = localStorage.getItem('token');

    if (token) {
      this.decodificarToken(token);
    }
  }

  private decodificarToken(token: string) {
    this.jwtPayload = this.jwtHelper.decodeToken(token);
  }

  private armazenarToken(token: string) {
    localStorage.setItem('token', token);
  }

  obterNovoAccessToken(): Promise<void> {
    const headers = new HttpHeaders()
    .append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==')
    .append('Content-Type', 'application/x-www-form-urlencoded');
    const body = 'grant_type=refresh_token';

    return this.http.post(this.oauthTokenUrl, body, { headers, withCredentials: true})
    .toPromise()
    .then(response => {

      this.decodificarToken(response['access_token']);
      this.armazenarToken(response['access_token']);
      return Promise.resolve(null);

    })
    .catch(erro => {
        return Promise.resolve(null);
    });

  }

  isAccessTokenInvalido() {
    const token = localStorage.getItem('token');

                      // da problema no heroku - delay
    return !token || this.jwtHelper.isTokenExpired(token);
  }

  limparAccessToken() {
    localStorage.removeItem('token');
    this.jwtPayload = null;
  }

  public temPermissao(permissao: string) {
    return this.jwtPayload && this.jwtPayload.authorities.includes(permissao);
  }

  temQualquerPermissao(roles) {
    for (const role of roles) {
      if (this.temPermissao(role)) {
        return true;
      }
    }

    return false;
  }

}
