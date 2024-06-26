import { UserService } from "./../../services/user.service";
import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  ClientsTableComponent,
  FilterPipe,
  GenderEnum,
  InfoComponent,
  PaginationPipe,
} from "@angular-monorepo/shared";
import { Router } from "@angular/router";
import { PageEvent } from "@angular/material/paginator";
import { FormsModule } from "@angular/forms";
import { PHOTO_URL } from "../../api/endpoints";

@Component({
  selector: "app-clients-container",
  standalone: true,
  imports: [
    CommonModule,
    ClientsTableComponent,
    InfoComponent,
    PaginationPipe,
    FormsModule,
    FilterPipe,
  ],
  templateUrl: "./clients-container.component.html",
  styleUrl: "./clients-container.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientsContainerComponent implements OnInit {
  constructor(private UserService: UserService, private router: Router) {}
  GENDER = GenderEnum;

  filtersData = {
    selectedGender: GenderEnum.BOTH,
    searchText: "",
  };
  users$ = this.UserService.getUsers();

  paginationData: PageEvent = {
    pageIndex: 0,
    pageSize: 8,
    length: 100,
  };
  PHOTO_URL = PHOTO_URL;

  get getImageUrl() {
    return `${PHOTO_URL.url}${PHOTO_URL.api}`;
  }
  get getNotFoundText() {
    return `Can't find user with ID ${this.filtersData.searchText}`;
  }

  resetFilters() {
    this.filtersData = {
      searchText: "",
      selectedGender: GenderEnum.BOTH,
    };
    localStorage.removeItem("FiltersData");
  }
  ngOnInit(): void {
    this.loadPaginationData();
    this.loadFiltersData();
  }
  deleteUser(id: string) {
    this.UserService.deleteUser(id);
  }
  pageChanged(data: PageEvent) {
    localStorage.setItem("paginationData", JSON.stringify(data));
    this.paginationData = data;
  }
  editUser(id: string) {
    this.UserService.editUser(id);
  }
  openDetailPage(id: string) {
    this.router.navigate([`/detail/${id}`]);
  }

  openCreatePage() {
    this.router.navigate(["/add-client/0"]);
  }
  loadPaginationData() {
    const data = localStorage.getItem("paginationData");
    if (data) {
      this.paginationData = JSON.parse(data) as PageEvent;
    }
  }
  saveFilters() {
    localStorage.setItem("FiltersData", JSON.stringify(this.filtersData));
  }

  loadFiltersData() {
    const data = JSON.parse(localStorage.getItem("FiltersData") as any);
    if (data) {
      this.filtersData = data;
    }
  }

  createAccount(id: string) {
    this.UserService.createAccount(id);
  }
}
