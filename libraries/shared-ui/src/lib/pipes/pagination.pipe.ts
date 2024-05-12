import { Pipe, PipeTransform } from '@angular/core';
import { UserModel } from '../models/user-models';

@Pipe({
  name: 'pagination',
  standalone: true,
})
export class PaginationPipe implements PipeTransform {
  transform(users: UserModel[], pageIndex: number, pageSize: number): UserModel[] {
    const startIndex = pageIndex * pageSize;
    const endIndex = startIndex + pageSize;
    return users.slice(startIndex, endIndex);
  }
}
