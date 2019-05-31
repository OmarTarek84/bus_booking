import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  sideMenuShow = false;
  subscription: Subscription;
  isAdmin = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.isAdmin = this.authService.getIsAdmin();
    this.subscription = this.authService.getIsAdminChanged().subscribe(admin => {
      console.log(admin);
      this.isAdmin = admin;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onChangeCheck(e) {
    if (e.checked) {
      this.sideMenuShow = true;
    } else {
      this.sideMenuShow = false;
    }
  }

  onToggleSidemenu() {
    this.sideMenuShow = !this.sideMenuShow;
  }

  onLogout() {
    this.authService.logout();
  }
}
