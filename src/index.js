require("dotenv").config();

const express = require("express");
var cors = require("cors");
const rescue = require("express-rescue");
const middlewares = require("./middlewares");

const router = require("./routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use(middlewares.log);

// não remova esse endpoint, e para o avaliador funcionar
app.get("/", (request, response) => {
  response.send();
});

app.use(rescue(router));

app.use(middlewares.err);

app.listen(process.env.PORT, () =>
  console.log(`listen port: ${process.env.PORT}`)
);
