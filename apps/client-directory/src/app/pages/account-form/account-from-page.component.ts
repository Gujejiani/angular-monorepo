import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, of } from 'rxjs';
import { AccountFormComponent } from '../../containers/account-form/account-form.component';
import { UserModel, mockUser } from '@angular-monorepo/shared';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-detail-page',
  standalone: true,
  imports: [CommonModule, AccountFormComponent],
  template: '<app-account-form [clientId]="id" [users]="this.users$ | async"  ></app-account-form>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountPageComponent implements OnInit{

  constructor(private activatedRoute: ActivatedRoute, private userService: UserService ) {}
  user$: Observable<UserModel> = of(mockUser)  // get user from resolver
  users$ = this.userService.getUsers()

  // get from params
  @Input() id =''
  ngOnInit(): void {
    // get user from resolver
  this.user$ =   this.activatedRoute.data.pipe(map(data=> {
   
    return data['user']}  )  )
  }
}
