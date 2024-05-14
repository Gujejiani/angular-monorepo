import { AppModalService } from "./services/app-modal.service";
import { UserService } from "./services/user.service";
import { ChangeDetectionStrategy, Component, OnDestroy } from "@angular/core";
import { RouterModule } from "@angular/router";
import { HeaderComponent } from "./containers/header/header.component";

@Component({
  standalone: true,
  imports: [ RouterModule, HeaderComponent],
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnDestroy {
  title = "client-directory";

  constructor(
    private UserService: UserService,
    private AppModalService: AppModalService
  ) {
    this.UserService.fetchUsers();
    this.AppModalService.listenStoreToShowModal();
  }

  ngOnDestroy(): void {
    this.AppModalService.destroySubscription();
  }
}
