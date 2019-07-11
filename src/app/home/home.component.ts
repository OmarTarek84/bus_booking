import { Component, OnInit, ViewChild, HostBinding } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RouteService } from '../services/routes.service';
import { routeAnimation } from '../route-animation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    routeAnimation
  ]
})
export class HomeComponent implements OnInit {

  @HostBinding('@routeTrigger') route = true;
  places = [];
  fromSelect = 'Cairo';
  toSelect = 'Alex';
  @ViewChild('f') searchBusForm: NgForm;
  constructor(private routeService: RouteService) { }

  ngOnInit() {
    this.places = [
      {key: '700007', value:  'Cairo'},
      {key: '700001', value:  'Fayed'},
      {key: '700002', value:  'Alex'},
      {key: '700003', value:  'Sharm'},
      {key: '700004', value:  'Hurghada'},
      {key: '700005', value:  'Matrouh'}
    ];
    this.routeService.booked = false;
  }

  onLeave(e) {
    const selectedValue = e.target.value;
    if (selectedValue === 'Cairo') {
      this.places = [
        {key: '100001', value:  'Fayed'} ,
        {key: '100002', value:  'Alex'} ,
        {key: '100003', value:  'Sharm'} ,
        {key: '100004', value:  'Hurghada'},
        {key: '100005', value:  'Matrouh'}
      ];
    } else if (selectedValue === 'Alex') {
      this.places = [
        {key: '200001', value:  'Cairo'} ,
        {key: '200002', value:  'Fayed'} ,
        {key: '200003', value:  'Sharm'} ,
        {key: '200004', value:  'Hurghada'},
        {key: '200005', value:  'Matrouh'}
      ];
    } else if (selectedValue === 'Sharm') {
      this.places = [
        {key: '300001', value:  'Cairo'} ,
        {key: '300002', value:  'Alex'} ,
        {key: '300003', value:  'Fayed'} ,
        {key: '300004', value:  'Hurghada'},
        {key: '300005', value:  'Matrouh'}
      ];
    } else if (selectedValue === 'Fayed') {
      this.places = [
        {key: '400001', value:  'Cairo'} ,
        {key: '400002', value:  'Alex'} ,
        {key: '400003', value:  'Sharm'} ,
        {key: '400004', value:  'Hurghada'},
        {key: '400005', value:  'Matrouh'}
      ];
    } else if (selectedValue === 'Hurghada') {
      this.places = [
        {key: '500001', value:  'Cairo'} ,
        {key: '500002', value:  'Alex'} ,
        {key: '500003', value:  'Sharm'} ,
        {key: '500004', value:  'Fayed'},
        {key: '500005', value:  'Matrouh'}
      ];
    } else if (selectedValue === 'Matrouh') {
      this.places = [
        {key: '600001', value:  'Cairo'} ,
        {key: '600002', value:  'Alex'} ,
        {key: '600003', value:  'Sharm'} ,
        {key: '600004', value:  'Fayed'},
        {key: '600005', value:  'Hurghada'}
      ];
    }
  }

  onSearchBus() {
    this.routeService.searchRoute(
      this.searchBusForm.value.from,
      this.searchBusForm.value.to,
      new Date(this.searchBusForm.value.dateFrom).toLocaleDateString()
    );
  }

}
