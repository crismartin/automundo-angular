
export interface Vehicle {
  referenceId?: string;
  plate: string;
  bin: string;
  model: string;
  manufacturedDate?: number;
  yearRelease?: string;
  registerDate?: Date;
  lastViewDate?: Date;
  ownerType?: number;
  customer?: string;
}
