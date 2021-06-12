export interface Technician {
  identificationId: string;
  ssNumber: string;
  completeName?: string;
  registrationDate?: Date;
  leaveDate?: Date;
  mobile?: string;
  name?: string;
  surName?: string;
  secondSurName?: string;
  active: boolean;
}
