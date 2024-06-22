const envs = process.env;
export const environmentVar = {
  apiUrl: envs.REACT_APP_BASE_URL,
  stripeKey: envs.REACT_APP_STRIPE_KEY,
  domain: envs.REACT_APP_OAUTH_DOMAIN,
  cliendid: envs.REACT_APP_OAUTH_CLIENTID,
  redirecturl: envs.REACT_APP_REDIRECT_URL,
  shippingApiUrl: envs.REACT_APP_SHIPPING_PARTNER_API,
  siteKey: envs.REACT_APP_API_SITE_KEY,
  cdnUrl: envs.REACT_APP_CDN_URL,
};
