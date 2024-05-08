import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusBarComponent } from '../status-bar/status-bar.component';

@Component({
  selector: 'lib-client-form',
  standalone: true,
  imports: [CommonModule, StatusBarComponent],
  templateUrl: './client-form.component.html',
  styleUrl: './client-form.component.scss',
})
export class UIClientFormComponent {
  
}
