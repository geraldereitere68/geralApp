import React from "react";
import { Hex } from "@geralapp/utils";
import { TransactionMeta } from "@geralapp/transaction-controller";
import { useSelector } from "react-redux";

const ORIGIN_METAMASK = require("../../../../../../shared/constants/app").ORIGIN_METAMASK;
const getMemoizedInternalAccountByAddress = require("../../../../../../selectors").getMemoizedInternalAccountByAddress;
const isHardwareKeyring = require("../../../../helpers/utils/hardware").isHardwareKeyring;
const getSmartAccountOptInForAccounts = require("../../../selectors/preferences").getSmartAccountOptInForAccounts;
const getUseSmartAccount = require("../../../selectors/preferences").getUseSmartAccount;

function SmartAccountUpdateSplash() {
  const confirmationData = useConfirmContext<TransactionMeta>();
  const smartActionHandlers = useSmartAccountActions();
  
  const currentConfirmation =
    confirmationData && confirmationData.currentConfirmation;

  if (!currentConfirmation || !currentConfirmation.txParams) return null;

  const txParams = currentConfirmation.txParams,
        origin   = currentConfirmation.origin,
        sender   = txParams.from.toLowerCase(),
        state    = useSelector(s => s),
        optIns   =
          useSelector(getSmartAccountOptInForAccounts).map(addr => addr.toLowerCase()),
        
        // Fetch account metadata using a single memoized selector call.
        accountMetadata     =
          getMemoizedInternalAccountByAddress(state, sender),
      
      // Extract required values directly.
      keyringType       =
         accountMetadata?.metadata?.keyring?.type,

      isMetamaskOrigin         =
         origin === ORIGIN_METAMASK,
         
      globalSAOptinEnabled     =
         useSelector(getUseSmartAccount),

      hasSenderSpecificOptin   =
         optIns.includes(sender);

    if (
       isMetamaskOrigin ||
       hasSenderSpecificOptin ||
       (globalSAOptinEnabled && !isHardwareKeyring(keyringType))
     )
     return null;

   return (
    <SmartAccountUpdate
      wrapped
      handleRejectUpgrade={smartActionHandlers.handleRejectUpgrade}
    />
 );
}
