import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { AuthService } from './../../seguranca/auth.service';
import { Component, OnInit } from '@angular/core';
import { ErrorHandlerService } from '../error-handler.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public auth: AuthService,
    private router: Router,
    private errrorHandle: ErrorHandlerService) { }

  display = false;

  items: MenuItem[];

  ngOnInit() {
    this.items = [
      {
        label: 'Dashboard',
        icon: 'pi pi-home',
        routerLink: '/dashboard',
        visible: this.auth.temPermissao('ROLE_PESQUISAR_LANCAMENTO')
      },
      {
        label: 'Lançamentos',
        icon: 'pi pi-chart-line',
        items: [
          {
            label: 'Incluir',
            icon: 'pi pi-plus',
            routerLink: '/lancamentos/novo',
            visible: this.auth.temPermissao('ROLE_CADASTRAR_LANCAMENTO')
          },
          {
            label: 'Consultar',
            icon: 'pi pi-search',
            routerLink: '/lancamentos',
            visible: this.auth.temPermissao('ROLE_PESQUISAR_LANCAMENTO')
          }
        ]
      },
      {
        label: 'Pessoas',
        icon: 'pi pi-users',
        items: [
          {
            label: 'Incluir',
            icon: 'pi pi-plus',
            routerLink: '/pessoas/novo',
            visible: this.auth.temPermissao('ROLE_CADASTRAR_PESSOA')
          },
          {
            label: 'Consultar',
            icon: 'pi pi-search',
            routerLink: '/pessoas',
            visible: this.auth.temPermissao('ROLE_PESQUISAR_PESSOA')
          }
        ]
      },
      {
        label: 'Usuários',
        icon: 'pi pi-user',
        visible: this.auth.temPermissao('ROLE_PESQUISAR_USUARIO') || this.auth.temPermissao('ROLE_CADASTRAR_USUARIO'),
        items: [
          {
            label: 'Incluir',
            icon: 'pi pi-plus',
            routerLink: '/usuarios/novo',
            visible: this.auth.temPermissao('ROLE_CADASTRAR_USUARIO')
          },
          {
            label: 'Consultar',
            icon: 'pi pi-search',
            routerLink: '/usuarios',
            visible: this.auth.temPermissao('ROLE_PESQUISAR_USUARIO')
          }
        ]
      },
      {
        label: 'Relatórios',
        icon: 'pi pi-print',
        items: [
          {
            label: 'Lançamentos por Pessoa',
            icon: 'pi pi-print',
            routerLink: '/relatorios/lancamentos',
            visible: this.auth.temPermissao('ROLE_PESQUISAR_LANCAMENTO')
          }
        ]
      },
      {
        label: 'Alterar Senha',
        icon: 'pi pi-key',
        command: () => {
          this.formAlterarSenha();
        },
      },
      {
        label: 'Sair',
        icon: 'pi pi-sign-out ',
        command: () => {
          this.logout();
        },
      }
    ];
  }

  criarNovoAcessToken() {
    this.auth.obterNovoAccessToken();
  }

  logout() {
    this.auth.logout()
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch(erro => {
        this.errrorHandle.handle(erro);
      });
  }

  onDialogClose(event) {
    this.display = event;
  }

  formAlterarSenha() {
    this.display = true;
  }
}
