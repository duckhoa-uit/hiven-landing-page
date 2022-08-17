import httpProxy, { ProxyResCallback } from 'http-proxy';
import Cookies from 'cookies';

const proxy = httpProxy.createProxyServer();
export const config = {
   api: {
      bodyParser: false,
   },
};

export default function handler(req, res) {
   if (req.method !== 'POST') {
      return res.status(404).json({
         data: null,
         error: {
            message: 'Method is not supported',
         },
      });
   }

   return new Promise((resolve) => {
      //don't send cookies to API Server
      req.headers.cookie = '';

      const handleLoginRes = (proxyRes, req, res) => {
         let body = '';
         proxyRes.on('data', function (chunk) {
            body += chunk;
         });
         proxyRes.on('end', function () {
            try {
               const {
                  data: { jwt, user },
               } = JSON.parse(body);
               //set cookies
               const cookies = new Cookies(req, res, {
                  secure: process.env.NODE_ENV !== 'development',
               });
               cookies.set('access_token', jwt, {
                  httpOnly: true,
                  sameSite: 'lax',
               });
               res.status(200).json(body);
            } catch (error) {
               res.status(res.statusCode).json(body);
            }

            resolve(true);
         });
      };

      proxy.once('proxyRes', handleLoginRes);
      proxy.web(req, res, {
         target: process.env.API_URL,
         changeOrigin: true,
         selfHandleResponse: true,
      });
   });
}
