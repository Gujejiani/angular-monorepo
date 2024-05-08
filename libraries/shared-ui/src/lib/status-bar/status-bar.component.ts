import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule , } from '@angular/common';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'lib-status-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './status-bar.component.html',
  styleUrl: './status-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  
})
export class StatusBarComponent {
  @Input() secondPage =false
  @Input() lastPage =false
}
