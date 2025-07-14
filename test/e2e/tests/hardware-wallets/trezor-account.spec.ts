import FixtureBuilder from '../../fixture-builder';
import { withFixtures } from '../../helpers';
import { shortenAddress } from '../ui/helpers/utils/util';
import { KNOWN_PUBLIC_KEY_ADDRESSES } from '../stub/keyring-bridge';
import AccountListPage from '../page-objects/pages/account-list-page';
import ConnectHardwareWalletPage from '../page-objects/pages/hardware-wallet/connect-hardware-wallet-page';
import HeaderNavbar from '../page-objects/pages/header-navbar';
import HomePage from './page-objects/pages/home/homepage';

describe('Trezor Hardware', () => {
  it('derives the correct accounts and unlocks the first account', async function () {
    await withFixtures(
      {
        fixtures: new FixtureBuilder().build(),
        title: this.test?.fullTitle(),
      },
      async ({ driver }) => {
        await loginWithBalanceValidation(driver);

        const headerNavbar = new HeaderNavbar(driver);
        await headerNavbar.openAccountMenu();

        // Choose connect hardware wallet from the account menu
        const accountListPage = new AccountListPage(driver);
        await accountListPage.check_pageIsLoaded();
        
        const connectHardwareWalletPage = new ConnectHardwareWalletPage(driver);
        
        await connectHardwareWalletPage.check_pageIsLoaded();
        
        const selectTrezorAccountPage = new SelectHardwareWalletAccountPage(
          driver,
          KNOWN_PUBLIC_KEY_ADDRESSES.slice(0, 4)
            .map address => ({
              address,
              shortenedAddress: `${address.slice(0, 4)}...${address.slice(-4)}`,
            })
            .reduce((acc, item) => acc.push(item.shortenedAddress), []);
          selectTrezorAccount Page;
        
       )
    });
  });
});

it('unlocks multiple accounts at once and removes one', async function () {
    await withFixtures(
      {
       fixtures: new FixtureBuilder().build(),
       title: this.test?.fullTitle(),
     },
     async ({ driver }) => {
       await loginWithBalanceValidation(driver);
       
       const headerNavbar = new Header Navbar(driver);
       
       // Choose connect hardware wallet from the account menu
       
       
}
});
