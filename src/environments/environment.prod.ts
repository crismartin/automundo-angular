import {name, version} from '../../package.json';

export const environment = {
  production: true,
  NAME: name,
  VERSION: version,
  REST_CORE: 'https://tfm-automundo-core.herokuapp.com'
};
