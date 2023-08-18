const express = require("express");
const env = require("dotenv").config();

const connectMongo = require("./config/connectMongo");

const contactsRoutes = require("./routes/contactsRoutes");
const usersRoutes = require("./routes/usersRoutes");
const errorHandler = require("./middleware/errorHandler");

connectMongo();

const app = express();

app.use(express.json());

app.use("/api/contacts", contactsRoutes);
app.use("/api/users", usersRoutes);

app.use(errorHandler);

app.listen(process.env.PORT ?? 5000);
