export interface VehicleItem {
  referenceId?: string;
  plate: string;
  bin: string;
  model: string;
  yearRelease: number;
  registerDate?: Date;
  lastViewDate?: Date;
}
