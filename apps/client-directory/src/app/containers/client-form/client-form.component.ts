import { UIClientFormComponent } from '@angular-monorepo/shared-ui';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-client-form',
  standalone: true,
  imports: [CommonModule, RouterModule, UIClientFormComponent],
  templateUrl: './client-form.component.html',
  styleUrl: './client-form.component.scss',
})
export class ClientFormComponent {}
