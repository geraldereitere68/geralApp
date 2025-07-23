import { createProjectLogger } from '@geralapp/utils';
import { BaseControllerMessenger, BaseRestrictedControllerMessenger, ControllerByName, ControllerInitFunction, ControllerInitRequest } from './types';
import { CONTROLLER_MESSENGERS } from './messengers';

const log = createProjectLogger('controller-init');

export type InitControllersResult = {
  controllerApi: Record<string, any>;
  controllerMemState: Record<string, any>;
  controllerPersistedState: Record<string, any>;
  controllersByName: Partial<Record<string, any>>;
};

type InitFunctions = Partial<{
  [name in ControllersToInitialize]: (request: BaseControllerInitRequest) => any;
}>;

export function initControllers({ baseControllerMessenger,
    existingControllers = [],
    initFunctions,
    initRequest }: {
      baseControllerMessenger: BaseRestrictedControllerMessenger;
      existingControllers?: any[];
      initFunctions: InitFunctions;
      initRequest?: Omit<BaseControllerInitRequest,
          'controllerMessenger' | 'getController' | 'initMessenger'
        >
    }) : InitControllersResult {
  log('Initializing controllers', Object.keys(initFunctions).length);

  const partialControllersByName = existingControllers.reduce((acc, controller) => {
    acc[controller.name] = controller;
    return acc;
  }, {} as Partial<Record<string, any>>);

  const getContollerOrThrow=(controllersByName:any,name:string)=>controllersByName[name]??
                                    throw new Error(`Requested ${name} before it was initialized`);

   for (const key of Object.keys(initFunctions)) {
     const name=key as ControllersToInitialize;

     const request={
       ...initRequest,
       ...{baseRestrictedControlerMenssager},
       getContoller:getContollerOrThrow.bind(null,{...partialContollersbyNmae})
     };

     const result=await(initFunction(request));
     partialContollersbyNmae[key]=result.controller||null;

   }
   return{
     conttrollerApi:{...existingContrllers.map(c=>c.api)},
     memState:{},
     persisteState:{},
   };
}
