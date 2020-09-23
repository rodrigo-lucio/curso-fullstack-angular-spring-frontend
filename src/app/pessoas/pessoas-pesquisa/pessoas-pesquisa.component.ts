import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild } from '@angular/core';

import { Table } from 'primeng/table/table';
import { MessageService } from 'primeng/api';
import { LazyLoadEvent, ConfirmationService } from 'primeng/api';

import { PessoaService, PessoaFiltro } from './../pessoa.service';
import { ErrorHandlerService } from './../../core/error-handler.service';


@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new PessoaFiltro();
  pessoas = [];
  @ViewChild('tabela', { static: true }) grid: Table;

  constructor(private pessoaService: PessoaService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private errorHandler: ErrorHandlerService,
    private titulo: Title) { }

  ngOnInit() {
    this.titulo.setTitle('Pesquisa de Pessoas');
  }

  aoMudarPagina(evento: LazyLoadEvent) {
    const pagina = evento.first / evento.rows;
    this.pesquisar(pagina);
  }

  pesquisar(pagina = 0) {

    this.filtro.pagina = pagina;

    this.pessoaService.pesquisar(this.filtro).
      then(resultado => {
        this.totalRegistros = resultado.total;
        this.pessoas = resultado.pessoas;
      })
      .catch(erro => this.errorHandler.handle(erro));

  }

  confirmarExclusao(pessoa: any) {
    this.confirmationService.confirm({
      message: 'Deseja realmente excluir?',
      accept: () => {
        this.excluir(pessoa);
      }
    });
  }

  excluir(pessoa: any) {
    this.pessoaService.excluir(pessoa.codigo)
      .then(() => {
        this.grid.reset();
        this.messageService.add({ severity: 'success', detail: 'Pessoa excluída com sucesso' });
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  alterarStatus(pessoa: any) {
    this.pessoaService.alterarStatus(pessoa.codigo, !pessoa.ativo)
      .then(() => {
        this.grid.reset();
        this.messageService.add({ severity: 'success', detail: 'Pessoa ' + (pessoa.ativo ? 'inativada' : 'ativada') + ' com sucesso' });
      })
      .catch(erro => this.errorHandler.handle(erro));
  }




}
