const express = require("express");
const { router } = require("./routes/index");

const server = express();
server.use("/", router);
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`LISTENING ON PORT : ${PORT}`));
