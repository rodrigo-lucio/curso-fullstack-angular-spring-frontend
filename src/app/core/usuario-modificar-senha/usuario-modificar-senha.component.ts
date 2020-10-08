import { NgForm } from '@angular/forms';
import { ErrorHandlerService } from './../error-handler.service';
import { MessageService } from 'primeng/api';
import { UsuarioService } from './../../usuarios/usuario.service';
import { Usuario } from './../model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-usuario-modificar-senha',
  templateUrl: './usuario-modificar-senha.component.html',
  styleUrls: []
})
export class UsuarioModificarSenhaComponent implements OnInit {

  @Input() display: boolean;
  @Input() codUsuario: number;
  @Output() displayChange = new EventEmitter();

  usuario: Usuario = new Usuario();

  senhaAtual: string;
  novaSenha: string;
  novaSenhaConfirma: string;

  constructor(private usuarioService: UsuarioService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService) {

  }

  onClose() {
    this.displayChange.emit(false);
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.displayChange.unsubscribe();
  }

  confirmar(frm: NgForm) {

    this.usuario.codigo = this.codUsuario;
    this.usuario.senha = this.novaSenha;

    this.usuarioService.alterarSenha(this.codUsuario, this.senhaAtual, this.novaSenha, this.novaSenhaConfirma)
      .then(() => {
        this.messageService.add({ severity: 'success', detail: 'Senha alterado com sucesso.' });

        frm.reset();
        this.display = false;
      })
      .catch((erro) => {
        this.errorHandler.handle(erro.error.mensagem);
      });


  }

}
