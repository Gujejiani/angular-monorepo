import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { statusEnum, UserModel, mockUser } from '@angular-monorepo/shared-ui';
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
  @Input() user: UserModel | null =  mockUser;
  ACCOUNT_STATUS = statusEnum
  onEditUser(){
    if(this.user){
      this.userService.editUser(this.user.id as number)
    }
   
  }

  onDeleteUser(){
    if(this.user){
      this.userService.deleteUser(this.user.id as number)

    }
  }

  onCreateAccount(){
    this.userService.createAccount(this.user?.id as number)
  }
}
