import { Subscription } from 'rxjs';
import { AuthService } from './../services/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';

interface ResultDatta {
  data: any;
}

@Component({
  selector: 'app-available-routes',
  templateUrl: './available-routes.component.html',
  styleUrls: ['./available-routes.component.scss']
})
export class AvailableRoutesComponent implements OnInit, OnDestroy {

  @ViewChild('f') searchForm: NgForm;
  searched = false;
  foundOrders = [];
  isLoading = false;
  fSelect = 'Cairo';
  tSelect = 'Hurghada';
  isError;
  subscription: Subscription;

  constructor(private http: HttpClient, private authService: AuthService) { }

  ngOnInit() {
    this.isError = this.authService.getIsError();
    this.subscription = this.authService.errorChanged.subscribe(error => {
      this.isError = error;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSearchOrders() {
    this.foundOrders = [];
    this.isLoading = true;
    this.searched = false;
    if (this.searchForm.invalid) {
      return;
    }
    const requestBody = {
      query: `
        query SearchAdminRoute($dateFrom: String!, $depTime: String!, $from: String!, $to: String!) {
          searchAdminRoute(dateFrom: $dateFrom, depTime: $depTime, from: $from, to: $to) {
            orders {
              _id
              fullName
              mobileNumber
              email
              reservedSeats {
                seatNumber
              }
              routeId {
                _id
                coachType
              }
            }
          }
        }
      `,
      variables: {
        dateFrom: this.searchForm.value.dateFrom,
        depTime: this.searchForm.value.depTime,
        from: this.searchForm.value.from,
        to: this.searchForm.value.to
      }
    };

    return this.http.post('/graphql', requestBody, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.authService.getToken()
      })
    })
    .subscribe((result: ResultDatta) => {
      this.searched = true;
      this.isLoading = false;
      result.data.searchAdminRoute.map(route => {
        this.foundOrders.push(route.orders);
      });
    });
  }

}
