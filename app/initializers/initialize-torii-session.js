import bootstrapSession from '@focusritegroup/torii/bootstrap/session';
import { getConfiguration } from '@focusritegroup/torii/configuration';

export default {
  name: 'torii-session',
  after: 'torii',

  initialize(application) {
    if (arguments[1]) { // Ember < 2.1
      application = arguments[1];
    }
    const configuration = getConfiguration();
    if (!configuration.sessionServiceName) {
      return;
    }

    bootstrapSession(application, configuration.sessionServiceName);

    var sessionFactoryName = 'service:' + configuration.sessionServiceName;
    application.inject('adapter', configuration.sessionServiceName, sessionFactoryName);
  }
};
