const DataLoader = require('dataloader');
const User = require('../models/user');
const Route = require('../models/route');
const Order = require('../models/order');

const transformRoutes = (route) => {
    return {
        ...route._doc,
        _id: route._doc._id.toString(),
        dateFrom: new Date(route._doc.dateFrom).toLocaleDateString(),
        orders: () => orderLoader.loadMany(route._doc.orders)
    };
};

const transformOrders = (order) => {
    return {
        ...order._doc,
        _id: order._doc._id.toString(),
        createdAt: new Date(order._doc.createdAt).toLocaleDateString(),
        updatedAt: new Date(order._doc.createdAt).toLocaleDateString(),
        routeId: singleRoute.bind(this, order._doc.routeId)
    };
};

const transformUsers = (user) => {
    return {
        ...user._doc,
        _id: user._doc._id.toString(),
        password: null,
        createdRoutes: () => routeLoader.loadMany(user._doc.createdRoutes)
    };
};

const userLoader = new DataLoader(userIds => {
    return User.find({_id: {$in: userIds}});
});

const routeLoader = new DataLoader(routeIds => {
    return allRoutes(routeIds);
});

const orderLoader = new DataLoader(orderIds => {
    return allOrders(orderIds);
});

const allUsers = userIds => {
    return User.find({_id: {$in: userIds}}).then(users => {
        return users.map(user => {
            return transformUsers(user);
        });
    });
};

const allRoutes = routeIds => {
    return Route.find({_id: {$in: routeIds}}).then(routes => {
        return routes.map(route => {
            return transformRoutes(route);
        });
    });
};

const allOrders = orderIds => {
    return Order.find({_id: {$in: orderIds}}).then(orders => {
        return orders.map(order => {
            return transformOrders(order);
        });
    });
};

const singleRoute = routeId => {
    return routeLoader.load(routeId.toString()).then(route => {
        return route;
    });
};

const singleOrder = orderId => {
    return orderLoader.load(orderId.toString()).then(order => {
        return order;
    });
};

exports.transformRoutes = transformRoutes;
exports.transformUsers = transformUsers;
exports.transformOrders = transformOrders;