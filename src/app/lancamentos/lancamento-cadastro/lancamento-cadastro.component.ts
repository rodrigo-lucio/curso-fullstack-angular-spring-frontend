import { NgForm } from '@angular/forms';
import { Component, OnInit, LOCALE_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { ToastyService } from 'ng2-toasty';

import { LancamentoService, LancamentoFiltro } from './../lancamento.service';
import { Lancamento } from './../../core/model';
import { PessoaService } from './../../pessoas/pessoa.service';
import { CategoriaService } from './../../categorias/categoria.service';
import { ErrorHandlerService } from './../../core/error-handler.service';



@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  tipoSelecionado = 'RECEITA';

  pessoaTeste: string;

  tipos = [
    {label: 'Receita', value: 'RECEITA'},
    {label: 'Despesa', value: 'DESPESA'}
  ];

  categorias = [];
  pessoas = [];
  lancamento = new Lancamento();

  constructor(private categoriaService: CategoriaService,
              private pessoaService: PessoaService,
              private lancamentoService: LancamentoService,
              private toastyService: ToastyService,
              private errorHandler: ErrorHandlerService,
              private rota: ActivatedRoute,
              private router: Router,
              private titulo: Title) { }

  ngOnInit() {

    this.titulo.setTitle('Novo lançamento');
    //Faz o get na URL
    const codigoLancamento = this.rota.snapshot.params['codigo'];

    if (codigoLancamento) {
      this.carregarLancamento(codigoLancamento);
    }

    this.carregarCategorias();
    this.carregarPessoas();

  }

  atualizarTituloLancamento() {
    this.titulo.setTitle('Edição de lançamento: ' + this.lancamento.descricao);
  }

  get editando() {
    return Boolean(this.lancamento.codigo);
  }

  carregarCategorias() {
    return this.categoriaService.listarTodas()
      .then(categorias => {
        this.categorias = categorias.map(c => ({ label: c.nome, value: c.codigo }));
      })
      .catch(erro => this.errorHandler.handle(erro));
    }

  carregarPessoas() {
    return this.pessoaService.listarTodas()
      .then(pessoas => {
        this.pessoas = pessoas.map(pessoa => ({ label: pessoa.nome, value: pessoa.codigo }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  salvar(form: NgForm) {
      if (this.editando) {
        this.atualizarLancamento(form);
      } else {
        this.adicionarLancamento(form);
      }
  }

  adicionarLancamento(form: NgForm) {
      this.lancamentoService.adicionar(this.lancamento)
      .then(() => {
        this.toastyService.success('Lançamento adicionado com sucesso.');

        //Substituido pelo de baixo
        //form.reset();
        //this.lancamento = new Lancamento();
        this.router.navigate(['/lancamentos']);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarLancamento(form: NgForm) {
    this.lancamentoService.atualizar(this.lancamento)
    .then((lancamento) => {

      this.lancamento = lancamento;
      this.toastyService.success('Lançamento alterado com sucesso.');

      this.router.navigate(['/lancamentos']);

    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  carregarLancamento(codigo: number){
      this.lancamentoService.buscarPorCodigo(codigo)
      .then(lancamento => {
        this.lancamento = lancamento;
        this.atualizarTituloLancamento();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }
}
