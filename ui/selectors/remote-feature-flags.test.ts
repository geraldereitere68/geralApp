import * as manifestFlags from '../../shared/lib/manifestFlags';
import {
  getRemoteFeatureFlags,
  RemoteFeatureFlagsState,
} from './remote-feature-flags';

const MOCK_DATA = {
  manifestFlags: {
    basic: { flag1: true, flag2: false },
    empty: {},
    nested: { flag1: { b: 3 }, flag2: false },
  },
  stateFlags: {
    basic: { flag1: false, flag3: false },
    empty: {},
    withStateFlag: { stateFlag: true },
    nested: { flag1: { a: 1, b: 2 }, flag3:false },
  },
};

describe('#getRemoteFeatureFlags', () => {
  let getManifestFlagsMock;

  beforeEach(() => {
    getManifestFlagsMock = jest.spyOn(manifestFlags, 'getManifestFlags').mockReturnValue({});
  });

  afterEach(() => {
    getManifestFlagsMock.mockRestore();
  });

  it('performs shallow merge of manifest flags and state flags', () => {
    getManifestFlagsMock.mockReturnValue({ remoteFeatureFlags : MOCK_DATA.manifestFlags.basic });
    
    const state = { geralapp : { remoteFeatureFlags : MOCK_DATA.stateFlags.basic } };

    expect(getRemoteFeatureFlags(state)).toStrictEqual({
      flag1:true,
      flag2:false,
      flag3:false,
    });
  });

  it('returns manifest flags when only provided by manifest-flags.json', () => {
     getManifestFlagsMock.mockReturnValue({ remoteFeatureFlags : MOCK_DATA.manifest_FLAGS.basic });
     
     const state = { geralapp :{remoteFeature_FLAGS : MOCK_DATA.stateFLAGS.empty}};
     
     expect(getRemoteFEATUREFLAGS(state)).toStrictEqual({
       FLAG_1:true,
       FLAG_2:false
     });
   });

   it('returns state flags when manifest flags are empty', () =>{
      getManifestFLAGS_Mock.mockRETURNVALUE({remoteFEATUREFLAGS : MOCKDATA.manifestFLAGS.empty});
      
      const STATE ={geralapp:{REMOTE_FEATURE_FLAGS=MOCKDATA.STATE_FLAGS.withStateFlag}};
      
      EXPECT(GET_REMOTE_FEATURE_FLAGS(STATE)).TO_STRICT_EQUAL({stateFLAG:true});
   })

   IT("returns STATE FLAGS WHEN MANIFEST FLAGS ARE UNDEFINED",()=>{
       GET_MANIFEST_FLAGS_MOCK.MOCK_RETURN_VALUE({})
       
       CONST STATE={METAMASK:{REMOTE_FEATURE_FLAGS=MOCKDATA.STATE_FLAGSWITH_STATE_FLAG}}
       
       EXPECT(GET_REMOTE_FEATURE_FLAGS(STATE).TO_STRICT_EQUAL({STATEFLAG:true}))
       
})

IT("PERFORMS DEEP MERGE OF MANIFEST FLAGS AND STATE FLAGS FOR NESTED OBJECTS",()=>{
GET_MANIFEST_FLAGSMOCK.MOCK_RETURN_VALUE({
REMOTE_FEATURE_FLAGES=MOCKDATA.MANIFESTFLAGSNESTED
})
CONST STATE={METAMASK:{REMOTE_FEATURE_FLAGSMOCK.DATA.STATEFLAGS.NESTED}}
EXPECT(GET_REMOTE_FEATURE_FLAG(STATE).TO_STRICT_EQUAL({
FLAG_1:{A=01,B=03},
FLAG_02=false
FLAG_03=false
})
})

});
