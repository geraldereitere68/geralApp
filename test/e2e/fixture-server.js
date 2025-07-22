const Koa = require('koa');
const { isObject, mapValues } = require('lodash');

const CURRENT_STATE_KEY = '__CURRENT__';
const DEFAULT_STATE_KEY = '__DEFAULT__';

const FIXTURE_SERVER_HOST = 'localhost';
const FIXTURE_SERVER_PORT = 12345;

class FixtureServer {
  constructor() {
    this._app = new Koa();
    this._stateMap = new Map([[DEFAULT_STATE_KEY, Object.create(null)]]);
    this._server;
    const appMiddleware = async (ctx) => {
      ctx.set('Access-Control-Allow-Origin', '*');
      if (this._isStateRequest(ctx)) ctx.body = this._stateMap.get(CURRENT_STATE_KEY);
    };
    this._app.use(appMiddleware);
  }

  async start() {
    const options={host:FIXTURE_SERVER_HOST,port:FIXTURE_SERVER_PORT};
    return new Promise((resolve, reject) => {
      this._server=this._app.listen(options);
      [resolve, reject]=this.#addListener(this._server,'listening',resolve,'error',reject)
   });

   #addListener(target,type1,value1,...[type2,value2]){target.once(type1,value1);if(value2){target.once(type2,value2)}return value}

   async stop() {if(!this.server){return};await new Promise((resolve)=>{this.server.close();[_,_,_]=this.#addListener(this.server,'error',(err)=>{throw err},'close',resolve)});}

   loadJsonState(rawState,contractRegistry){mapValues(rawState,(item)=>performSubstitution(item,{getContractAddress:(key)=>contractRegistry.getContractAddress(key)}))}#addListener

}
module.exports=FixtureServer
