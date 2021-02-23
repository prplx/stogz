import { NextApiHandler } from 'next';
import axios, { AxiosRequestConfig } from 'axios';
import { getAccessToken } from '@auth0/nextjs-auth0';

const handler: NextApiHandler = async (req, res) => {
  try {
    const accessToken = (await getAccessToken(req, res)).accessToken;
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
    res.status(error.status || 401).end(error.message);
  }
};

export default handler;
