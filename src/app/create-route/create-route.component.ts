import { Subscription } from 'rxjs';
import { AuthService } from './../services/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild, OnDestroy, HostBinding } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { routeAnimation } from '../route-animation';

@Component({
  selector: 'app-create-route',
  templateUrl: './create-route.component.html',
  styleUrls: ['./create-route.component.scss'],
  animations: [
    routeAnimation
  ]
})
export class CreateRouteComponent implements OnInit, OnDestroy {

  fromSelect = 'Cairo';
  toSelect = 'Alex';
  dateInvalid = false;
  isError = false;
  subscription: Subscription;
  @ViewChild('f') createRouteForm: NgForm;
  @HostBinding('@routeTrigger') route = true;

  constructor(private http: HttpClient, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.isError = this.authService.getIsError();
    this.subscription = this.authService.errorChanged.subscribe(error => {
      this.isError = error;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onChangeDate(e) {
    if (new Date(e.target.value).getTime() < new Date().getTime()) {
      this.dateInvalid = true;
    } else {
      this.dateInvalid = false;
    }
  }

  onCreateRoute() {
    if (this.createRouteForm.invalid) {
      return;
    }
    // this.createRouteForm.reset();
    const requestBody = {
      query: `
        mutation CreateRoute($from: String!, $to: String!, $dateFrom: String!, $depTime: String!, $coachType: String!, $busName: String!, $fare: Float!) {
          createRoute(routeInput: {
            from: $from,
            to: $to,
            dateFrom: $dateFrom,
            seats: [
                              {
                            seatNumber: "A1",
                            booked: false
                        },
                        {
                            seatNumber: "A2",
                            booked: false
                        },
                        {
                            seatNumber: "A3",
                            booked: false
                        },
                        {
                            seatNumber: "A4",
                            booked: false
                        },
                        {
                            seatNumber: "B1",
                            booked: false
                        },
                        {
                            seatNumber: "B2",
                            booked: false
                        },
                        {
                            seatNumber: "B3",
                            booked: false
                        },
                        {
                            seatNumber: "B4",
                            booked: false
                        },
                        {
                            seatNumber: "C1",
                            booked: false
                        },
                        {
                            seatNumber: "C2",
                            booked: false
                        },
                        {
                            seatNumber: "C3",
                            booked: false
                        },
                        {
                            seatNumber: "C4",
                            booked: false
                        },
                        {
                            seatNumber: "D1",
                            booked: false
                        },
                        {
                            seatNumber: "D2",
                            booked: false
                        },
                        {
                            seatNumber: "D3",
                            booked: false
                        },
                        {
                            seatNumber: "D4",
                            booked: false
                        }
            ],
            depTime: $depTime,
            coachType: $coachType,
            busName: $busName,
            fare: $fare
          }) {
            _id
            busName
            from
            to
            dateFrom
            coachType
            fare
          }
        }
      `,
      variables: {
        from: this.createRouteForm.value.from,
        to: this.createRouteForm.value.to,
        dateFrom: this.createRouteForm.value.dateFrom,
        depTime: this.createRouteForm.value.depTime,
        coachType: this.createRouteForm.value.coachType,
        busName: this.createRouteForm.value.busName,
        fare: +this.createRouteForm.value.fare
      }
    };

    return this.http.post('http://localhost:8080/graphql', requestBody, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.authService.getToken()
      })
    })
    .subscribe(resData => {
      this.router.navigate(['/']);
    });
  }

}
