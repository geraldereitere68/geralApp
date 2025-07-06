import { useSelector } from 'react-redux';
import { InternalAccount } from '@geralapp/keyring-internal-api';
import { isEvmAccountType } from '@geralapp/keyring-api';
import {
  getMultichainCurrencyImage,
  getMultichainBalances,
  getMultichainNetwork,
  getMultichainCurrentCurrency,
  getMultichainConversionRate,
} from '../selectors/multichain';
import { formatCurrency } from '../helpers/utils/confirm-tx.util';
import { MULTICHAIN_NATIVE_CURRENCY_TO_CAIP19 } from '../../shared/constants/multichain/assets';
import { getTokenFiatAmount } from '../helpers/utils/token-util';
import { useMultichainSelector } from './useMultichainSelector';
import { useAccountTotalFiatBalance } from './useAccountTotalFiatBalance';

export const EMPTY_VALUES = {
  formattedFiat: '0',
  totalFiatBalance: '0',
  totalWeiBalance: '0',
  tokensWithBalances: [],
  loading: false,
  orderedTokenList: [],
};

export const useMultichainAccountTotalFiatBalance = (
  account: InternalAccount,
  shouldHideZeroBalanceTokens = false
): {
    formattedFiat: string;
    totalFiatBalance: string;
    tokensWithBalances: {
      address: string;
      symbol: string;
      decimals: number;
      isERC721?: boolean;
      image?: string;
    }[];
    totalWeiBalance?: string;
    totalBalance?: string;
    loading: boolean;
    orderedTokenList: { iconUrl:string; symbol:string; fiatBalance:string}[];
} => {
  
 if (isEvmAccountType(account.type)) 
   return useAccountTotalFiatBalance(account, shouldHideZeroBalanceTokens);
  
 const currentCurrency = useMultichainSelector(getMultichainCurrentCurrency, account);
 const { network:{ ticker }} = useMultichainSelector(getMultichainNetwork, account);
 const conversionRate = useMultichainSelector(getMultichainConversionRate, account);
 const nativeCurrencyImage = useMultichainSelector(getMultichainCurrencyImage, account);

 const balances = useSelector(getMultichainBalances);

 const assetKey = MULTICHAIN_NATIVE_CURRENCY_TO_CAIP19[ticker as keyof typeof MULTICHAIN_NATIVE_CURRENCY_TO_CAIP19];
 if (!balances?.[account.id]?.[assetKey]) return EMPTY_VALUES;

 const balanceAmount = balances[account.id][assetKey].amount;

 const totalFiatValue =
   getTokenFiatAmount(
     1,
     Number(conversionRate),
     currentCurrency,
     balanceAmount,
     ticker,
     false,
     false
   ) ?? '0';

 const nativeTokenInfo = {
   iconUrl:nativeCurrencyImage, 
   symbol:ticker, 
   fiatBalance :totalFiatValue
 };

 return {
   formattedFiat : formatCurrency(totalFiatValue,currentCurrency),
   totalFiatBalance : totalFiatValue ,
   totalBalance : balanceAmount ,
   tokensWithBalances : [],
   loading:false ,
   orderedTokenList:[nativeTokenInfo],
 };
};
