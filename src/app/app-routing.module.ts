import { AuthGuard } from './guards/auth.guard';
import { AvailableRoutesComponent } from './available-routes/available-routes.component';
import { HomeComponent } from './home/home.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { CreateRouteComponent } from './create-route/create-route.component';

const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'create-route', component: CreateRouteComponent, canActivate: [AuthGuard]},
    {path: 'admin-routes', component: AvailableRoutesComponent, canActivate: [AuthGuard]}
  ];

@NgModule({
    declarations: [],
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})

export class AppRoutingModule {}
