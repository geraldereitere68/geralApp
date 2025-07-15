 type TokenBalanceProps = {
  token: { address: string; decimals?: number; symbol?: string };
  className?: string;
  showFiat?: boolean;
} & CurrencyDisplayProps;

declare const TokenBalance: React.FC<TokenBalanceProps>;
export default TokenBalance;
