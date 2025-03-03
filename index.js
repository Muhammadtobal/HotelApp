import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import passport from "../Hotel-project/middlewares/passport.js";
import session from "express-session";
import errorHandler from "./middlewares/errorHandler.js";
import router from "./routes/allRoutes.js";
import setupSwagger from "../Hotel-project/utils/swagger.js"

dotenv.config();

const app = express();
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.NODE_ENV === "production" },
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.use(morgan("tiny"));
app.use(express.json());
app.use(cors());
setupSwagger(app);
app.use("/api", router);

const Port = process.env.PORT || 8001;
app.listen(Port, () => {
  console.log(`Server Running on ${Port}`);
  console.log( `📄 Swagger docs available at http://localhost:${Port}/api-docs`)
  console.log("Connecting DB");
});

app.use(errorHandler);
