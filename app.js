const express = require("express");
const env = require("dotenv").config();

const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(express.json());

app.use("/api/contacts", contactsRoutes);
app.use("/api/users", usersRoutes);

app.use(errorHandler);

app.listen(process.env.PORT ?? 5000);
