const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

const Contact = require("./models/Contact");

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send(`
  <div
      style="
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      "
    >
      <h1 style="font-family: Helvetica">Bem Vindo ao projecto Contacts!</h1>
      <br />
      <h3 
      style="font-family: Helvetica;
      color: blue;
      ">
        ESTA É A ROTA PRINCIPAL DA APLICAÇÃO!
      </h3>
      <br />
      <p>CLOUDSTRIKE Technologies Inc.</p>
      <p>Enoch Silva © 2023 - All Rights Reserved</p>
    </div>
  `);
});

app.use("/contacts", require("./routes/contacts"));

app.use(express.json());

const PORT = process.env.PORT || 3000;

const DB_USER = "enochsilva69";
const DB_PASSWORD = encodeURIComponent("NOeKbNuqocZZMFer");

mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@enoch-silva-first-clust.n5xq60u.mongodb.net/?retryWrites=true&w=majority` ||
      "mongodb://127.0.0.1/contactos"
  )
  .then(() => {
    console.log("Conectamos ao MongoDB");
    app.listen(PORT, function () {
      console.log("servidor rodando em http://localhost:3000");
    });
  })
  .catch((err) => console.log(err));
