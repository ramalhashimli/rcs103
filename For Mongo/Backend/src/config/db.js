const mongoose = require("mongoose");

mongoose
  .connect(
    `mongodb+srv://ramalrh:Salam123@rcs103.zrkecir.mongodb.net/?retryWrites=true&w=majority&appName=RCS103`
  )
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err);
  });
