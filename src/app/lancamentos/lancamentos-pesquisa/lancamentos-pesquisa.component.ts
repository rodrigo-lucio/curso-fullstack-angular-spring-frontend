import { AuthService } from './../../seguranca/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';

import { Table } from 'primeng/table/table';
import { ToastyService } from 'ng2-toasty';
import { LazyLoadEvent, ConfirmationService } from 'primeng/api';

import { LancamentoService, LancamentoFiltro } from './../lancamento.service';

import { Title } from '@angular/platform-browser';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new LancamentoFiltro();
  lancamentos = [];
  @ViewChild('tabela', {static: true}) grid: Table;

  constructor(private lancamentoService: LancamentoService,
              private toastyService: ToastyService,
              private confirmationService: ConfirmationService,
              private errorHandler: ErrorHandlerService,
              private titulo: Title,
              public auth: AuthService) { }

  ngOnInit() {
    this.titulo.setTitle('Pesquisa de Lançamentos');
  }

  aoMudarPagina(evento: LazyLoadEvent) {
    //console.log(evento);
    const pagina = evento.first / evento.rows;
    this.pesquisar(pagina);
  }

  pesquisar(pagina = 0) {

    this.filtro.pagina = pagina;

    this.lancamentoService.pesquisar(this.filtro).
        then(resultado => {
          this.totalRegistros = resultado.total;
          this.lancamentos = resultado.lancamentos;
        })
        .catch(erro => this.errorHandler.handle(erro));
  }


  confirmarExclusao(lancamento: any) {
    this.confirmationService.confirm({
      message: 'Deseja realmente excluir?',
      accept: () => {
         this.excluir(lancamento);
      }
    });
  }

  excluir(lancamento: any) {
    this.lancamentoService.excluir(lancamento.codigo)
    .then(() => {
      this.grid.reset();
      this.toastyService.success('Lançamento de excluído com sucesso.');
    })
    .catch(erro => this.errorHandler.handle(erro));
  }



}
