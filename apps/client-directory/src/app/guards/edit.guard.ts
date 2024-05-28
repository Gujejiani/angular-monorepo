import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { UserService } from "../services/user.service";
import { map, take } from "rxjs";

export const editFormGuard: CanActivateFn = (route, _state) => {
  const router = inject(Router);
  const userService = inject(UserService);
  const id = route.queryParamMap.get('editingId');


  if(id){
    return userService.getUSerById(id).pipe(take(1), map(user=>{
        if(!user){
            console.log('edit pages guard navigates')
            router.navigate(["/add-client/0"]);
            return false;
        }
        return true;
    }));
  }else {
    console.log('edit page guard navigates without id')
    router.navigate(["/add-client/0"]);
    return false;
  }



};
