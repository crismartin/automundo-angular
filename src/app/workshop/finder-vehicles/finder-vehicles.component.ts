import { Component, OnInit } from '@angular/core';
import {VehicleSearch } from './vehicle-search.model';
import {Vehicle} from '../shared/services/models/vehicle.model';
import {VehicleService} from './vehicle.service';
import {of} from 'rxjs';
import {Customer} from '../shared/services/models/customer.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-finder-vehicles',
  templateUrl: './finder-vehicles.component.html',
  styleUrls: ['./finder-vehicles.component.css']
})
export class FinderVehiclesComponent implements OnInit {

  vehicleSearch: VehicleSearch;
  vehicles = of([]);
  title = 'Buscador de vehículos';

  constructor(private vehicleService: VehicleService, private router: Router) {
    this.resetSearch();
  }

  ngOnInit(): void {
  }

  search(): void {
    this.vehicles = this.vehicleService.search(this.vehicleSearch);
  }

  resetSearch(): void {
    this.vehicleSearch = {};
  }


  read(vehicle: Vehicle): void {
    this.router.navigate(['/taller/vehiculo', vehicle.reference]);
  }
}
