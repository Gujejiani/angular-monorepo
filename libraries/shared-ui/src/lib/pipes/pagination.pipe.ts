import { Pipe, PipeTransform } from '@angular/core';
import { UserModel } from '../models/user-models';

@Pipe({
  name: 'pagination',
  standalone: true,
})
/**
 * Pagination pipe
 * @param withoutPagination needs to be true if user uses filters with gender or search
 */
export class PaginationPipe implements PipeTransform {
  transform(users: UserModel[], pageIndex: number, pageSize: number, withoutPagination: boolean): UserModel[] {
    if (withoutPagination) {
      return users;
    }
    const startIndex = pageIndex * pageSize;
    const endIndex = startIndex + pageSize;
    return users.slice(startIndex, endIndex);
  }
}
