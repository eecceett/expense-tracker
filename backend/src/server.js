//const express = require("express")
import express from "express";
import dotenv from "dotenv";
import { initDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

import transactionsRoute from "./routes/transactionsRoute.js";
import job from "./config/cron.js";

dotenv.config();

const app = express();

//jedino ako smo u produkciji onda start
if (process.env.NODE_ENV === "production") job.start();

//middleware, funkcija koja se pokrece izmedju req i res
//auth check u sustini
app.use(rateLimiter);
app.use(express.json());

const PORT = process.env.PORT;

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

//prefiks za nase rute
app.use("/api/transactions", transactionsRoute);

initDB().then(() => {
  app.listen(5001, () => {
    console.log("Server is up and running on PORT:", PORT);
  });
});

//rate limiting - kontrolisanje koliko cesto neko moze da uradi nesto na sajtu ili aplikaciji
//100 req po useru na svakih 15 minuta
//429 - too many requests
