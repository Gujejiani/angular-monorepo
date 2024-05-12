import { MatTableModule } from '@angular/material/table';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { UserModel } from '../../models';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}


@Component({
  selector: 'lib-clients-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatIcon],
  templateUrl: './clients-table.component.html',
  styleUrl: './clients-table.component.scss',
})
export class ClientsTableComponent {
  displayedColumns: string[] = ['photo','firstName', 'lastName', 'gender', 'personalId', 'phoneNumber', ];
  @Input() users :any = [];
  @Output() deleteUser: EventEmitter<number> = new EventEmitter<number>();

  @Output() editUser: EventEmitter<number> = new EventEmitter<number>();

  @Output() detailClicked = new EventEmitter<number>();
  viewDetails(user: UserModel){
    
    this.detailClicked.emit(user.id)
  }


  onEditUser(user: UserModel){
    this.editUser.emit(user.id)
  }

  onDeleteUser(user: UserModel){
    this.deleteUser.emit(user.id)
   
  }
}
