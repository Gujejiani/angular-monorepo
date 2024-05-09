import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserModel } from '../models';

@Component({
  selector: 'lib-user-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
})
export class UserCardComponent {
  @Input() user: UserModel =  {
    id: 542323,
    firstName: "asd",
    lastName: "wsda",
    legalAddress: {
      country: 'Georgia',
      city: 'Tbilisi',
      address: 'Georgia'
    },
    factualAddress: {
      country: 'Georgia',
      city: 'Tbilisi',
      address: 'Georgia'
    },
    photo: './',
    gender: 'male',
    personalId: '23232323223',
    phoneNumber: 598829272
  }
  @Output() deleteUser: EventEmitter<number> = new EventEmitter<number>();


  onDeleteUser(){
    this.deleteUser.emit(this.user.id)
  }
}
