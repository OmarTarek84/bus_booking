const Route = require('../models/route');
const User = require('../models/user.js');
const {transformRoutes} = require('./merge');

module.exports = {

    createRoute: (args, req) => {
        const from = args.routeInput.from;
        const to = args.routeInput.to;
        const dateFrom = new Date(args.routeInput.dateFrom).toLocaleDateString();
        const depTime = args.routeInput.depTime;
        const coachType = args.routeInput.coachType;
        const busName = args.routeInput.busName;
        const fare = +args.routeInput.fare;

        if (!req.isAuth) {
            throw new Error('Not Authorized');
        }

        const route = new Route({
            from: from,
            to: to,
            dateFrom: dateFrom,
            seats: [
                {
                    seatNumber: 'A1',
                    booked: false
                },
                {
                    seatNumber: 'A2',
                    booked: false
                },
                {
                    seatNumber: 'A3',
                    booked: false
                },
                {
                    seatNumber: 'A4',
                    booked: false
                },
                {
                    seatNumber: 'B1',
                    booked: false
                },
                {
                    seatNumber: 'B2',
                    booked: false
                },
                {
                    seatNumber: 'B3',
                    booked: false
                },
                {
                    seatNumber: 'B4',
                    booked: false
                },
                {
                    seatNumber: 'C1',
                    booked: false
                },
                {
                    seatNumber: 'C2',
                    booked: false
                },
                {
                    seatNumber: 'C3',
                    booked: false
                },
                {
                    seatNumber: 'C4',
                    booked: false
                },
                {
                    seatNumber: 'D1',
                    booked: false
                },
                {
                    seatNumber: 'D2',
                    booked: false
                },
                {
                    seatNumber: 'D3',
                    booked: false
                },
                {
                    seatNumber: 'D4',
                    booked: false
                }
            ],
            depTime: depTime,
            coachType: coachType,
            busName: busName,
            fare: fare,
            orders: []
        });
        return route.save().then(result => {
            return User.findById(req.userId).then(user => {
                user.createdRoutes.push(result);
                return user.save().then(res => {
                    return transformRoutes(res);
                });
            })
            .catch(err => {
                console.log(err);
            });
        });
    },

    searchRoutes: (args, req) => {
        const from = args.from;
        const to = args.to;
        const dateFrom = new Date(args.dateFrom).toLocaleDateString();

        return Route.find({from: from, to: to, dateFrom: dateFrom}).then(routes => {
            return routes.map(route => {
                return transformRoutes(route);
            });
        })
        .catch(err => {
            console.log(err);
        });
    },

    searchRoute(args, req) {
        return Route.findById(args._id).then(route => {
            return transformRoutes(route);
        })
        .catch(err => {
            console.log(err);
        });
    },

    searchAdminRoute: (args, req) => {
        const dateFrom = new Date(args.dateFrom).toLocaleDateString();
        const depTime = args.depTime;
        const from = args.from;
        const to = args.to;

        if (!req.isAuth) {
            throw new Error('Not Authorized');
        }

        return Route.find({dateFrom: dateFrom, depTime: depTime, from: from, to: to}).then(routes => {
            return routes.map(route => {
                return transformRoutes(route);
            });
        })
        .catch(err => {
            console.log(err);
        });
    }

};