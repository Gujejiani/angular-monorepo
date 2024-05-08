import { UIClientFormComponent } from '@angular-monorepo/shared-ui';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ClientFormSections } from 'libraries/shared-ui/src/lib/models';

@Component({
  selector: 'app-client-form',
  standalone: true,
  imports: [CommonModule, RouterModule, UIClientFormComponent],
  templateUrl: './client-form-container.component.html',
  styleUrl: './client-form-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientFormComponent {
 selectedSection = ClientFormSections.PERSONAL
  SECTIONS = ClientFormSections

  selectionChanged(selection: number) {
      if(selection<3){
          this.selectedSection = selection
      }
  }
}
