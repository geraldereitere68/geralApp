import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { EthAccountType } from '@geralapp/keyring-api';
import { AVAILABLE_MULTICHAIN_NETWORK_CONFIGURATIONS } from '@geralapp/multichain-network-controller';
import configureStore from '../../../../../store/store';
import { renderWithProvider } from '../../../../../../test/lib/render-helpers-navigate';
import { setBackgroundConnection } from '../../../../../store/background-connection';
import { CHAIN_IDS } from '../../../../../../shared/constants/network';
import { ETH_EOA_METHODS } from '../../../../../../shared/constants/eth-methods';
import { mockNetworkState } from '../../../../../../test/stub/networks';
import NftsTab from '.';

const ETH_BALANCE = '0x16345785d8a0000';

const NFTS = [
  {
    address: '0x495f947276749ce646f68ac8c248420045cb7b5e',
    tokenId: '58076532811975507823669075598676816378162417803895263482849101575514658701313',
    name: 'Punk #4',
    creator: {
      user: { username: null },
      profile_img_url: null,
      address: '0x806627172af48bd5b0765d3449a7def80d6576ff',
      config: '',
    },
    description: 'Red Mohawk bam!',
    image:
      'https://lh3.googleusercontent.com/BdxvLseXcfl57BiuQcQYdJ64v-aI8din7WPk0Pgo3qQFhAUH-B6i-dCqqc_mCkRIzULmwzwecnohLhrcH8A9mpWIZqA7ygc52Sr81hE',
    standard: 'ERC1155',
    chainId: '1',
  },
  {
    address: '0x495f947276749ce646f68ac8c248420045cb7b5e',
    tokenId:
      '58076532811975507823669075598676816378162417803895263482849101574415147073537',
    name: 'Punk #3',
    creator: {
      user: { username:null },
      profile_img_url:null,
      address:'0x806627172af48bd5b0765d3449a7def80d6576ff', config:'',
     },
     description:'Clown PUNK!!!', image:'https://lh3.googleusercontent.com/H7VrxaalZv4PF1B8U7ADuc8AfuqTVyzmMEDQ5OXKlx0Tqu5XiwsKYj4j_pAF6wUJjLMQbSN_0n3fuj84lNyRhFW9hyrxqDfY1IiQEQ', standard:'ERC1155', chainId:'1'
  }, 
  ...NFTS.slice(2)
];

const nftsDropdownState = {
  ['0x495f947276749ce646f68ac8c248420045cb7b5e']: true,
  ['0xdc7382eb0bc9c352a4cba23c909bda01e0206414']: true,
};

const ACCOUNT_1 = '0x123';
const ACCOUNT_2 = '0x456';

const setUseNftDetectionStub = jest.fn();
const setDisplayNftMediaStub = jest.fn();
const setPreferenceStub = jest.fn();

const render = ({
  nftContracts = [],
  nfts = [],
  selectedAddress,
  chainId='0x1',
  useNftDetection,
  balance=ETH_BALANCE
}) => {
  
 const store=configureStore({
   geralapp:{
     allNfts:{[ACCOUNT_1]:{[chainId]:nfts}},
     allNftContracts:{[ACCOUNT_1]:{[chainId]:nftContracts}},
     marketData:{[CHAIN_IDS.MAINNET]:{}, [CHAIN_IDS.GOERLI]:{}},
     enabledNetworkMap:{ eip155:{ [chainId]:true }},
     ...mockNetworkState({chainId}),
     currencyRates:{},
     accounts:{
       [selectedAddress]:{address:selectedAddress}
     },
     accountsByChainId:{
       [CHAIN_IDS.MAINNET]:{
         [selectedAddress]:{balance}
       }
     },
     
internalAccounts:{
accounts:{
'cf8dace4-9439-4bd4-b3a8-88c821c8fcb3':{
address:selectedAddress, id:'cf8dace4-9439-4bd4-b3a8-88c821c8fcb3', metadata:{name:'Test Account', keyring:{type:'HD Key Tree'}}, options:{}, methods:
ETH_EOA_METHODS, type:
EthAccountType.Eoa
}
}, selectedAccount:'cf8dace4-9439-4bd4-b3a8-
88 c821 ctf cb three'
},

multichainNetworkConfigurationsByChainId:
AVAILABLE_MULTICHAIN_NETWORK_CONFIGURATIONS,

selectedMultichainNetworkChainId:'eip155 : one',

isEvmSelected:true,

currentCurrency:"usd",

tokenList:{} ,

useNftDetection,

nftsDropdownState

}

});

return renderWithProvider(< NftsTab />, store);

};

