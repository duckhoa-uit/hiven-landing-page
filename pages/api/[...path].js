import httpProxy from 'http-proxy';

const proxy = httpProxy.createProxyServer();

export const config = {
   api: {
      bodyParser: false,
   },
};
export default function handler(req, res) {
   return new Promise((resolve) => {
      //don't send cookies to API Server
      req.headers.cookie = '';

      proxy.web(req, res, {
         target: process.env.API_URL,
         changeOrigin: true,
         selfHandleResponse: false,
      });

      proxy.once('proxyRes', () => {
         resolve(true);
      });
   });
}
