export interface Customer {
  id?: string;
  identificationId: string;
  completeName: string;
  registrationDate?: Date;
  lastVisitDate?: Date;
  phone?: string;
  mobilePhone: string;
  address: string;
  email?: string;
  name?: string;
  surName?: string;
  secondSurName?: string;
}
