import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {TechnicianService} from '../technician.service';
import {Technician} from '../../../shared/services/models/technician';

@Component({
  selector: 'app-technician-dialog',
  templateUrl: './technician-dialog.component.html',
  styleUrls: ['./technician-dialog.component.css']
})
export class TechnicianDialogComponent implements OnInit {

  public technicianForm: FormGroup;
  title = 'Crear/Actualizar Técnico';
  inCreation: boolean;
  data: Technician;

  constructor(@Inject(MAT_DIALOG_DATA) data: Technician, private dialog: MatDialog,
              private technicianService: TechnicianService, private snackBar: MatSnackBar) {
    this.title = data ? 'Actualizar Técnico' : 'Crear Técnico';
    this.inCreation = !data;
    this.data = data;

    this.technicianForm = data ? new FormGroup({
      identificationId: new FormControl({value: data.identificationId, disabled: true}, [Validators.required, Validators.maxLength(10)]),
      ssNumber: new FormControl(data.ssNumber, [Validators.required, Validators.maxLength(10)]),
      name: new FormControl(data.name, [Validators.required, Validators.maxLength(30)]),
      surName: new FormControl(data.surName, [Validators.required, Validators.maxLength(50)]),
      secondSurName: new FormControl(data.secondSurName, [Validators.required, Validators.maxLength(50)]),
      mobile: new FormControl(data.mobile, [Validators.required, Validators.maxLength(10), Validators.pattern('[0-9]+')]),
      active: new FormControl(data.active),
    }) : new FormGroup({
      identificationId: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      ssNumber: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      name: new FormControl('', [Validators.required, Validators.maxLength(30)]),
      surName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      secondSurName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      mobile: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.pattern('[0-9]+')]),
    });
  }

  ngOnInit(): void {
  }

  create(technician: Technician): void {
    this.technicianService
      .create(technician)
      .subscribe(technicianCreated => {
        this.snackBar.open('Técnico creado correctamente', '', {
          duration: 3500
        });
        this.dialog.closeAll();
      });
  }

  hasError(controlName: string, errorName: string): boolean {
    return this.technicianForm.controls[controlName].hasError(errorName);
  }

  onSubmit(technicianForm: FormGroup): void {
    if (!technicianForm.valid) {
      this.snackBar.open('Hay datos inválidos en el formulario', 'Error', {
        duration: 2000
      });
      return;
    }
    const technician: Technician = {
      identificationId: technicianForm.get('identificationId').value,
      ssNumber: technicianForm.get('ssNumber').value,
      name: technicianForm.get('name').value,
      surName: technicianForm.get('surName').value,
      secondSurName: technicianForm.get('secondSurName').value,
      mobile: technicianForm.get('mobile').value,
      active: this.inCreation ? true : technicianForm.get('active').value
    };
    if (this.inCreation) {
      this.create(technician);
    } else {
      this.update(technician);
    }
  }

  update(technician: Technician): void {
    this.technicianService
      .update(technician, this.data.identificationId)
      .subscribe(technicianUpdated => {
        this.snackBar.open('Técnico editado correctamente', '', {
          duration: 3500
        });
        this.dialog.closeAll();
      });
  }
}
