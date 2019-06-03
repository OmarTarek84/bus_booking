import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Seat } from '../models/seat.model';
import * as JsPDF from 'jspdf';

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.scss']
})
export class PrintComponent implements OnInit {

  from;
  to;
  dateFrom;
  fullName;
  email;
  orderId;
  totalPrice;
  depTime;
  seatNumbers: Seat[] = [];
  busName;
  @ViewChild('printContent') printContent: ElementRef;

  constructor(private router: Router, private http: HttpClient) {
    this.from = this.router.getCurrentNavigation().extras.state.data.from;
    this.to = this.router.getCurrentNavigation().extras.state.data.to;
    this.dateFrom = this.router.getCurrentNavigation().extras.state.data.dateFrom;
    this.email = this.router.getCurrentNavigation().extras.state.email;
    this.fullName = this.router.getCurrentNavigation().extras.state.data.fullName;
    this.orderId = this.router.getCurrentNavigation().extras.state.data._id;
    this.totalPrice = this.router.getCurrentNavigation().extras.state.data.totalPrice;
    this.depTime = this.router.getCurrentNavigation().extras.state.data.depTime;
    this.seatNumbers = this.router.getCurrentNavigation().extras.state.data.reservedSeats;
    this.busName = this.router.getCurrentNavigation().extras.state.data.busName;
  }

  ngOnInit() {
  }

  downloadPDF() {
    const doc = new JsPDF();
    const specialElementHandlers = {
      '#editor': function (element, renderer) {
        return true;
      }
    };

    const content = this.printContent.nativeElement;

    doc.fromHTML(content.innerHTML, 15, 15, {
      'width': 210,
      'elementHandlers': specialElementHandlers
    });

    doc.save(this.orderId + '.pdf');
  }

}
