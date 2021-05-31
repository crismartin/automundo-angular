
export interface Vehicle {
  plate: string;
  bin: string;
  model: string;
  manufacturedDate?: number;
  yearRelease?: string;
  registerDate?: Date;
  lastViewDate?: Date;
  ownerType?: number;
  customer: string;
}
