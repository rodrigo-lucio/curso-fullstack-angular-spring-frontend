const url = '18.234.65.57:8080';
export const environment = {
  production: true,
  apiUrl: `http://${url}`,
  tokenWhitelistedDomains: [url],
  tokenBlacklistedRoutes: [`http://${url}/oauth/token`]
};
