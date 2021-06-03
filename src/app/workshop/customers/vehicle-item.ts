export interface VehicleItem {
  referenceId?: string;
  plate: string;
  bin: string;
  model: string;
  yearRelease: string;
  registerDate?: Date;
  lastViewDate?: Date;
}