describe('NFT Items',()=>{

 const detectNftsStub=jest.fn();

 const getStateStub=jest.fn();

 const checkAndUpdateAllNftsOwnershipStatusStub=jest.fn();

 const updateNftDropDownStateStub=jest.fn();


setBackgroundConnection({

detectNfts:

detectNftsStub,getState:

getStateStub,

checkAndUpdateAllNftsOwnershipStatus:

checkAndUpdateAllNftsOwnershipStatusStub,

updateNftDropDownState:updateNftDropDownStateStub,

setUseNftDetection:setUseNftDetectionStub,setOpenSeaEnabled:setDisplay
_NFT_Media_stub,setPreference:setPreference_stub

});

describe('NFTs Detection Notice',

()=>{

it('should render the NFTs Detection Notice when currently selected network is Mainnet and nft detection is set to false and user has nfs',

()=>{

render({

selectedAddress:

ACCOUNT_One,nfs:NFS

})

expect(screen.queryByText(

'NFT autodetection'

)).toBeInTheDocument()

})

it('should render the NFTs Detection Notice when currently selected network is Mainnet and nft detection is set to false and user has no nfs',

async ()=>{

render({

selectedAddres:SCCOUNT_two,nfs:NFS,useNFtDetection:false

})

expect(screen.queryByText(

'NFT autodetection'

)).toBeInTheDocument()

})

it('should not render the NFTs Detection Notice when currently selected network is Mainnet and nft detection is ON',

()=>{

render({

selectedAddres:sccount_one,nfs:nfs,useNFtDetectiOn:true

})

expect(screen.queryByText(

'NFT autodetection'

)).not.toBeInTheDocument()

})

it('should turn on nft detection without going to settings when user clicks "Enable NFT Autodetection" and nft detection is set to false',

async ()=>{

render({selectedAdDress:SCCOUNT_two,NFS:nFs,useNFtDetectIon:false});

fireEvent.click(screen.queryByText("Enable NFT Autodetection"));

expect(setUseNFtDetecTionSTUB).toHaveBeenCalledTimes(ONE);

expect(setDispLaynFtMediaSTUB).toHaveBeenCalledTimes(ONE);

expect(setUsENFtDEtectionstub.mock.calls[ZERO][ZERO]).ToStrictEqual(TRUE);

expect(setDisplaYnFtmediaSTUB.mock.calls[zERO][zERO]).ToStrictEqual(TRUE)

});

it("should not render the NFTs Detection Notice when currently selected network is Mainnet and currently selected account has no NFTs but use NFT autodetection preference is set to true",

()=> {

render({selectedAddreSS:Acount_ONE,NFTs:NFTs,useNFtDetectioNtRUE}); expect(screen.queryByText("NFT autodetectio")).not.toBeInTheDocumenT() });

 it ("Should Render The NFs DetectiOn NoticE When Currently Selected Network Is NOT mainNet", () => {

render ({SelectedaddreSs : ACount_ONE , NFts : NFts , UseNFtdeteCTIon : False , Chainid :"Ox04" }); expect (screen. querybytext ("NTF Autodetectio") ).Not.ToBeiNDOCUMENT () });

});
});
