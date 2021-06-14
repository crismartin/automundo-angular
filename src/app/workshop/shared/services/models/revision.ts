import {Technician} from './technician';
import {StatusRevision} from './status-revision';
import {ReplacementUsedItem} from './replacement-used-item';

export interface Revision {
  reference?: string;
  diagnostic?: string;
  registerDate?: Date;
  initialKilometers?: number;
  technician?: Technician;
  workedHours?: number;
  cost?: number;
  departureDate?: Date;
  departureKilometers?: number;
  workDescription?: string;
  status?: StatusRevision;
  replacementsUsed?: ReplacementUsedItem[];
  vehicleReference?: string;
}
