import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Revision} from '../../shared/services/models/revision';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {RevisionService} from '../revision.service';
import {ReplacementsService} from '../../replacements/replacements-service';

@Component({
  selector: 'app-revision-dialog',
  templateUrl: './revision-dialog.component.html',
  styleUrls: ['./revision-dialog.component.css']
})
export class RevisionDialogComponent {
  title = 'Create/Update Revision';
  inCreation: boolean;
  revisionForm: FormGroup;
  revisionModel: Revision;

  constructor(@Inject(MAT_DIALOG_DATA) data: Revision, private snackBar: MatSnackBar, private dialog: MatDialogRef<RevisionDialogComponent>,
              private revisionService: RevisionService, private replacementsService: ReplacementsService) {
    this.title = data.reference ? 'Editar Revisión' : 'Crear Revisión';
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
    this.revisionForm = templateForm(this.revisionModel);
  }

  onSubmit(revisionForm: FormGroup): void  {
    console.log('submit');

    if (!revisionForm.valid) {
      this.snackBar.open('Hay datos inválidos en el formulario', 'Error', {
        duration: 2000
      });
      return;
    }

    const revision: Revision = {
      reference: revisionForm.get('referenceId').value,
      diagnostic: revisionForm.get('diagnostic').value,
      registerDate: revisionForm.get('registerDate').value,
      initialKilometers: revisionForm.get('initialKilometers').value,
      technician: {
        identificationId: revisionForm.get('technician').value,
      },
      workedHours: revisionForm.get('workedHours').value,
      departureDate: this.checkDepartureDate(revisionForm.get('status').value, revisionForm.get('departureDate').value),
      departureKilometers: revisionForm.get('departureKilometers').value,
      workDescription: revisionForm.get('workDescription').value,
      status: {
        code: revisionForm.get('status').value
      },
      vehicleReference: this.revisionModel.vehicleReference
    };
    console.log('antes de pillar las revisiones');
    console.log(revision);

    console.log('despues de pillar las revisiones');
    revision.replacementsUsed = this.replacementsService.getDataFromTable();
    console.log(revision);

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
      revision.status.code = 1;
      this.create(revision);
    }else{
      this.update(revision);
    }
  }

  isFinished(): boolean {
    return this.revisionForm.get('status').value === '4';
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
    registerDate: new FormControl(revision.registerDate, [Validators.required, Validators.maxLength(16)]),
    initialKilometers: new FormControl(revision.initialKilometers, [Validators.maxLength(6), Validators.pattern('[0-9]+')]),
    technician: new FormControl(revision.technician.identificationId, [Validators.required]),
    workedHours: new FormControl(revision.workedHours, [Validators.maxLength(5), Validators.pattern('[0-9]+')]),
    departureDate: new FormControl(revision.departureDate, [Validators.maxLength(16)]),
    departureKilometers: new FormControl(revision.departureKilometers, [Validators.maxLength(6), Validators.pattern('[0-9]+')]),
    workDescription: new FormControl(revision.workDescription, [Validators.maxLength(500)]),
    status: new FormControl(String(revision.status.code), [Validators.required])
  });
}
