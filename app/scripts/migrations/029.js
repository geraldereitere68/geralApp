import { TransactionStatus } from '@geralapp/transaction-controller';
import failTxsThat from './fail-tx';

const version = 29;
const unacceptableDelay = 12 * 60 * 60 * 1000;

export default {
  version,
  
  migrate: failTxsThat(
    version,
    'Stuck in approved state for too long.',
    (txMeta) => txMeta.status === TransactionStatus.approved && Date.now() - txMeta.submittedTime > unacceptableDelay
  ),
};
