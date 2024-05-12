import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './info.component.html',
  styleUrl: './info.component.scss',
})
export class InfoComponent {
  @Input() message =''
  @Input() buttonText =''
  @Output() actionClick = new EventEmitter()
  onActionClick(){
    this.actionClick.emit()
  }
}
