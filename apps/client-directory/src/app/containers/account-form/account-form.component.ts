import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { slideFadeAnimation } from 'libraries/shared-ui/src/lib/animation/animations';
import { statusEnum, AccountTypeEnum, CurrencyEnum, UserModel } from '@angular-monorepo/shared-ui';
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
export class AccountFormComponent implements OnInit {
  constructor(private formBuilder: FormBuilder, private userService: UserService){
  
   
  }
  
  CURRENCY = CurrencyEnum
  ACCOUNT_TYPE = AccountTypeEnum
  ACCOUNT_STATUS = statusEnum;
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
      status: [statusEnum.ACTIVE, Validators.required],
      clientId: [this.clientId, Validators.required],
      accountId: [accountId, Validators.required] 

    })
  }
}
