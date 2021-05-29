import {CustomerContact} from './customer-contact.model';

export interface Customer {
  completeName?: string;
  identificationId: string;
  registrationDate?: Date;
  lastVisitDate?: Date;
  contact: CustomerContact;
}
