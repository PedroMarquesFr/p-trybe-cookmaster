require('dotenv').config();

const express = require('express');
const router = require('./routes');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log(`- ${req.method} ${req.path}`);
  /* Termina a operação no middleware e chama o próximo middleware ou rota */
  next();
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(router);

app.use((err, req, res, next) => {
  res.status(500).send({ error: `${err} ou algum erro interno` });
  next();
});

app.listen(process.env.PORT, () => console.log(`listen port: ${process.env.PORT}`));
