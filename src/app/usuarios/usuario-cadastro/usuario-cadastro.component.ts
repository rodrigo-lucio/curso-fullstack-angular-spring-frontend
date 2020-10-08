import { Permissao } from './../../core/model';
import { PermissaoService } from './../../seguranca/permissao.service';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { MessageService } from 'primeng/api';
import { UsuarioService } from './../usuario.service';
import { NgForm, FormGroup, FormBuilder, FormArray, Validators, Form, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usuario-cadastro',
  templateUrl: './usuario-cadastro.component.html',
  styleUrls: ['./usuario-cadastro.component.css']
})
export class UsuarioCadastroComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    public rota: ActivatedRoute,
    private router: Router,
    private titulo: Title,
    private permissaoService: PermissaoService) {
    this.configurarFormulario();
  }

  get editando() {
    return Boolean(this.rota.snapshot.params['codigo']);
  }

  formulario: FormGroup;
  permissoesUsuario: FormArray;

  permissoes = new Array<Permissao>();

  tipoAnterior = 0;
  alterarSenha = false;

  display = false;

  ngOnInit(): void {


    this.titulo.setTitle('Cadastro de Usuário');

    const codigoUsuario = this.rota.snapshot.params['codigo'];

    if (codigoUsuario) {
      this.carregarUsuario(codigoUsuario);
    }

    this.buscarPermissoes();

  }

  configurarFormulario() {

    this.formulario = this.formBuilder.group({
      codigo: [],
      nome: [, [Validators.required, Validators.minLength(10)]],
      email: [, [Validators.required, Validators.email]],
      //senha: [, [Validators.required, Validators.minLength(8)]], - Criado form de alterar senha
      ativo: true,
      permissoes: this.formBuilder.array([], [Validators.required]),
    });

  }

  addTodasPermissoesForm(permissoes) {
    const formPermissoes = this.formulario.controls.permissoes as FormArray;

    permissoes.forEach(permissao => {
      formPermissoes.push(this.formBuilder.group(
        permissao
      ));
    });

  }

  addPermissaoCheck(permissao, event) {

    const formPermissoes = this.formulario.controls.permissoes as FormArray;
    if (event.target.checked) {

      formPermissoes.push(this.formBuilder.group(
        permissao
      ));

    } else {

      let cont = 0;
      formPermissoes.controls.forEach(element => {
        if (element.value.codigo == permissao.codigo) {
          formPermissoes.removeAt(cont);
          return;
        }
        cont++;
      });
    }

  }

  salvar() {


    if (this.editando) {
      this.atualizarUsuario();
    } else {
      this.adicionarUsuario();
    }

  }

  carregarUsuario(codigo: number) {
    this.usuarioService.buscaPorCodigo(codigo)
      .then((usuario) => {
        this.formulario.patchValue(usuario);
        this.titulo.setTitle('Edição de usuário: ' + this.formulario.get('nome').value);
        this.addTodasPermissoesForm(usuario.permissoes);
      })
      .catch((erro) => {
        this.errorHandler.handle(erro);
        this.router.navigate(['/usuarios']);
      });
  }

  private buscarPermissoes() {
    this.permissaoService.buscarTodas().then((permissoes) => {
      this.permissoes = permissoes;
    }).catch((erro) => {
      this.errorHandler.handle(erro);
      this.router.navigate(['/usuarios']);
    });
  }

  adicionarUsuario() {

    this.usuarioService.adicionar(this.formulario.value)
      .then(() => {
        this.messageService.add({ severity: 'success', detail: 'Usuário adicionado com sucesso.' });
        this.router.navigate(['/usuarios']);
      })
      .catch((erro) => this.errorHandler.handle(erro));
  }

  atualizarUsuario() {
    this.usuarioService.atualizar(this.formulario.value)
      .then(() => {
        this.messageService.add({ severity: 'success', detail: 'Usuário alterado com sucesso.' });
        this.router.navigate(['/usuarios']);
      })
      .catch((erro) => {
        this.errorHandler.handle(erro);
      });
  }


  existePermissao(permissao) {

    let achou: boolean = false;

    this.formulario.value.permissoes.forEach(element => {
      if (element.codigo == permissao.codigo) {
        achou = true;
      }
    });

    return achou;

  }

  nomeGrupoPermissao(tipoPermissao) {

    if (this.tipoAnterior != tipoPermissao) {
      this.tipoAnterior = tipoPermissao;
      return true;
    }

  }


}
