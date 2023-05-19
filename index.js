const express = require("express");
const mongoose = require("mongoose");
const { router } = require("./routes/index");

const app = express();
app.use(express.json());
app.use("/", router);

mongoose
  .connect(
    "mongodb+srv://agnes:agnes@cluster0.9pa7oa0.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("Connected to Database"))
  .catch((err) => console.log("ERROR: ", err));

app.listen(4000, () => console.log(`LISTENING ON PORT : ${4000}`));
