import { Component, OnInit } from '@angular/core';
import {VehicleSearch } from './vehicle-search.model';
import {Vehicle} from '../shared/services/models/vehicle.model';
import {VehicleService} from './vehicle.service';
import {of} from 'rxjs';

@Component({
  selector: 'app-finder-vehicles',
  templateUrl: './finder-vehicles.component.html',
  styleUrls: ['./finder-vehicles.component.css']
})
export class FinderVehiclesComponent implements OnInit {

  vehicleSearch: VehicleSearch;
  vehicles = of([]);
  title = 'Buscador de vehículos';

  constructor(private vehicleService: VehicleService) {
    this.resetSearch();
  }

  ngOnInit(): void {
  }

  search(): void {
    this.vehicles = this.vehicleService.search(this.vehicleSearch);
  }

  resetSearch() {
    this.vehicleSearch = {};
  }

  read(vehicle: Vehicle): void {
    /*this.dialog.open(ReadDetailDialogComponent, {
      data: {
        title: 'Article Details',
        object: this.articleService.read(article.barcode)
      }
    });*/
  }
}
