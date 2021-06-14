import {Technician} from './technician';

export interface RevisionItem {
  reference?: string;
  diagnostic?: string;
  registerDate?: Date;
  departureDate?: Date;
  technicianName?: string;
  statusName?: string;
  cost?: number;
}
