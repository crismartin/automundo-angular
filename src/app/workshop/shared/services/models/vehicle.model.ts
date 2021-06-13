import {VehicleType} from './vehicle-type';
import {Revision} from './revision';

export interface Vehicle {
  identificationCustomer?: string;
  reference?: string;
  plate?: string;
  bin?: string;
  model?: string;
  manufacturedDate?: number;
  yearRelease?: number;
  registerDate?: Date;
  lastViewDate?: Date;
  vehicleType?: VehicleType;
  typeNumber?: string;
  customer?: string;
  revisions?: Revision[];
}
