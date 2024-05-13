import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ModalData } from '../../models';

@Component({
  selector: 'lib-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent {
  @Input() modalInfo : ModalData = {
    title: 'Title',
    message: 'Message',
    success: false
  }
  @Output() closeModal = new EventEmitter<boolean>()
  
  close(close: boolean){
    this.closeModal.emit(close)
  }
}
