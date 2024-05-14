import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ClientDetailComponent } from "../../containers/client-detail/client-detail.component";
import { ActivatedRoute } from "@angular/router";
import { map } from "rxjs";

@Component({
  selector: "app-detail-page",
  standalone: true,
  imports: [CommonModule, ClientDetailComponent],
  template: '<app-client-detail [user]="user$ | async"  ></app-client-detail>',
})
export class DetailPageComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute) {}
  user$: any; // get user from resolver
  ngOnInit(): void {
    this.user$ = this.activatedRoute.data.pipe(
      map((data) => {
        return data["user"];
      })
    );
  }
}
