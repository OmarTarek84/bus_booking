import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Seat } from '../models/seat.model';
import { NgForm } from '@angular/forms';

interface ResultData {
  data: any;
}

@Component({
  selector: 'app-user-book-seats',
  templateUrl: './user-book-seats.component.html',
  styleUrls: ['./user-book-seats.component.scss']
})

export class UserBookSeatsComponent implements OnInit {

  @ViewChild('f') bookSeatsForm: NgForm;
  _id;
  from;
  to;
  dateFrom;
  depTime;
  busName;
  coachType;
  totalPrice;
  seats: Seat[] = [];
  constructor(private router: Router, private http: HttpClient) {
    this._id = this.router.getCurrentNavigation().extras.state._id;
    this.from = this.router.getCurrentNavigation().extras.state.from;
    this.to = this.router.getCurrentNavigation().extras.state.to;
    this.dateFrom = this.router.getCurrentNavigation().extras.state.dateFrom;
    this.depTime = this.router.getCurrentNavigation().extras.state.depTime;
    this.busName = this.router.getCurrentNavigation().extras.state.busName;
    this.coachType = this.router.getCurrentNavigation().extras.state.coachType;
    this.seats = this.router.getCurrentNavigation().extras.state.reservedSeats;
    this.totalPrice = this.router.getCurrentNavigation().extras.state.totalPrice;
  }

  ngOnInit() {
  }

  onPurchaseSeats() {
    const requestBody = {
      query: `
        mutation CreateOrder (
          $fullName: String!
          $mobileNumber: String!
          $email: String!
          $totalPrice: Float!
          $reservedSeats: [SeatInput]!
          $routeId: ID!
        ) {
          createOrder(orderInput: {
            fullName: $fullName,
            mobileNumber: $mobileNumber,
            email: $email,
            totalPrice: $totalPrice,
            reservedSeats: $reservedSeats,
            routeId: $routeId
          }) {
            _id
            reservedSeats {
              seatNumber
              booked
            }
            fullName
            mobileNumber
            email
            totalPrice
            createdAt
          }
        }
      `,
      variables: {
        fullName: this.bookSeatsForm.value.name,
        mobileNumber: this.bookSeatsForm.value.mobile,
        email: this.bookSeatsForm.value.email,
        totalPrice: this.totalPrice,
        reservedSeats: [...this.seats],
        routeId: this._id
      }
    };

    return this.http.post('http://localhost:8080/graphql', requestBody, {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    })
    .subscribe((result: ResultData) => {
      this.router.navigate(['/ticket'], {state: {data: {
        _id: result.data.createOrder._id,
        from: this.from,
        to: this.to,
        dateFrom: this.dateFrom,
        fullName: result.data.createOrder.fullName,
        reservedSeats: result.data.createOrder.reservedSeats,
        totalPrice: result.data.createOrder.totalPrice,
        busName: this.busName,
        depTime: this.depTime
      }}});
    });
  }

}
