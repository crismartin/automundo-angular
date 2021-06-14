import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'columnHeaders'})
export class ColumnHeadersPipe implements PipeTransform {
  private static columnsMap = new Map([
    ['identificationId', 'Nº de identificación'],
    ['completeName', 'Nombre completo'],
    ['ssNumber', 'Nº Seguridad Social'],
    ['mobile', 'Móvil'],
    ['registrationDate', 'Fecha de alta'],
    ['leaveDate', 'Fecha de baja'],
    ['active', 'Activo'],
    ['reference', 'Referencia'],
    ['name', 'Nombre'],
    ['description', 'Descripción'],
    ['mobilePhone', 'Móvil'],
    ['address', 'Domicilio'],
    ['plate', 'Matrícula'],
    ['bin', 'Nº BIN'],
    ['model', 'Modelo'],
    ['customer', 'Cliente'],
    ['yearRelease', 'Año'],
    ['registerDate', 'Fecha de alta'],
    ['lastViewDate', 'Fecha última visita'],
    ['referenceId', 'Referencia'],
    ['diagnostic', 'Diagnóstico'],
    ['departureDate', 'Fecha de finalización'],
    ['technicianName', 'Técnico'],
    ['statusName', 'Estado'],
    ['cost', 'Coste (€)'],
    ['price', 'Precio (€)'],
  ]);

  transform(value: string): string {
    let valueTransformed = value;
    if (ColumnHeadersPipe.columnsMap.has(value)) {
      valueTransformed = ColumnHeadersPipe.columnsMap.get(value);
    }
    return valueTransformed;
  }
}
