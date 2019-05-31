import { AuthService } from './../services/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

interface ResultDatta {
  data: any;
}

@Component({
  selector: 'app-available-routes',
  templateUrl: './available-routes.component.html',
  styleUrls: ['./available-routes.component.scss']
})
export class AvailableRoutesComponent implements OnInit {

  @ViewChild('f') searchForm: NgForm;
  searched = false;
  foundOrders = [];
  isLoading = false;

  constructor(private http: HttpClient, private authService: AuthService) { }

  ngOnInit() {
  }

  onSearchOrders() {
    this.foundOrders = [];
    this.isLoading = true;
    this.searched = false;
    const requestBody = {
      query: `
        query SearchAdminRoute($dateFrom: String!, $depTime: String!) {
          searchAdminRoute(dateFrom: $dateFrom, depTime: $depTime) {
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
        depTime: this.searchForm.value.depTime
      }
    };

    return this.http.post('http://localhost:8080/graphql', requestBody, {
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
