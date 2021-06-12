export interface Technician {
  identificationId: string;
  ssNumber: string;
  completeName?: string;
  mobile?: string;
  name?: string;
  surName?: string;
  secondSurName?: string;
  registrationDate?: Date;
  leaveDate?: Date;
  active: boolean;
}
