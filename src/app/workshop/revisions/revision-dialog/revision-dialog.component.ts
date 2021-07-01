import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Revision} from '../../shared/services/models/revision';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {RevisionService} from '../revision.service';
import {ReplacementsService} from '../../replacements/replacements-service';
import {Technician} from '../../shared/services/models/technician';
import {SharedTechnicianService} from '../../shared/services/shared.technician.service';
import * as moment from 'moment';

@Component({
  selector: 'app-revision-dialog',
  templateUrl: './revision-dialog.component.html',
  styleUrls: ['./revision-dialog.component.css']
})
export class RevisionDialogComponent {
  title = 'Crear/Actualizar Revision';
  inCreation: boolean;
  revisionForm: FormGroup;
  revisionModel: Revision;
  technicians: Technician[];

  constructor(@Inject(MAT_DIALOG_DATA) data: Revision, private snackBar: MatSnackBar, private dialog: MatDialogRef<RevisionDialogComponent>,
              private revisionService: RevisionService, private replacementsService: ReplacementsService,
              private sharedTechnicianService: SharedTechnicianService) {
    this.title = data.reference ? 'Actualizar Revisión' : 'Crear Revisión';
    this.inCreation = !data.reference;

    this.revisionModel = data.reference ? {
      reference: data.reference,
      diagnostic: data.diagnostic,
      registerDate: data.registerDate,
      initialKilometers: data.initialKilometers,
      technician: data.technician,
      workedHours: data.workedHours,
      departureDate: data.departureDate,
      departureKilometers: data.departureKilometers,
      workDescription: data.workDescription,
      cost: data.cost,
      status: data.status,
      vehicleReference: data.vehicleReference

    } : {
      reference: '',
      diagnostic: '',
      registerDate: null,
      initialKilometers: null,
      technician: {
        identificationId: '',
      },
      workedHours: null,
      departureDate: null,
      departureKilometers: null,
      workDescription: '',
      cost: 0,
      status: {
        id: '',
        code: null
      },
      vehicleReference: data.vehicleReference
    };

    this.replacementsService.updateDataFromTable(data.reference ? data.replacementsUsed : []);
    this.replacementsService.setRevisionReference(data.reference);
    this.revisionForm = templateForm(this.revisionModel);

    this.sharedTechnicianService.search({active: true})
      .subscribe(technicians => this.technicians = technicians);
  }

  serializeForm(formData: any): Revision {
    return {
      reference: this.revisionModel.reference,
      diagnostic: formData.diagnostic,
      registerDate: formData.registerDate,
      initialKilometers: formData.initialKilometers,
      technician: {
        identificationId: formData.technician,
      },
      workedHours: formData.workedHours,
      departureDate: formData.departureDate,
      departureKilometers: formData.departureKilometers,
      workDescription: formData.workDescription,
      status: formData.status,
      vehicleReference: this.revisionModel.vehicleReference
    };
  }

  onSubmit(revisionForm: FormGroup): void  {
    console.log('submit');
    console.log(this.revisionForm.value);

    if (!revisionForm.valid) {
      this.snackBar.open('Hay datos inválidos en el formulario', 'Error', {
        duration: 2000
      });
      return;
    }

    const revision = this.serializeForm(this.revisionForm.value);
    revision.replacementsUsed = this.replacementsService.getDataFromTable();
    this.save(revision);
  }

  checkDepartureDate(statusCode: string, date: Date): Date {
    return statusCode === '4' ? date : null;
  }

  hasError(name: string, errorName: string): boolean {
    return this.revisionForm.controls[name].hasError(errorName);
  }

  save(revision: Revision): void{
    if (this.inCreation) {
      this.create(revision);
    }else{
      this.update(revision);
    }
  }

  isFinished(): boolean {
    return this.revisionForm.get('status').value === 'FINALIZADO' ||
      this.revisionForm.get('status').value === 'NEGADO';
  }

  create(revision: Revision): void {
    console.log('create revision');
    console.log(revision);
    this.revisionService.create(revision)
      .subscribe(revisionCreated => this.dialog.close(revisionCreated));
  }

  update(revision: Revision): void {
    console.log('update revision');
    console.log(revision);
    this.revisionService.update(revision)
      .subscribe(() => this.dialog.close());
  }
}

function templateForm(revision: Revision): FormGroup {
  return new FormGroup({
    referenceId: new FormControl({value: revision.reference, disabled: true}),
    diagnostic: new FormControl(revision.diagnostic, [Validators.required, Validators.maxLength(50)]),
    registerDate: new FormControl(moment(revision.registerDate, 'YYYY-MM-DD HH:mm').toDate(),
      [Validators.required, Validators.maxLength(16)]),
    initialKilometers: new FormControl(revision.initialKilometers, [Validators.maxLength(6), Validators.pattern('[0-9]+')]),
    technician: new FormControl(revision.technician.identificationId, [Validators.required]),
    workedHours: new FormControl(revision.workedHours, [Validators.maxLength(5), Validators.pattern('[0-9]+')]),
    departureDate: new FormControl( moment(revision.departureDate, 'YYYY-MM-DD HH:mm').toDate() ),
    departureKilometers: new FormControl(revision.departureKilometers, [Validators.maxLength(6), Validators.pattern('[0-9]+')]),
    workDescription: new FormControl(revision.workDescription, [Validators.maxLength(500)]),
    status: new FormControl(String(revision.status), [Validators.required])
  });
}

