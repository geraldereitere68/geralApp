import setupSentry from './lib/setupSentry';

global.stateHooks ??= {};
global.sentry = setupSentry();
