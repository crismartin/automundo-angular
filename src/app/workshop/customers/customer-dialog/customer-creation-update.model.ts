export interface CustomerCreationUpdate {
  id?: string;
  identificationId: string;
  completeName: string;
  name: string;
  surName: string;
  secondSurName: string;
//  registrationDate: Date; BACKEND
  phone: string;
  mobilePhone: string;
  address: string;
  email: string;
}
