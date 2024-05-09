import { UserService } from './../../services/user.service';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserCardComponent } from '@angular-monorepo/shared-ui';

@Component({
  selector: 'app-clients-container',
  standalone: true,
  imports: [CommonModule, UserCardComponent],
  templateUrl: './clients-container.component.html',
  styleUrl: './clients-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientsContainerComponent {
  constructor(private UserService: UserService){

  }
  users$ = this.UserService.getUsers();

  deleteUser(id: number){
    this.UserService.deleteUser(id)
  }
}
