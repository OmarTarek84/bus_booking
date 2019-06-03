const Order = require('../models/order');
const Route = require('../models/route');
const io = require('../../socket.js');
const nodemailer = require('nodemailer');
const sendGridTransport = require('nodemailer-sendgrid-transport');
const transporter = nodemailer.createTransport(sendGridTransport({
  auth: {
    api_key: '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'
  }
}));

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
                        const output = `
                        <div class="ticket-parent" style="  width: 80%;
                        margin-left: auto;
                        margin-right: auto;
                        margin-top: 60px;
                        @media screen and (max-width: 500px) {
                          width: 95%;
                        }">
                        <div class="ticket-parent__ticket" style="background-color: white;
                        padding: 20px;
                        border-radius: 10px;
                        position: relative;
                        box-shadow: 2px 2px 7px 1px;">
                          <h5 style="text-align: center">Online Reservation</h5>
                          <div class="ticket-parent__ticket__route" style="display: flex;
                          justify-content: space-between;
                          background-color: rgb(80, 80, 248);
                          color: white;
                          font-weight: bold;
                          padding: 10px;
                          margin-top: 30px;">
                            <p style="flex: 0 0 30%;
                            text-align: center;
                            font-size: 15px;">{{from}} {{to}}</p>
                            <p style="flex: 0 0 30%;
                            text-align: center;
                            font-size: 15px;">{{dateFrom}}</p>
                            <p style="flex: 0 0 30%;
                            text-align: center;
                            font-size: 15px;">busTicket.com</p>
                          </div>
                          <div class="ticket-parent__ticket__passenger">
                              <table style="border: 1px solid grey;
                              margin-top: 20px;
                              width: 100%;
                              height: 60px;">
                                <thead>
                                  <tr>
                                    <th>Passenger Details</th>
                                    <th>Ticket ID</th>
                                    <th>Seat No</th>
                                    <th>Total Fare</th>
                                  </tr>
                                </thead>
                                <tbody style="margin-top: 10px;">
                                  <tr>
                                    <td>
                                      <p>{{fullName}}</p>
                                      <p class="userEmail">{{email}}</p>
                                    </td>
                                    <td>{{orderId}}</td>
                                    <td><span *ngFor="let seat of seatNumbers">{{seat.seatNumber}} </span></td>
                                    <td>total Price</td>
                                  </tr>
                                </tbody>
                              </table>
                          </div>
                          <div class="ticket-parent__ticket__bus">
                            <table style="border: 1px solid grey;
                            margin-top: 20px;
                            width: 100%;
                            height: 60px;">
                              <thead>
                                <tr>
                                  <th>Bus Name</th>
                                  <th>Reporting Time</th>
                                  <th>Departure Time</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>{{busName}}</td>
                                  <td>Before 30 minutes</td>
                                  <td>{{depTime}}</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                        <p class="counter" style="color: red;">**Please Bring the ticket ID to the counter**</p>
                      </div>
                        `;
                        transporter.sendMail({
                          to: email,
                          from: 'omarTarek@bus_ticket.com',
                          subject: 'Ticket Booking Complete!',
                          html: output
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