import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientDetailComponent } from '../../containers/client-detail/client-detail.component';

@Component({
  selector: 'app-detail-page',
  standalone: true,
  imports: [CommonModule, ClientDetailComponent],
  template: '<app-client-detail></app-client-detail>',
})
export class DetailPageComponent {}
