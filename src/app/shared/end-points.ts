import {environment} from '@env';

export class EndPoints {
  static VEHICLES = environment.REST_CORE + '/vehicles';
  static CUSTOMERS = environment.REST_CORE + '/customers';
  static REPLACEMENTS = environment.REST_CORE + '/replacements';
  static VEHICLE_TYPES = environment.REST_CORE + '/vehicle-types';
  static TECHNICIANS = environment.REST_CORE + '/technicians';
  static REVISIONS = environment.REST_CORE + '/revisions';
}
