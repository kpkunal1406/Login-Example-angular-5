import { InjectionToken } from '@angular/core';

import { IAppConfig } from './iapp.config';

export let APP_CONFIG = new InjectionToken('app.config');

export const AppConfig: IAppConfig = {
  routes: {
    heroes: 'heroes',
    error404: '404'
  },
  endpoints: {
    heroes: 'https://nodejs-example-app.herokuapp.com/heroes',
    user: 'http://localhost:8080/user',
    oauth_token: 'http://localhost:8080/oauth/token',
    revoke_token: 'http://localhost:8080/oauth/revoke-token'
  },
  votesLimit: 3,
  topHeroesLimit: 4,
  snackBarDuration: 3000,
  repositoryURL: 'https://github.com/Ismaestro/angular5-example-app',
  security: {
    client_id: 'kpkunaljwtclientid',
    grant_type: 'password',
    client_secret: 'kpkunal14'
  }
};
