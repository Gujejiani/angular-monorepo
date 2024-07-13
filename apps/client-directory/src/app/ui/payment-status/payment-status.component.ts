import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-payment-status',
  standalone: true,
  imports: [],
  templateUrl: './payment-status.component.html',
  styleUrl: './payment-status.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentStatusComponent {
  isVisible = true
  status='success'



  @Output() titleClicked = new EventEmitter<void>();

  @Input() title: string =''

  closeModal(){
    console.log('emitted title clicked');
    this.titleClicked.emit();
  
  }
}
