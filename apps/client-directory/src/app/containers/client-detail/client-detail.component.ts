import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { mockUser } from '@angular-monorepo/shared-ui';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-client-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './client-detail.component.html',
  styleUrl: './client-detail.component.scss',
})
export class ClientDetailComponent{
    constructor(private userService: UserService){}
  @Input() user: any =  mockUser;
  onEditUser(){
    this.userService.editUser(this.user.id)
  }

  onDeleteUser(){
    this.userService.deleteUser(this.user.id)
  }
}
