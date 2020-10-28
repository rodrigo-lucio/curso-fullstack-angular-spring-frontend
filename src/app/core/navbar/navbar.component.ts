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
  displaySide = false;

  items: MenuItem[];
  itemsButtonUser: MenuItem[];

  ngOnInit() {
    this.items = [
      this.configurarActionItemMenu(
        'Dashboard', 'pi pi-home', '/dashboard',
        this.auth.temPermissao('ROLE_PESQUISAR_LANCAMENTO')),
      {
        label: 'Lançamentos',
        icon: 'pi pi-chart-line',
        items: [
          this.configurarActionItemMenu(
            'Incluir', 'pi pi-plus', '/lancamentos/novo',
            this.auth.temPermissao('ROLE_CADASTRAR_LANCAMENTO'))
          ,
          this.configurarActionItemMenu(
            'Consultar', 'pi pi-search', '/lancamentos',
            this.auth.temPermissao('ROLE_PESQUISAR_LANCAMENTO'))
        ]
      },
      {
        label: 'Pessoas',
        icon: 'pi pi-users',
        items: [

          this.configurarActionItemMenu(
            'Incluir', 'pi pi-plus', '/pessoas/novo',
            this.auth.temPermissao('ROLE_CADASTRAR_PESSOA'))
          ,
          this.configurarActionItemMenu(
            'Consultar', 'pi pi-search', '/pessoas',
            this.auth.temPermissao('ROLE_PESQUISAR_PESSOA'))
        ]
      },
      {
        label: 'Usuários',
        icon: 'pi pi-user',
        visible: this.auth.temPermissao('ROLE_PESQUISAR_USUARIO') || this.auth.temPermissao('ROLE_CADASTRAR_USUARIO'),
        items: [


          this.configurarActionItemMenu(
            'Incluir', 'pi pi-plus', '/usuarios/novo',
            this.auth.temPermissao('ROLE_CADASTRAR_USUARIO')),

          this.configurarActionItemMenu(
            'Consultar', 'pi pi-search', '/usuarios',
            this.auth.temPermissao('ROLE_PESQUISAR_USUARIO')),
        ]
      },
      {
        label: 'Relatórios',
        icon: 'pi pi-print',
        items: [
          this.configurarActionItemMenu(
            'Lançamentos por Pessoa', 'pi pi-print', '/relatorios/lancamentos',
            this.auth.temPermissao('ROLE_PESQUISAR_LANCAMENTO'))
        ]
      }
    ];

    this.itemsButtonUser = [
      {
        label: 'Alterar Senha',
        icon: 'pi pi-key',
        command: () => {
          this.displaySide = false;
          this.formAlterarSenha();
        },
      },
      {
        label: 'Sair',
        icon: 'pi pi-sign-out ',
        routerLink: null,
        command: () => {
          this.logout();
        },
      }


    ];
  }

  criarNovoAcessToken() {
    this.auth.obterNovoAccessToken();
  }

  configurarActionItemMenu(label: string, icon: string, routerlink: string, visible) {
    return {
      label: label,
      icon: icon,
      routerLink: routerlink,
      visible: visible,
      command: () => { this.displaySide = false; }
    }
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

  getPrimeiroNome() {
    return this.auth.jwtPayload?.nome.substring(0, this.auth.jwtPayload?.nome.indexOf(' '));
  }
}
