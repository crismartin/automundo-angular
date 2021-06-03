import {OwnerType} from './owner-type';
import {Revision} from './revision';

export interface Vehicle {
  referenceId?: string;
  plate: string;
  bin: string;
  model: string;
  manufacturedDate?: number;
  yearRelease?: string;
  registerDate?: Date;
  lastViewDate?: Date;
  ownerType?: OwnerType;
  customer?: string;
  revisions?: Revision[];
}
