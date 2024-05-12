import { MatTableModule } from '@angular/material/table';
import { Component, EventEmitter, Input, Output, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { PaginationComponent } from '../pagination/pagination.component';
import { PageEvent } from '@angular/material/paginator';
import { UserModel } from '../../models/user-models';
import { InfoComponent } from '../info/info.component';
import { mockUser } from '../../utils';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}


@Component({
  selector: 'lib-clients-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatIcon, PaginationComponent, InfoComponent],
  templateUrl: './clients-table.component.html',
  styleUrl: './clients-table.component.scss',
})
export class ClientsTableComponent {
  displayedColumns: string[] = ['photo','firstName', 'lastName', 'gender', 'personalId', 'phoneNumber', 'actions' ];
  @Input({
    required: true,
  }) pageIndex = 0;
  @Input({
    required: true
  }) pageSize = 8; 
  @Input({
    required: true
  }) length = 100;
  @Input({
    required: true
  }) users :UserModel[] = [mockUser];
  @Input() notFoundText = "Can't find user";
  @Input() notFoundButtonText ='Reset Filters'
  @Output() deleteUser: EventEmitter<number> = new EventEmitter<number>();

  @Output() editUser: EventEmitter<number> = new EventEmitter<number>();

  @Output() detailClicked = new EventEmitter<number>();

  @Output() pageChanged = new EventEmitter<PageEvent>();

  @Output() resetFilters = new EventEmitter<PageEvent>();

  viewDetails(user: UserModel){
    
    this.detailClicked.emit(user.id)
  }
  onResetFilters(){
    this.resetFilters.emit()
  }

  onEditUser(user: UserModel){
    this.editUser.emit(user.id)
  }
  paginationChanged(data: PageEvent){
   this.pageChanged.emit(data)
    
  }



  onDeleteUser(user: UserModel){
    this.deleteUser.emit(user.id)
   
  }
}
