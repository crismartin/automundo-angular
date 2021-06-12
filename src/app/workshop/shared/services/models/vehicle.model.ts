import {VehicleType} from './vehicle-type';
import {Revision} from './revision';

export interface Vehicle {
  reference?: string;
  plate: string;
  bin: string;
  model: string;
  manufacturedDate?: number;
  yearRelease?: number;
  registerDate?: Date;
  lastViewDate?: Date;
  vehicleType?: VehicleType;
  customer?: string;
  revisions?: Revision[];
}
