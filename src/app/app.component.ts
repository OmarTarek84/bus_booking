import { AuthService } from './services/auth.service';
import { Component, OnInit } from '@angular/core';
import openSocket from 'socket.io-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService) {}
  title = 'bus-ticket';

  ngOnInit() {
    openSocket('http://localhost:8080');
    this.authService.autoAuthData();
  }
}
