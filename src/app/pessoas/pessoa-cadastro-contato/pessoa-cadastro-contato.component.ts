import { NgForm } from '@angular/forms';
import { Contato } from './../../core/model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pessoa-cadastro-contato',
  templateUrl: './pessoa-cadastro-contato.component.html',
  styleUrls: ['./pessoa-cadastro-contato.component.css']
})
export class PessoaCadastroContatoComponent implements OnInit {

  @Input() contatos: Array<Contato>;
  contato: Contato;
  exibindoFormularioCadastro = false;
  contatoIndex: number;


  constructor() { }

  ngOnInit() {
  }

  prepararNovoContato() {
    this.exibindoFormularioCadastro = true;
    this.contato = new Contato();
    this.contatoIndex = this.contatos.length;
  }

  confirmarContato(frm: NgForm) {
    this.contatos[this.contatoIndex] = this.clonarContato(this.contato);
    this.exibindoFormularioCadastro = false;
    frm.reset();
  }

  removerContato(index: number) {
    this.contatos.splice(index, 1);
  }

  clonarContato(contato: Contato) {
    return new Contato(contato.codigo, contato.nome, contato.email, contato.telefone);
  }

  prepararEdicaoContato(contato: Contato, index: number) {
    this.contato = this.clonarContato(contato);
    this.contatoIndex = index;
    this.exibindoFormularioCadastro = true;
  }

  editando() {
    return this.contato && this.contato.codigo;
  }
}
