import { NgForm, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { MessageService } from 'primeng/api';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { PessoaService } from './../pessoa.service';
import { Pessoa, Contato } from 'src/app/core/model';


@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  pessoa = new Pessoa();


  listaUf = [];
  listaCidades = [];

  estadoSelecionado: number;

  constructor(private pessoaservice: PessoaService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private rota: ActivatedRoute,
    private router: Router,
    private titulo: Title) { }

  ngOnInit() {

    this.titulo.setTitle('Nova pessoa');

    this.carregarEstados();

    // Faz o get na url --- /{codigo}
    const codigoPessoa = this.rota.snapshot.params['codigo'];

    if (codigoPessoa) {
      this.carregarPessoa(codigoPessoa);
    }


  }

  atualizarTituloPessoa() {
    this.titulo.setTitle('Edição de pessoa: ' + this.pessoa.nome);
  }

  get editando() {
    return Boolean(this.pessoa.codigo);
  }

  salvar(form: NgForm) {

    if (this.editando) {
      this.atualizar(form);
    } else {
      this.adicionar(form);
    }

  }

  adicionar(form: NgForm) {
    this.pessoaservice.adicionar(this.pessoa)
      .then(() => {

        this.messageService.add({ severity: 'success', detail: 'Pessoa adicionada com sucesso.' });

        this.pessoa = new Pessoa();
        this.router.navigate(['/pessoas']);

      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizar(form: NgForm) {
    this.pessoaservice.atualizar(this.pessoa)
      .then((pessoa) => {
        this.pessoa = pessoa;

        this.messageService.add({ severity: 'success', detail: 'Pessoa alterada com sucesso.' });

        this.router.navigate(['/pessoas']);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarPessoa(codigo: number) {
    this.pessoaservice.buscaPorCodigo(codigo)
      .then(pessoa => {

        this.pessoa = pessoa;
        this.estadoSelecionado = (this.pessoa.endereco.cidade) ? this.pessoa.endereco.cidade.estado.codigo : null;

        if (this.estadoSelecionado) {
          this.carregarCidades();
        }

        this.atualizarTituloPessoa();
      });
  }

  carregarEstados() {
    this.pessoaservice.listarEstados().then(listaEstados => {
      // Carrega o dropdown
      this.listaUf = listaEstados.map(uf => ({ label: uf.nome, value: uf.codigo }));
    })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarCidades() {
    this.pessoaservice.pesquisarCidades(this.estadoSelecionado).then(listaCidades => {
      this.listaCidades = listaCidades.map(cidade => ({ label: cidade.nome, value: cidade.codigo }));
    })
      .catch(erro => this.errorHandler.handle(erro));
  }

}
