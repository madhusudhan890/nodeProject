const { Router } = require("express");
const Service = require("../services/services");
const route = Router();

route.post("/signup", Service.signUp);
route.get(
  "/data",
  Service.fetchData // fetching data without using cache / index values
);

route.get("/login-data", Service.dataWithCredentials);

route.get("/cache-data", Service.dataWithCache);

module.exports = route;
