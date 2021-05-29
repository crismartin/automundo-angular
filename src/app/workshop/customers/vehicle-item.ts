import {Customer} from './customer.model';

export interface VehicleItem {
  plate: string;
  bin: string;
  model: string;
  yearRelease: string;
  registerDate?: Date;
  lastViewDate?: Date;
}
