import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-client-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './client-detail.component.html',
  styleUrl: './client-detail.component.scss',
})
export class ClientDetailComponent{
 
  @Input() user: any =  {
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
    photo: 'assets/default.jpeg',
    gender: 'male',
    personalId: '23232323223',
    phoneNumber: 598829272,
    accounts: [
        {
          accountNumber: 323232232232,
          clientNumber: 232323023294294, 
          accountType: 'current',
          currency: 'GEL',
          status: 'active',
        },
        {
          accountNumber: 32233232232,
          clientNumber: 23242323024294, 
          accountType: 'deposit',
          currency: 'GEL',
          status: 'closed',
        },
        {
          accountNumber: 323232322232,
          clientNumber: 232322023294294, 
          accountType: 'savings',
          currency: 'GEL',
          status: 'active',
        },
    ]
  }
}
