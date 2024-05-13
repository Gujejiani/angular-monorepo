import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { shakeAnimation } from '../../animation/animations';

@Component({
  selector: 'lib-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './info.component.html',
  styleUrl: './info.component.scss',
  animations: [shakeAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InfoComponent {
  @Input() message =''
  @Input() buttonText =''
  @Output() actionClick = new EventEmitter()
  onActionClick(){
    this.actionClick.emit()
  }
}
