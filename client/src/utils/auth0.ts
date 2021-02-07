import { getStringEnv } from 'env-guard';
import { initAuth0 } from '@auth0/nextjs-auth0';

export default initAuth0({
  domain: getStringEnv('AUTH0_DOMAIN'),
  clientId: getStringEnv('AUTH0_CLIENT_ID'),
  clientSecret: getStringEnv('AUTH0_CLIENT_SECRET'),
  audience: getStringEnv('AUTH0_AUDIENCE'),
  scope: 'openid email profile',
  redirectUri: 'http://localhost:3031/api/callback',
  postLogoutRedirectUri: 'http://localhost:3031/',
  session: {
    cookieSecret: getStringEnv('COOKIE_SECRET'),
    cookieLifetime: 60 * 60 * 8,
    storeAccessToken: true,
  },
});
