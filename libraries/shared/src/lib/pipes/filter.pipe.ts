import { Pipe, PipeTransform } from '@angular/core';
import { GenderEnum, UserModel } from '../models';

@Pipe({
  name: 'filterWithGenderAndId',
  standalone: true,
})
export class FilterPipe implements PipeTransform {
  transform(users: UserModel[], gender: GenderEnum, filterTextForId: string): UserModel[] {
    let filteredUsers = users

    if(gender === GenderEnum.FEMALE || gender === GenderEnum.MALE){
            filteredUsers = users.filter(user=> user.gender === gender)
    }
  
    if(filterTextForId){
        
      filteredUsers=  filteredUsers.filter((user: UserModel) => String(user.personalId).startsWith(String(filterTextForId)));
    

    }
   
    return  filteredUsers;
  }
}
