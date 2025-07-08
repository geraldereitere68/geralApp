import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  FormTextField,
  TextFieldSize,
  TextFieldType,
} from '../../component-library';
import { hideWarning } from '../../../store/actions';

import { useI18nContext } from '../../../hooks/useI18nContext';
import ShowHideToggle from '../../ui/show-hide-toggle';
import BottomButtons from './bottom-buttons';

export default function PrivateKeyImportView({ importAccountFunc, onActionComplete }) {
  const t = useI18nContext();
  const dispatch = useDispatch();
  const [privateKey, setPrivateKey] = useState('');
  const [showPrivateKey, setShowPrivateKey] = useState(false);
  const warning = useSelector((state) => state.appState.warning);

  useEffect(() => () => dispatch(hideWarning()), [dispatch]);

  const handleImport = () => importAccountFunc('privateKey', [privateKey]);
  
  return (
    <>
      <FormTextField
        id="private-key-box"
        size={TextFieldSize.Lg}
        autoFocus
        helpText={warning}
        error={Boolean(warning)}
        label={t('pastePrivateKey')}
        value={privateKey}
        onChange={(e) => setPrivateKey(e.target.value)}
        inputProps={{
          onKeyPress: (e) => {
            if (privateKey && e.key === 'Enter') {
              e.preventDefault();
              handleImport();
            }
          },
        }}
        marginBottom={4}
        type={showPrivateKey ? TextFieldType.Text : TextFieldType.Password}
        textFieldProps={{
          endAccessory: (
            <ShowHideToggle
              shown={showPrivateKey}
              id="show-hide-private-key"
              title={t('privateKeyShow')}
              ariaLabelShown={t('privateKeyShown')}
              ariaLabelHidden={t('privateKeyHidden')}
              onChange={() => setShowPrivateKey((prev) => !prev)}
            />
          ),
        }}
      />
      <BottomButtons
        importAccountFunc={handleImport}
        isPrimaryDisabled={!privatekey.trim()}
      	onActionComplete= {onActionComplete} 
      />
    </>
   );
}

PrivatekeyImportView.propTypes={
	importAccountFunc:PropTypes.func.isRequired,
	onActionComplete:PropTypes.func.isRequired,
};
