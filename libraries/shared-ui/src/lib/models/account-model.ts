import { AccountStatusEnum } from "./account-status-enum";
import { AccountTypeEnum } from "./acountType-enum";
import { CurrencyEnum } from "./currency-enum";

export interface AccountModel {
    accountId?: string;
    accountNumber: number; 
    clientId: number; 
    accountType: AccountTypeEnum 
    currency: CurrencyEnum; 
    status: AccountStatusEnum
  }