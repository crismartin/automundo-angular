import {Component, Inject, OnInit} from '@angular/core';
import {CustomerCreationUpdate} from './customer-creation-update.model';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {CustomerService} from '../customer.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Customer} from '../../shared/services/models/customer.model';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';

@Component({
  selector: 'app-customer-dialog',
  templateUrl: './customer-dialog.component.html',
  styleUrls: ['./customer-dialog.component.css']
})
export class CustomerDialogComponent implements OnInit {

  public customerForm: FormGroup;
  title = 'Crear/Actualizar Cliente';
  inCreation: boolean;
  data: Customer;

  constructor(@Inject(MAT_DIALOG_DATA) data: Customer, private router: Router, private dialog: MatDialog,
              private customerService: CustomerService, private snackBar: MatSnackBar) {
    this.title = data ? 'Actualizar Cliente' : 'Crear Cliente';
    this.inCreation = !data;
    this.data = data;

    this.customerForm = data ? new FormGroup({
      identificationId: new FormControl({value: data.identificationId, disabled: true}, [Validators.required, Validators.maxLength(10)]),
      name: new FormControl(data.name, [Validators.required, Validators.maxLength(30)]),
      surName: new FormControl(data.surName, [Validators.required, Validators.maxLength(50)]),
      secondSurName: new FormControl(data.secondSurName, [Validators.required, Validators.maxLength(50)]),
      phone: new FormControl(data.phone, [Validators.required, Validators.maxLength(10), Validators.pattern('[0-9]+')]),
      mobilePhone: new FormControl(data.mobilePhone, [Validators.required, Validators.maxLength(10), Validators.pattern('[0-9]+')]),
      address: new FormControl(data.address, [Validators.required, Validators.maxLength(100)]),
      email: new FormControl(data.email, [Validators.required, Validators.email]),
      lastVisitDate: new FormControl(data.email, [Validators.required])
    }) : new FormGroup({
      identificationId: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      name: new FormControl('', [Validators.required, Validators.maxLength(30)]),
      surName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      secondSurName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      phone: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.pattern('[0-9]+')]),
      mobilePhone: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.pattern('[0-9]+')]),
      address: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }

  ngOnInit(): void {
  }

  create(customer: CustomerCreationUpdate): void {
    this.customerService
      .create(customer)
      .subscribe(customerCreated => {
        this.snackBar.open('Usuario creado correctamente', '', {
          duration: 3500
        });
        this.router.navigate(['/taller/cliente', customerCreated.identificationId]);
        this.dialog.closeAll();
      });
  }

  hasError(controlName: string, errorName: string): boolean {
    return this.customerForm.controls[controlName].hasError(errorName);
  }

  onSubmit(customerForm: FormGroup): void {
    if (!customerForm.valid) {
      this.snackBar.open('Hay datos inválidos en el formulario', 'Error', {
        duration: 2000
      });
      return;
    }
    const customer: CustomerCreationUpdate = {
        identificationId: customerForm.get('identificationId').value,
      //  completeName: customerForm.get('name').value + ' ' + customerForm.get('surName').value
       //   + ' ' + customerForm.get('secondSurName').value,
        name: customerForm.get('name').value,
        surName: customerForm.get('surName').value,
        secondSurName: customerForm.get('secondSurName').value,
        phone: customerForm.get('phone').value,
        mobilePhone: customerForm.get('mobilePhone').value,
        address: customerForm.get('address').value,
        email: customerForm.get('email').value
    };
    if (this.inCreation) {
      this.create(customer);
    } else {
      customer.lastVisitDate = customerForm.get('lastVisitDate').value;
      this.update(customer);
    }
  }

  update(customer: CustomerCreationUpdate): void {
    /*this.customerService
      .update(customer, this.data.id)
      .subscribe(() =>
      Si ha ido MAL cerrar formulario y navegar al detalle del cliente editado
      Si hay ido MAL mostrar snackbar error y no cerrar el formulario
      this.dialog.closeAll());*/
  }
}
