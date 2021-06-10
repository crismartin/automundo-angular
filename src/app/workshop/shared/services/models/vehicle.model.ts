import {OwnerType} from './owner-type';
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
  ownerType?: OwnerType;
  customer?: string;
  revisions?: Revision[];
}
