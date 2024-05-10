import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'lib-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent {
  @Input() modalInfo : {
    title: string,
    message: string,
    success: boolean
  } = {
    title: 'Title',
    message: 'Message',
    success: false
  }
  @Output() closeModal = new EventEmitter()

  close(){
    this.closeModal.emit()
  }
}
