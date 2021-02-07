import jwt from 'koa-jwt';
import { koaJwtSecret } from 'jwks-rsa';
import config from '../config';

export default jwt({
  secret: koaJwtSecret({
    jwksUri: `${config.auth0Issuer}.well-known/jwks.json`,
    rateLimit: true,
    cache: true,
    cacheMaxEntries: 5,
    cacheMaxAge: 10 * 60 * 60 * 1000,
  }),
  audience: config.auth0Audience,
  issuer: config.auth0Issuer,
  algorithms: ['RS256'],
}).unless({ path: [/^\/$/] });
