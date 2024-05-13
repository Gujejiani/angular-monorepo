import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { slideFadeAnimation } from 'libraries/shared/src/lib/animation/animations';
import { AccountStatusEnum, AccountTypeEnum, CurrencyEnum, UserModel } from '@angular-monorepo/shared';
import { UserService } from '../../services/user.service';
import { v4 as uuidv4 } from 'uuid';


@Component({
  selector: 'app-account-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './account-form.component.html',
  styleUrl: './account-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    slideFadeAnimation
  ]
})
export class AccountFormComponent implements OnInit, OnDestroy{
  constructor(private formBuilder: FormBuilder, private userService: UserService){
  
   
  }
  
  CURRENCY = CurrencyEnum
  ACCOUNT_TYPE = AccountTypeEnum
  ACCOUNT_STATUS = AccountStatusEnum;
  formGroup :any

  @Input() users: UserModel[] | null =[]
  @Input() clientId =''
  onSubmit(){
    const user = structuredClone(this.users?.find(user=> String(this.formGroup.value.clientId) === String(user.id)))

    if(user){
        if(!user?.accounts){
          user.accounts = [this.formGroup.value]
        }else {
          user.accounts.push(this.formGroup.value)
        }
        this.userService.updateUser(user, 'Account Added Successfully')
        
    }
 
  }
ngOnInit(){
  this.setForm()
}



  setForm(){
    const accountId = uuidv4();
   this.formGroup=  this.formBuilder.group({
      currency: [
        CurrencyEnum.GEL, Validators.required, ],
      accountType: [
        AccountTypeEnum.CURRENT, Validators.required, ],
      status: [AccountStatusEnum.ACTIVE, Validators.required],
      clientId: [this.clientId ? this.clientId: null, Validators.required],
      accountId: [accountId, Validators.required] 

    })
  }

  ngOnDestroy(){
    this.userService.closeModal()
  }
}
