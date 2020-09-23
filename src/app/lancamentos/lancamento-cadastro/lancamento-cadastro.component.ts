import { NgForm, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit, LOCALE_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { MessageService } from 'primeng/api';

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
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' }
  ];

  categorias = [];
  pessoas = [];
  //lancamento = new Lancamento();
  urlUploadAnexo;
  formulario: FormGroup;
  uploadEmAndamento = false;

  constructor(private categoriaService: CategoriaService,
    private pessoaService: PessoaService,
    private lancamentoService: LancamentoService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private rota: ActivatedRoute,
    private router: Router,
    private titulo: Title,
    private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.configurarFormulario();

    this.titulo.setTitle('Novo lançamento');

    // Faz o get pela URL
    const codigoLancamento = this.rota.snapshot.params['codigo'];

    if (codigoLancamento) {
      this.carregarLancamento(codigoLancamento);
    }

    this.carregarCategorias();
    this.carregarPessoas();

  }

  atualizarTituloLancamento() {
    this.titulo.setTitle('Edição de lançamento: ' + this.formulario.get('descricao').value);
  }

  // Formulario reativo, para não precisar fazer as validaçoes no HTML
  configurarFormulario() {

    this.formulario = this.formBuilder.group({
      codigo: [],
      tipo: ['RECEITA', Validators.required], // [valor_inicial, Tipo_validação]
      dataVencimento: [null, Validators.required],
      dataPagamento: [],
      descricao: [null, [this.validarObrigatoriedade, this.validarTamanhoMinimo(5)]],
      valor: [null, Validators.required],
      pessoa: this.formBuilder.group({
        codigo: [null, Validators.required],
        nome: []
      }),
      categoria: this.formBuilder.group({
        codigo: [null, Validators.required],
        nome: []
      }),
      observacao: [],
      anexo: [],
      urlAnexo: []
    });

  }

  validarObrigatoriedade(input: FormControl) {

    if (input.value) {
      return null;
    } else {
      return { obrigatoriedade: true }; // utiliza esse nome no html
    }

  }

  validarTamanhoMinimo(valor: number) {
    return (input: FormControl) => {

      if (!input.value || input.value.length >= valor) {
        return null;
      } else {
        return { tamanhoMinimo: { tamanho: valor } };
      }

    };
  }

  get editando() {
    return Boolean(this.formulario.get('codigo').value);
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

  salvar() {
    if (this.editando) {
      this.atualizarLancamento();
    } else {
      this.adicionarLancamento();
    }
  }

  adicionarLancamento() {
    this.lancamentoService.adicionar(this.formulario.value)
      .then(() => {
        this.messageService.add({ severity: 'success', detail: 'Lançamento adicionado com sucesso.' });
        this.router.navigate(['/lancamentos']);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarLancamento() {
    this.lancamentoService.atualizar(this.formulario.value)
      .then((lancamento) => {

        this.formulario.patchValue(lancamento);
        this.messageService.add({ severity: 'success', detail: 'Lançamento alterado com sucesso.' });

        this.router.navigate(['/lancamentos']);

      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarLancamento(codigo: number) {
    this.lancamentoService.buscarPorCodigo(codigo)
      .then(lancamento => {
        this.formulario.patchValue(lancamento);
        this.atualizarTituloLancamento();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  getUrlUploadAnexo() {
    return this.lancamentoService.urlUploadAnexo();
  }

  uploadAnexoEmAndamento() {
    this.uploadEmAndamento = true;
  }

  aoTerminarUploadAnexo(event) {
    const anexo = event.originalEvent.body;

    this.formulario.patchValue({
      anexo: anexo.nome,
      urlAnexo: (anexo.url as string).replace('\\', 'https://')
    });

    this.uploadEmAndamento = false;
  }

  erroUpload(event) {
    this.messageService.add({ severity: 'error', detail: 'Lançamento adicionado com sucesso.' });

    this.uploadEmAndamento = false;
  }

  getNomeAnexo() {
    const nome = this.formulario.get('anexo').value;
    if (nome) {
      return nome.substring(nome.indexOf(' ') + 1, nome.length);
    }
    return '';
  }

  removerAnexo() {
    this.formulario.patchValue({
      anexo: null,
      urlAnexo: null
    });
  }
}

