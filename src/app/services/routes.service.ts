import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Route } from '../models/route.model';
import { Router } from '@angular/router';

interface ResData {
    data: any;
}

@Injectable({providedIn: 'root'})
export class RouteService {
    searchedRoutes: Route[] = [];
    noRoutes = false;
    booked = false;
    constructor(private http: HttpClient, private router: Router) {}

    getSearchedRoutes() {
        return [...this.searchedRoutes];
    }

    getNoRoutes() {
        return this.noRoutes;
    }

    getIsBooked() {
        return this.booked;
    }

    searchRoute(from: String, to: String, dateFrom: String) {
        this.searchedRoutes = [];
        this.noRoutes = false;
        this.booked = false;
        const requestBody = {
            query: `
                query SearchRoutes($from: String!, $to: String!, $dateFrom: String!) {
                    searchRoutes(from: $from, to: $to, dateFrom: $dateFrom) {
                        _id
                        from
                        to
                        dateFrom
                        depTime
                        busName
                        coachType
                        fare
                    }
                }
            `,
            variables: {
                from: from,
                to: to,
                dateFrom: dateFrom
            }
        };

        return this.http.post('/graphql', requestBody, {
            headers: new HttpHeaders({'Content-Type': 'application/json'})
        })
        .subscribe((resData: ResData) => {
            this.searchedRoutes.push(resData.data.searchRoutes);
            if (resData.data.searchRoutes.length <= 0) {
                this.noRoutes = true;
            }
            this.booked = true;
            this.router.navigate(['/search']);
        });
    }
}
