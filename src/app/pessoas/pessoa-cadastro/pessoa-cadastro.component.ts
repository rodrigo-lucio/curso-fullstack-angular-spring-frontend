import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { ToastyService } from 'ng2-toasty';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { PessoaService } from './../pessoa.service';
import { Pessoa } from 'src/app/core/model';


@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  pessoa = new Pessoa();

  listaUf = [
        {label: 'Acre', value: 'AC'},
        {label: 'Alagoas', value: 'AL'},
        {label: 'Amapá', value: 'AP'},
        {label: 'Amazonas', value: 'AM'},
        {label: 'Bahia', value: 'BA'},
        {label: 'Ceará', value: 'CE'},
        {label: 'Distrito Federal', value: 'DF'},
        {label: 'Espírito Santo', value: 'ES'},
        {label: 'Goiás', value: 'GO'},
        {label: 'Maranhão', value: 'MA'},
        {label: 'Mato Grosso', value: 'MT'},
        {label: 'Mato Grosso do Sul', value: 'MS'},
        {label: 'Minas Gerais', value: 'MG'},
        {label: 'Pará', value: 'PA'},
        {label: 'Paraíba', value: 'PB'},
        {label: 'Paraná', value: 'PR'},
        {label: 'Pernambuco', value: 'PE'},
        {label: 'Piauí', value: 'PI'},
        {label: 'Rio de Janeiro', value: 'RJ'},
        {label: 'Rio Grande do Norte', value: 'RN'},
        {label: 'Rio Grande do Sul', value: 'RS'},
        {label: 'Rondônia', value: 'RO'},
        {label: 'Roraima', value: 'RR'},
        {label: 'Santa Catarina', value: 'SC'},
        {label: 'São Paulo', value: 'SP'},
        {label: 'Sergipe', value: 'SE'},
        {label: 'Tocantins', value: 'TO'}

    ];

  constructor(private pessoaservice: PessoaService,
              private toastyService: ToastyService,
              private errorHandler: ErrorHandlerService,
              private rota: ActivatedRoute,
              private router: Router,
              private titulo: Title) { }

  ngOnInit() {

    this.titulo.setTitle('Nova pessoa');

    //faz o get na url
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
    .then(() =>{
      this.toastyService.success('Pessoa adicionada com sucesso.');
      //form.reset(); CASO QUEIRA LIMPAR O FORM

      this.pessoa = new Pessoa();
      this.router.navigate(['/pessoas']);
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  atualizar(form: NgForm) {
    this.pessoaservice.atualizar(this.pessoa)
    .then((pessoa) => {
      this.pessoa = pessoa;
      this.toastyService.success('Pessoa alterada com sucesso.');

      this.router.navigate(['/pessoas']);
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  carregarPessoa(codigo: number){
    this.pessoaservice.buscaPorCodigo(codigo)
    .then(pessoa => {
      this.pessoa = pessoa;
      this.atualizarTituloPessoa();
    });
  }

}
