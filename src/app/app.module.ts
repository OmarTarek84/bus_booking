import { BookingModule } from './booking.module';
import { AppRoutingModule } from './app-routing.module';
import { ErrorInterceptor } from './errorintereptor';
import { AuthGuard } from './guards/auth.guard';
import { BookedGuard } from './guards/booked.guard';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import { CreateRouteComponent } from './create-route/create-route.component';
import { FormsModule } from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { RouteService } from './services/routes.service';
import { AvailableRoutesComponent } from './available-routes/available-routes.component';
import { ErrorComponent } from './error/error.component';
import { SharedModule } from './shared.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    LoginComponent,
    CreateRouteComponent,
    AvailableRoutesComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BookingModule,
    SharedModule
  ],
  providers: [AuthService, RouteService, BookedGuard, AuthGuard,
              {
                provide: HTTP_INTERCEPTORS,
                useClass: ErrorInterceptor,
                multi: true
              }],
  bootstrap: [AppComponent]
})
export class AppModule { }
