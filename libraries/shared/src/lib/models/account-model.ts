import {
  AccountStatusEnum,
  AccountTypeEnum,
  CurrencyEnum,
} from "./user-models";

export interface AccountModel {
  accountId?: string;
  accountNumber: number;
  clientId: number;
  accountType: AccountTypeEnum;
  currency: CurrencyEnum;
  status: AccountStatusEnum;
}
