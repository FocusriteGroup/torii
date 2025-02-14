import LinkedInOauth2Provider from '@focusritegroup/torii/providers/linked-in-oauth2';
import GoogleOauth2Provider from '@focusritegroup/torii/providers/google-oauth2';
import GoogleOauth2BearerProvider from '@focusritegroup/torii/providers/google-oauth2-bearer';
import GoogleOauth2BearerV2Provider from '@focusritegroup/torii/providers/google-oauth2-bearer-v2';
import FacebookConnectProvider from '@focusritegroup/torii/providers/facebook-connect';
import FacebookOauth2Provider from '@focusritegroup/torii/providers/facebook-oauth2';
import ApplicationAdapter from '@focusritegroup/torii/adapters/application';
import TwitterProvider from '@focusritegroup/torii/providers/twitter-oauth1';
import GithubOauth2Provider from '@focusritegroup/torii/providers/github-oauth2';
import AzureAdOauth2Provider from '@focusritegroup/torii/providers/azure-ad-oauth2';
import StripeConnectProvider from '@focusritegroup/torii/providers/stripe-connect';

import ToriiService from '@focusritegroup/torii/services/torii';
import PopupService from '@focusritegroup/torii/services/popup';
import IframeService from '@focusritegroup/torii/services/iframe';

export default function(application) {
  application.register('service:torii', ToriiService);

  application.register('torii-provider:linked-in-oauth2', LinkedInOauth2Provider);
  application.register('torii-provider:google-oauth2', GoogleOauth2Provider);
  application.register('torii-provider:google-oauth2-bearer', GoogleOauth2BearerProvider);
  application.register('torii-provider:google-oauth2-bearer-v2', GoogleOauth2BearerV2Provider);
  application.register('torii-provider:facebook-connect', FacebookConnectProvider);
  application.register('torii-provider:facebook-oauth2', FacebookOauth2Provider);
  application.register('torii-provider:twitter', TwitterProvider);
  application.register('torii-provider:github-oauth2', GithubOauth2Provider);
  application.register('torii-provider:azure-ad-oauth2', AzureAdOauth2Provider);
  application.register('torii-provider:stripe-connect', StripeConnectProvider);
  application.register('torii-adapter:application', ApplicationAdapter);

  application.register('torii-service:iframe', IframeService);
  application.register('torii-service:popup', PopupService);
}
