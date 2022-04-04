import Router from '@ember/routing/router';
import getRouterLib from 'torii/compat/get-router-lib';

var currentMap = null;

export function authenticatedRoute(...args) {
  const router = args.shift()
  router.route.apply(router, args);
  currentMap.push(args[0]);
};

Router.reopen({
  _initRouterJs() {
    currentMap = [];
    this._super.apply(this, arguments);
    let routerLib = getRouterLib(this);
    routerLib.authenticatedRoutes = currentMap;
  }
});
