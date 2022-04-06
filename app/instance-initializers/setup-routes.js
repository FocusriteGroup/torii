/* eslint-disable ember/new-module-imports */

import { isEmpty } from '@ember/utils';
import bootstrapRouting from '@focusritegroup/torii/bootstrap/routing';
import { getConfiguration } from '@focusritegroup/torii/configuration';
import getRouterInstance from '@focusritegroup/torii/compat/get-router-instance';
import getRouterLib from '@focusritegroup/torii/compat/get-router-lib';
import "@focusritegroup/torii/router-dsl-ext";

export default {
  name: 'torii-setup-routes',
  initialize(applicationInstance /*, registry */){
    const configuration = getConfiguration();

    if (!configuration.sessionServiceName) {
      return;
    }

    let router = getRouterInstance(applicationInstance);
    var setupRoutes = function(){
      let routerLib = getRouterLib(router);
      var authenticatedRoutes = routerLib.authenticatedRoutes;
      var hasAuthenticatedRoutes = !isEmpty(authenticatedRoutes);
      if (hasAuthenticatedRoutes) {
        bootstrapRouting(applicationInstance, authenticatedRoutes);
      }
      router.off('willTransition', setupRoutes);
    };
    router.on('willTransition', setupRoutes);
  }
};
