import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-message',
  template: `
  <div *ngIf="temErro()" class="ui-message ui-message-error">
    {{ text }}
  </div>
  `,
  styles: [`
    .ui-messages-error{
      margin: 0;
      margin-top: 1xp;

    }
  `]
})
export class MessageComponent {

  // Parâmetros do componente mensagem passados no HTML
  @Input() error: string;
  @Input() control: FormControl;
  @Input() text: string;


  temErro(): boolean{
    return this.control.hasError(this.error) && this.control.touched;
  }

}
