import { Component, OnInit } from '@angular/core';
import { Route } from '../models/route.model';
import { RouteService } from '../services/routes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-available-buses',
  templateUrl: './available-buses.component.html',
  styleUrls: ['./available-buses.component.scss']
})
export class AvailableBusesComponent implements OnInit {
  availableBuses: Route[] = [];
  noRoutes = false;

  constructor(private routeService: RouteService, private router: Router) { }

  ngOnInit() {
    this.availableBuses = this.routeService.getSearchedRoutes();
    this.noRoutes = this.routeService.getNoRoutes();
  }

  onGoToSeats(id, fare, coachType, from, to, dateFrom, depTime, busName) {
    this.router.navigate(['/search/seats/' + id], {state: {_id: id, fare: fare, coachType: coachType, from: from, to: to, dateFrom: dateFrom, depTime: depTime, busName: busName}});
  }

}
