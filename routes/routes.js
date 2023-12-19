const { Router } = require("express");
const Service = require("../services/services");
const route = Router();

route.post("/signup", Service.signUp);
route.get(
  "/",
  Service.fetchData // fetching data without using cache / index values
);

// route.post("/data", Service.dataWithCredentials);

// route.get("/data", Service.dataWithCache);

module.exports = route;
