import { UserModel, mockUser } from "@angular-monorepo/shared-ui";
import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { UserService } from "../services/user.service";


export const userDetailResolver:ResolveFn<UserModel> =(
    route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot) => {
        const id = route.paramMap.get('id')
        if(id){
            return inject(UserService).fetchUserById(id);
        }else {
            return mockUser
        }
     

    }

