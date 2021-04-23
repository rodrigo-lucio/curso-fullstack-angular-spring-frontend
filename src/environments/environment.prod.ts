const url = 'localhost:8080';
export const environment = {
  production: true,
  apiUrl: `http://${url}`,
  tokenWhitelistedDomains: [url],
  tokenBlacklistedRoutes: [`http://${url}/oauth/token`]
};
