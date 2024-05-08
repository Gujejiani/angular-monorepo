export interface AccountModel {
    accountNumber: number; 
    clientNumber: number; 
    accountType: 'current' | 'savings' | 'deposit'; 
    currency: 'GEL' | 'USD' | 'EUR'; 
    status: 'active' | 'closed'; 
  }