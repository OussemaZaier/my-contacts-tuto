const mongoose = require("mongoose");

const connectMongo = async () => {
  try {
    const connect = await mongoose.connect(process.env.CONNECTION_STRING);
    console.log(
      `MongoDB connected with \nHost: ${connect.connection.host} \nName: ${connect.connection.name}`
    );
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectMongo;
