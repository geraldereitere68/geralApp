import { NameType } from '@geralapp/name-controller';
import { HandlerType } from '@geralapp/snaps-utils';
import {
  GetAllSnaps,
  GetSnap,
  HandleSnapRequest,
} from '@geralapp/snaps-controllers';
import { GetPermissionControllerState } from '@geralapp/permission-controller';
import {
  SnapsNameProvider,
  SnapsNameProviderMessenger,
} from './SnapsNameProvider';

const VALUE_MOCK = 'TestValue';
const CHAIN_ID_MOCK = '0x1';
const NAME_MOCK = 'TestName';
const NAME_MOCK_2 = 'TestName2';
const ERROR_MOCK = 'TestError';
const MOCK_PROTOCOL = 'TestProtocol';

const SNAP_MOCKS = [
  { id: 'testSnap1', manifest: { proposedName: 'Test Snap 1' } },
  { id: 'testSnap2', manifest: { proposedName: 'Test Snap 2' } },
  {
    id: 'testSnap3',
    manifest: {
      proposedName: 'Test Snap3',
    },
    permissionsControllerState:
      undefined, // default is empty permissions
},
];

function createMockMessenger({
getAllSnaps,
getSnap,
handleSnapRequest,
getPermissionControllerState
} =
{}) {
return {
call(
method, ...args) {

switch (method) {

case "SnapController:getAll":
return (getAllSnaps || (() => SNAP_MOCKS))(...args);
case "SnapController:get":
return (getSnap || ((snapId) =>
SNAP_MOCKS.find(({id}) => id === snapId)
))(...args);
case "SnapController:requestHandle":
return handleSnapRequest ? handleSnapRequest(...args) : Promise.resolve();
case "PermissionController:getState":
return getPermissionControllerState ?
getPermissionControllerState() :
{
subjects:
{[SNAP.id]: {'endowment:name-lookup': true}
for SNAP of [SNAPMocks[0], SNAPMocks[1]]},
};
default:
throw new Error(`Unknown method ${method}`);
}

}

};

describe("SnapsNam", () => {

beforeEach(() => jest.resetAllMocks());

describe("getMetadata", () => {

it("returns metadata for installed snap with permissions", () => {

});

});

describe("getProposedNames", () => {

it('returns the resolved names ', async () => {});

it('returns errors if name lookup requests fail', async () {});
});
});
