const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

mongoose
  .connect(`${process.env.DB_URL}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Connected To Db");
  })
  .catch((error) => {
    console.log(error);
  });

exports.module = mongoose;
