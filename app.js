require("dotenv").config({ path: `${process.env.NODE_ENV}.env` });

// libraries imports
const express = require('express');
const path = require("path");
const bodyParser = require("body-parser");

// project imports
const corsConfig = require("./settings/cors_config")
const db_connection = require('./settings/database/db_connection')
const routes = require('./routes/routes');


const app = express();
// transfer request body to json





app.use(bodyParser.json());
// to return static files or image
app.use(express.static(path.join(__dirname, "public")));

// cors Config
app.use(corsConfig);

// all apis route
routes(app);

db_connection
  .sync({ alter: true, logging: console.log })
  // .sync({ force: true, logging: console.log })
  .then(() => {

// The error handler must be before any other error middleware and after all controllers
    app.listen(process.env.PORT, () => {
      console.log(
        `EX1 Backend app listening on port ${process.env.PORT}`
      );
    });
  })
  .catch((error) => {
    console.error("Unable to connect to the database:\n", error);
  });
