const authResolvers = require('./auth');
const routeResolvers = require('./route');
const orderResolvers = require('./order');

module.exports = {
  ...authResolvers,
  ...routeResolvers,
  ...orderResolvers
};
