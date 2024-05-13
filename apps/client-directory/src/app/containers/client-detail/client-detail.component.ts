import { AppModalService } from './../../services/app-modal.service';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountStatusEnum, UserModel, mockUser } from '@angular-monorepo/shared';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './client-detail.component.html',
  styleUrl: './client-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientDetailComponent{
    constructor(private userService: UserService,private appModalService: AppModalService, private router: Router){}
  @Input() user: UserModel | null =  mockUser;
  ACCOUNT_STATUS = AccountStatusEnum
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
  changeAccountStatus(status: AccountStatusEnum, accountId?: string){
    
    const changeTo = status ===AccountStatusEnum.ACTIVE ?  'Deactivate': 'Activate'
    this.appModalService.showModal({
      title: changeTo,
      message: 'Are you sure you want to change the account status?',
      success: false,
      confirmButtonText:  changeTo,
      returnOutput: true
    })?.subscribe(res=>{
      if(res){
        const usersCopy = structuredClone(this.user)
        const account = usersCopy?.accounts?.find(acc=>acc.accountId === accountId)
        if(account){
          account.status = account?.status === AccountStatusEnum.ACTIVE ? AccountStatusEnum.INACTIVE : AccountStatusEnum.ACTIVE

        }
        this.userService.updateUser(usersCopy as UserModel, 'Account Status Changed Successfully')
       
          if(this.user?.id){

            this.router.navigate([`/detail/${this.user.id}`,], {
              queryParams: {
                invalidate: Math.random().toFixed(5)
              }
            })

          }

       
      }
    })
  }
}
