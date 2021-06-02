import {environment} from '@env';

export class EndPoints {
  static VEHICLES = environment.REST_CORE + '/vehicles';
  static CUSTOMERS = environment.REST_CORE + '/customers';
  static REPLACEMENTS = environment.REST_CORE + '/replacements';
}
