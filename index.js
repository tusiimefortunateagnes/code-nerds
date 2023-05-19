const express = require("express");
const { default: mongoose } = require("mongoose");
const { router } = require("./routes/index");

const server = express();
server.use("/", router);
const PORT = process.env.PORT || 5000;

mongoose.connect("mongodb+srv://tusiimefortunateagnes:HNlBTqEd1CpY070A@cluster0.9pa7oa0.mongodb.net/?retryWrites=true&w=majority").then(() => console.log("Connected")).catch(err => console.log("ERROR: ", err))

server.listen(PORT, () => console.log(`LISTENING ON PORT : ${PORT}`));
