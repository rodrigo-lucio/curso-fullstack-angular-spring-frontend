const url = 'result-app.herokuapp.com';
export const environment = {
  production: true,
  apiUrl: `https://${url}`,
  tokenWhitelistedDomains: [url],
  tokenBlacklistedRoutes: [`https://${url}/oauth/token`]
};
