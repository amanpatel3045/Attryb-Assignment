const mongoose = require("mongoose");
require("dotenv").config();

const dataBaseConnection = mongoose.connect(process.env.MONGODB_URL);
module.exports = { dataBaseConnection };
