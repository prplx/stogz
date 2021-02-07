import dotenv from 'dotenv';
import { getStringEnv, getNumberEnv } from 'env-guard';

dotenv.config({ path: '.env' });

const config = {
  port: getNumberEnv('PORT') || 3000,
  auth0Audience: getStringEnv('AUTH0_AUDIENCE'),
  auth0Issuer: getStringEnv('AUTH0_ISSUER'),
};

export default config;
