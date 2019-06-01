const Order = require('../models/order');
const Route = require('../models/route');
const io = require('../../socket.js');

const {transformOrders} = require('./merge');
module.exports = {

    createOrder: (args, req) => {
        const fullName = args.orderInput.fullName;
        const email = args.orderInput.email;
        const mobileNumber = args.orderInput.mobileNumber;
        const totalPrice = +args.orderInput.totalPrice;
        const reservedSeats = args.orderInput.reservedSeats;
        const routeId = args.orderInput.routeId;

        const newOrder = new Order({
            fullName: fullName,
            mobileNumber: mobileNumber,
            email: email,
            totalPrice: totalPrice,
            reservedSeats: reservedSeats,
            routeId: routeId
        });
        return newOrder.save().then(result => {
            return Route.findById(routeId).then(route => {
                let foundRoute = route;
                reservedSeats.map(seat => {
                    const indexes = route.seats.findIndex(p => {
                        return p.seatNumber === seat.seatNumber;
                    });
                    foundRoute.seats[indexes].booked = true;
                });
                foundRoute.orders.push(result);
                return foundRoute.save()
                .then(res => {
                    return Route.updateOne({_id: routeId}, {
                        $set: {seats: [...res.seats]}
                    })
                    .then(re => {
                        const bookedSeats = res.seats.filter(seat => {
                            return seat.booked == true;
                        });
                        const fSeats = bookedSeats.map(s => {
                            return s.seatNumber;
                        });
                        io.getIO().emit('seatsOrdered', {
                            seats: fSeats
                        });
                        return transformOrders(result);
                    });
                });
            })
            .catch(err => {
                console.log(err);
            });
        })
        .catch(err => {
            console.log(err);
        });
    }

};