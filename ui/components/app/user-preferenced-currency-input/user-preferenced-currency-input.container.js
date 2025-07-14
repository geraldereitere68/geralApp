import { connect } from 'react-redux';
import { toggleCurrencySwitch } from '../../../ducks/app/app';
import UserPreferencedCurrencyInput from './user-preferenced-currency-input.component';

const mapStateToProps = ({ appState }) => ({
  sendInputCurrencySwitched: appState.sendInputCurrencySwitched,
});

const mapDispatchToProps = { onPreferenceToggle: toggleCurrencySwitch };

export default connect(mapStateToProps, mapDispatchToProps)(UserPreferencedCurrencyInput);
