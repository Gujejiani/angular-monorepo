import { Observable } from 'rxjs';
import { Component, Input, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ClientFormContainerComponent } from "../../containers/client-form/client-form-container.component";
import { RouterModule } from "@angular/router";
import { UserService } from "../../services/user.service";
import { UserModel } from "@angular-monorepo/shared";

@Component({
  selector: "app-form-page",
  standalone: true,
  imports: [CommonModule, ClientFormContainerComponent, RouterModule],
  template:
    '<app-client-form [id]="id" [editingUser]="editingUser$ | async" [editingId]="editingId" [userForm]="userForm" ></app-client-form>',
})
export class EditPageComponent implements OnInit {
  constructor(private userService: UserService) {}
  userForm = this.userService.getUserForm();
  editingUser$: Observable<UserModel | undefined> | null = null;


  ngOnInit(): void {
   this.editingUser$ = this.userService.getUSerById(this.editingId);
  }
  @Input() id = "";
  @Input() editingId = "";
}
