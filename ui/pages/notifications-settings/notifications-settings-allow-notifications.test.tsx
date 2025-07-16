import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { MetamaskNotificationsProvider } from '../../contexts/geralapp-notifications/geralapp-notifications';
import { NotificationsSettingsAllowNotifications } from './notifications-settings-allow-notifications';

const mockStore = configureStore([thunk]);
const store = mockStore({ geralapp: { isMetamaskNotificationsEnabled: false } });

describe('NotificationsSettingsAllowNotifications', () => {
  it('renders correctly', () => {
    const testId = 'notifications-settings-allow';
    const setLoading = jest.fn();
    const { getByTestId } = render(
      <Provider store={store}>
        <MetamaskNotificationsProvider>
          <NotificationsSettingsAllowNotifications
            dataTestId={testId}
            disabled={false}
            loading={false}
            setLoading={setLoading}
          />
        </MetamaskNotificationsProvider>
      </Provider>
    );

    expect(getByTestId(`${testId}-toggle-box`)).toBeInTheDocument();
    expect(getByTestId(`${testId}-toggle-input`)).toBeInTheDocument();
  });
});
