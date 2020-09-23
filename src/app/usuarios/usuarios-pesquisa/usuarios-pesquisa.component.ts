import { Title } from '@angular/platform-browser';
import { Table } from 'primeng/table/table';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { Usuario, Permissao } from './../../core/model';
import { UsuarioService, UsuarioFiltro } from './../usuario.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-usuarios-pesquisa',
  templateUrl: './usuarios-pesquisa.component.html',
  styleUrls: ['./usuarios-pesquisa.component.css']
})
export class UsuariosPesquisaComponent implements OnInit {

  filtro = new UsuarioFiltro();
  totalRegistros = 0;
  usuarios = [];
  loading: boolean;
  valoresFiltroSituacao = [];

  @ViewChild('tabela', { static: true }) grid: Table;

  constructor(
    private usuarioService: UsuarioService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private titulo: Title
  ) {

  }

  ngOnInit() {

    this.titulo.setTitle('Pesquisa de Usuários');

    this.valoresFiltroSituacao = [
      { label: 'Ativos', value: true },
      { label: 'Inativos', value: false },
      { label: 'Todos', value: null },
    ];

  }

  aoMudarPagina(evento: LazyLoadEvent) {
    const pagina = evento.first / evento.rows;

    setTimeout(() => {
      this.pesquisar(pagina);
    }, this.getTimeout());

  }

  pesquisar(pagina = 0) {

    if (!this.loading) {

      this.filtro.pagina = pagina;
      this.loading = true;

      setTimeout(() => {
        this.usuarioService.pesquisar(this.filtro).
          then(resultado => {

            this.usuarios = resultado.pessoas;
            this.totalRegistros = resultado.total;
            this.loading = false;
          })
          .catch(erro => this.errorHandler.handle(erro));
      }, this.getTimeout());

    }

  }

  private getTimeout() {
    return 750;
  }

  alterarStatusUsuario(usuario: any) {
    let usuarioNovoStatus = new Usuario();
    usuarioNovoStatus.codigo = usuario.codigo;
    usuarioNovoStatus.ativo = !usuario.ativo;
    usuarioNovoStatus.permissoes = null;

    this.usuarioService.atualizar(usuarioNovoStatus).then(() => {
      this.grid.reset();
      this.messageService.add({ severity: 'success', detail: 'Usuario ' + (usuarioNovoStatus.ativo ? 'ativado' : 'inativado') + ' com sucesso.' });
    }
    ).catch(erro => this.errorHandler.handle(erro));
  }

}
