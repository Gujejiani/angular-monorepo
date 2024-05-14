import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ClientFormContainerComponent } from "../../containers/client-form/client-form-container.component";
import { RouterModule } from "@angular/router";
import { UserService } from "../../services/user.service";

@Component({
  selector: "app-form-page",
  standalone: true,
  imports: [CommonModule, ClientFormContainerComponent, RouterModule],
  template:
    '<app-client-form [id]="id" [editingId]="editingId" [userForm]="userForm" ></app-client-form>',
})
export class FormPageComponent {
  constructor(private userService: UserService) {}
  userForm = this.userService.getUserForm();
  @Input() id = "";
  @Input() editingId = "";
}
