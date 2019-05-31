import { AuthGuard } from './guards/auth.guard';
import { BookedGuard } from './guards/booked.guard';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AvailableBusesComponent } from './available-buses/available-buses.component';
import { SelectSeatsComponent } from './available-buses/select-seats/select-seats.component';
import { UserBookSeatsComponent } from './user-book-seats/user-book-seats.component';
import { PrintComponent } from './print/print.component';
import { LoginComponent } from './login/login.component';
import { CreateRouteComponent } from './create-route/create-route.component';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { RouteService } from './services/routes.service';
import { SpinnerComponent } from './UI/spinner/spinner.component';
import { AvailableRoutesComponent } from './available-routes/available-routes.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'search', component: AvailableBusesComponent, canActivate: [BookedGuard]},
  {path: 'book', component: UserBookSeatsComponent, canActivate: [BookedGuard]},
  {path: 'ticket', component: PrintComponent, canActivate: [BookedGuard]},
  {path: 'search/seats/:id', component: SelectSeatsComponent, canActivate: [BookedGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'create-route', component: CreateRouteComponent, canActivate: [AuthGuard]},
  {path: 'admin-routes', component: AvailableRoutesComponent, canActivate: [AuthGuard]}
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    AvailableBusesComponent,
    SelectSeatsComponent,
    UserBookSeatsComponent,
    PrintComponent,
    LoginComponent,
    CreateRouteComponent,
    SpinnerComponent,
    AvailableRoutesComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    NgbModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [AuthService, RouteService, BookedGuard, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
