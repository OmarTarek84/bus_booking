import { SharedModule } from './shared.module';
import { BookedGuard } from './guards/booked.guard';
import { Routes, RouterModule } from '@angular/router';
import { SpinnerComponent } from './UI/spinner/spinner.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { PrintComponent } from './print/print.component';
import { UserBookSeatsComponent } from './user-book-seats/user-book-seats.component';
import { SelectSeatsComponent } from './available-buses/select-seats/select-seats.component';
import { AvailableBusesComponent } from './available-buses/available-buses.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

const routes: Routes = [
    {path: 'search', component: AvailableBusesComponent, canActivate: [BookedGuard]},
    {path: 'book', component: UserBookSeatsComponent, canActivate: [BookedGuard]},
    {path: 'ticket', component: PrintComponent, canActivate: [BookedGuard]},
    {path: 'search/seats/:id', component: SelectSeatsComponent, canActivate: [BookedGuard]},
];

@NgModule({
    declarations: [
        AvailableBusesComponent,
        SelectSeatsComponent,
        UserBookSeatsComponent,
        PrintComponent
    ],
    imports: [
        CommonModule,
        BrowserModule,
        HttpClientModule,
        FormsModule,
        RouterModule.forChild(routes),
        SharedModule
    ],
    exports: [

    ]
})
export class BookingModule {}
