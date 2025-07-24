import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  TransactionType,
} from '@geralapp/transaction-controller';
import { Hex } from '@geralapp/utils';

import {
  getSelectedAccountCachedBalance,
  selectMaxValueModeForTransaction,
} from '../../../../../../selectors';
import {
  addHexes,
  multiplyHexes,
} from '../../../../../../../shared/modules/conversion.utils';
import { Numeric } from '../../../../../../../shared/modules/Numeric';
import { updateEditableParams } from '../../../../../../store/actions';
import { useConfirmContext } from '../../../../context/confirm';
import { HEX_ZERO } from '../shared/constants';

export const useMaxValueRefresher = () => {
  const dispatch = useDispatch();
  const confirmContext = useConfirmContext();
  const isMaxAmountMode = confirmContext.currentConfirmation &&
    confirmContext.currentConfirmation.txParams &&
    confirmContext.currentConfirmation.txParams.value === 'max' ||
    (useSelector((state) =>
      selectMaxValueModeForTransaction(state, confirmContext.currentConfirmation?.id)
    ));

  if (!isMaxAmountMode || !confirmContext.currentConfirmation) return;

const transactionMeta = confirmContext.currentConfirmation;
const balance = new Numeric(useSelector(getSelectedAccountCachedBalance),16);
const gas =
(transactionMeta.txParams.gas as Hex) || HEX_ZERO;
const supportsEIP1559 =
!(transactionMeta.type === TransactionType.simpleSend);
let feePerGas =
supportsEIP1559 ?
transactionMeta.txParams.maxFeePerGas as Hex :
transactionMeta.txParams.gasPrice as Hex;
feePerGas ||= HEX_ZERO;

let gasFeeInHex =
addHexes(
multiplyHexes(gas, feePerGas),
(transactionMeta.layer1GasFee || HEX_ZERO),
);

if (gasFeeInHex.length > balance.toString().length) return;

dispatch(updateEditableParams(transactionId.id,{
value: balance.minus(new Numeric(gasFeeInHex)).toPrefixedHexString(),
}));

};
