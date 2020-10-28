import { NgForm, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { MessageService } from 'primeng/api';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { PessoaService } from './../pessoa.service';
import { Pessoa, Contato } from 'src/app/core/model';
import * as cep from 'cep-promise'

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

    this.pessoa.endereco.cep = this.pessoa.endereco.cep.replace('-', '').replace('.', '');
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
      this.buscarCidade();
    })
      .catch(erro => this.errorHandler.handle(erro));
  }

  buscarCep() {

    this.pessoa.endereco.cep = this.pessoa.endereco.cep.replace('-', '').replace('.', '');

    if (this.pessoa.endereco.cep) {

      cep(this.pessoa.endereco.cep).then(
        cepResponse => {

          this.pessoa.endereco.logradouro = cepResponse.street;
          this.pessoa.endereco.cidade.nome = cepResponse.city;
          this.pessoa.endereco.bairro = cepResponse.neighborhood;

          this.pessoaservice.buscaEstadoPorUf(cepResponse.state)
            .then((ufResponse) => {
              this.estadoSelecionado = ufResponse[0].codigo;
              this.pessoa.endereco.cidade.estado.codigo = this.estadoSelecionado;
              this.pessoa.endereco.cidade.estado.uf = ufResponse[0].uf;

              this.pessoaservice.adicionarCidade(this.pessoa.endereco.cidade)
                .then(() => {
                  //this.messageService.add({ severity: 'success', detail: 'Cidade adicionada com sucesso.' });
                  this.carregarCidades();
                })
                .catch(erro => {

                  if (erro.error[0].mensagemUsuario != 'Cidade já cadastrada') {
                    this.errorHandler.handle(erro);
                  } else {
                    this.carregarCidades();
                  }

                });

            })
            .catch(erro => this.errorHandler.handle(erro));


        }
      ).catch(erro => {
        console.log(erro);
        this.errorHandler.handle(erro);

      });

    }
  }

  private buscarCidade() {

    if (this.pessoa.endereco.cidade.nome && this.pessoa.endereco.cidade.estado.uf) {
      this.pessoaservice.pesquisarCidade(this.pessoa.endereco.cidade.nome, this.pessoa.endereco.cidade.estado.uf)
        .then((cidadeResponse) => {
          this.pessoa.endereco.cidade.codigo = cidadeResponse[0].codigo;
        })
        .catch(erro => this.errorHandler.handle(erro));

    }
  }

}
