
import {StatusRevision} from './status-revision';
import {ReplacementUsed} from './replacement-used';
import {Technician} from './technician';

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
  replacementsUsed?: ReplacementUsed[];
  vehicleReference?: string;
}
