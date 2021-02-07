import { NextApiHandler } from 'next';
import axios, { AxiosRequestConfig } from 'axios';
import auth0 from '../../utils/auth0';

const handler: NextApiHandler = async (req, res) => {
  try {
    const tokenCache = auth0.tokenCache(req, res);
    const { accessToken } = await tokenCache.getAccessToken();
    const { method, body } = req;

    if (!accessToken) res.status(401).end();

    try {
      const response = await axios({
        url: process.env.API_URL,
        method: method as AxiosRequestConfig['method'],
        data: body,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      res.status(response.status).end(JSON.stringify(response.data));
    } catch (error) {
      console.log(error.response?.data?.errors);
      res.status(error.response?.status || 400).end(error.message);
    }
  } catch (error) {
    res.status(error.status || 400).end(error.message);
  }
};

export default handler;
