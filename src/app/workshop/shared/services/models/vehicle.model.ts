import {Customer} from './customer.model';

export interface Vehicle {
  plate: string;
  bin: string;
  model: string;
  manufacturedDate?: number;
  registerDate?: Date;
  lastViewDate?: Date;
  customer: string;
}
