import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Seat } from './../../models/seat.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import openSocket from 'socket.io-client';

interface ResultDataa {
  data: any;
}

interface ElementData {
  style?: any;
  value?: any;
  setAttribute?: any;
  nextElementSibling?: any;
}

@Component({
  selector: 'app-select-seats',
  templateUrl: './select-seats.component.html',
  styleUrls: ['./select-seats.component.scss']
})
export class SelectSeatsComponent implements OnInit {

  _id;
  reservedSeats: Seat[] = [];
  fare: number;
  coachType: String;
  dateFrom;
  from;
  to;
  depTime;
  busName;
  totalPrice = 0;
  isLoading = false;
  constructor(private router: Router, private http: HttpClient) {
    this._id = this.router.getCurrentNavigation().extras.state._id;
    this.fare = this.router.getCurrentNavigation().extras.state.fare;
    this.coachType = this.router.getCurrentNavigation().extras.state.coachType;
    this.from = this.router.getCurrentNavigation().extras.state.from;
    this.to = this.router.getCurrentNavigation().extras.state.to;
    this.dateFrom = this.router.getCurrentNavigation().extras.state.dateFrom;
    this.depTime = this.router.getCurrentNavigation().extras.state.depTime;
    this.busName = this.router.getCurrentNavigation().extras.state.busName;
  }

  ngOnInit() {
    const socket = openSocket('http://localhost:8080');
    socket.on('seatsOrdered', data => {
      const bookedSeatNumbers = data.seats;
      const allInputValues = document.querySelectorAll('input[class="seatReserve"]');
      bookedSeatNumbers.map(bookedSeat => {
        allInputValues.forEach((i: ElementData) => {
          if (bookedSeat === i.value) {
            i.setAttribute('disabled', 'true');
            i.style.cursor = 'auto';
            i.nextElementSibling.children[0].src = '../../../assets/images/bookseat.png';
          }
        });
      });
    });
    const requestBody = {
      query: `
        query SearchRoute($_id: ID!) {
          searchRoute(_id: $_id) {
            seats {
              seatNumber
              booked
            }
          }
        }
      `,
      variables: {
        _id: this._id
      }
    };
    return this.http.post('http://localhost:8080/graphql', requestBody, {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    })
    .subscribe((result: ResultDataa) => {
      const allInputValues = document.querySelectorAll('input[class="seatReserve"]');
      const bookedSeats = result.data.searchRoute.seats.filter(seat => {
        return seat.booked === true;
      })
      .map(resSeats => {
        return resSeats.seatNumber;
      });
      return bookedSeats.map(bookedSeat => {
        allInputValues.forEach((i: ElementData) => {
          if (bookedSeat === i.value) {
            i.setAttribute('disabled', 'true');
            i.style.cursor = 'auto';
            i.nextElementSibling.children[0].src = '../../../assets/images/bookseat.png';
          }
        });
      });
    });
  }

  onBookSeats(e) {
    if (e.target.checked) {
      e.srcElement.nextElementSibling.children[0].src = '../../../assets/images/fseat.png';
      this.reservedSeats.push({
        seatNumber: e.target.value,
        booked: true
      });
        this.totalPrice += this.fare;
    } else {
      e.srcElement.nextElementSibling.children[0].src = '../../../assets/images/bseat.png';
      const index = this.reservedSeats.indexOf({
        seatNumber: e.target.value,
        booked: true
      });
      this.reservedSeats.splice(index, 1);
      this.totalPrice -= this.fare;
    }
  }

  onGoToUserform() {
    this.router.navigate(['/book'], {state: {
      _id: this._id,
      totalPrice: this.totalPrice,
      reservedSeats: [...this.reservedSeats],
      from: this.from,
      to: this.to,
      dateFrom: this.dateFrom,
      depTime: this.depTime,
      busName: this.busName,
      coachType: this.coachType
    }});
  }

}
