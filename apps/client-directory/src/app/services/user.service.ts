import { AppModalService } from "./app-modal.service";
import { Store } from "@ngrx/store";
import {
  UserModel,
  asyncValidator,
  englishPattern,
  genderValidator,
  georgianPattern,
  patternValidator,
  startsWithValidator,
} from "@angular-monorepo/shared";
import { Injectable } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import * as Actions from "../store/users/users.actions";
import * as Selectors from "../store/users/users.selectors";
import { APIService } from "../api/api.service";
import { GET_USERS, SAVE_PHOTO } from "../api/endpoints";
import { Router } from "@angular/router";
import { take } from "rxjs";
@Injectable({ providedIn: "root" })
export class UserService {
  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    private apiService: APIService,
    private router: Router,
    private appModalService: AppModalService
  ) {}

  fetchUsers() {
    this.store.dispatch(Actions.GET_USERS_ACTION());
  }

  fetchUserById(id: string): any {
    return this.apiService.apiCall(GET_USERS, { id });
  }

  getUsers() {
    return this.store.select(Selectors.selectUsers);
  }

  getUSerById(id: string) {
    return this.store.select(Selectors.selectUserById(id));
  }

  createUser(user: UserModel) {
    this.store.dispatch(Actions.CREATE_USER_ACTION(user));
  }
  updateUser(user: UserModel, message?: string) {
    this.store.dispatch(Actions.UPDATE_USER_ACTION({ user, message }));
  }

  deleteUser(id: string) {
    this.appModalService
      .showModal({
        title: "Delete user",
        message: "Are you sure you want to delete this user?",
        success: false,
        returnOutput: true,
        confirmButtonText: "Confirm",
      })
      ?.subscribe((confirm) => {
        if (confirm) {
          this.store.dispatch(Actions.DELETE_USER(id));
          this.appModalService.closeModal();
          this.navigateToCliensPage();
        } else {
          this.appModalService.closeModal();
        }
      });
  }

  editUser(id: string) {
    this.router.navigate([`/edit-account/0`], {
      queryParams: {
        editingId: id,
      },
    });
  }
  navigateToCliensPage() {
    this.router.navigate(["/"]);
  }

  createAccount(id: string) {
    this.router.navigate([`/create-account/${id}`]);
  }

  getUserForm() {
    return this.formBuilder.group({
      id: ["111", Validators.required],
      firstName: [
        "",
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
          patternValidator(georgianPattern, englishPattern),
        ],
      ],
      lastName: [
        "",
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
          patternValidator(georgianPattern, englishPattern),
        ],
      ],

      legalAddress: this.formBuilder.group({
        country: ["", [Validators.required]],
        city: ["", [Validators.required]],
        address: ["", [Validators.required]],
      }),
      factualAddress: this.formBuilder.group({
        country: ["", [Validators.required]],
        city: ["", [Validators.required]],
        address: ["", [Validators.required]],
      }),
      photo: [""],
      gender: ["male", [Validators.required, genderValidator()]],
      personalId: [
        "",
        [
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(11),
          Validators.pattern("^[0-9]*$"),
        ],
        [asyncValidator(this.apiService.apiCall(GET_USERS))],
      ],
      phoneNumber: [
        "",
        [
          Validators.required,
          Validators.minLength(9),
          Validators.maxLength(9),
          Validators.pattern("^[0-9]*$"),
          startsWithValidator("5"),
        ],
      ],
    });
  }

  saveImage(form: FormData) {
    this.apiService
      .apiCall(SAVE_PHOTO, form)
      .pipe(take(1))
      .subscribe((res) => {
        console.log(res);
      });
  }

  closeModal() {
    this.appModalService.closeModal();
  }
}
