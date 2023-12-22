const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

router.get("/teste", (req, res) => {
  res.send("ESTA É UMA ROTA DE TESTE DA NOSSA APLICAÇÃO!");
});

//rota pa vizualizar todos os contactos
router.get("/list", (req, res) => {
  Contact.find()
    .sort({ name: 1 })
    .lean()
    .then(function (contacts) {
      res.status(200).json(contacts);
    })
    .catch((err) => console.log(err));
});
 
// add contacto via post
router.post("/add", (req, res) => {
  /*let { name, number, email } = req.body;*/

  var erros = [];

  if (
    !req.body.name ||
    typeof req.body.name == undefined ||
    req.body.name == null
  ) {
    res.send({ message: "Insira um nome válido!" });
  }

  if (
    !req.body.number ||
    typeof req.body.number == undefined ||
    req.body.number == null
  ) {
    res.send({ message: "Insira um numero válido!" });
  }

  if (req.body.number.length < 9) {
    return res.send({ message: "O numero tem que ter ao menos 9 caracteres!" });
  }

  if (erros.length > 0) {
    res.send(message, erros);
  } else {
    Contact.create({
      name: req.body.name,
      number: req.body.number,
      email: req.body.email,
    })
      .then(() => res.send({ message: "Contacto adicionado com sucesso!" }))
      .catch(function (erro) {
        res.send("Houve um erro " + erro);
      });
  }
});

//rota para ver apenas o contacto selecionado
router.get("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const contact = await Contact.findOne({ _id: id });

    if (!contact) {
      res.status(422).json({ message: "O Contacto não foi encontrado!" });
      return;
    }

    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

//rota para apagar apenas o contacto selecionado
router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  const contact = await Contact.findOne({ _id: id });

  if (!contact) {
    res.status(422).json({ message: "O Contacto não foi encontrado!" });
    return;
  }
  try {
    await Contact.deleteOne({ _id: id });

    res.status(200).json({ message: "Contacto removido com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

//rota para atualizar um contacto selecionado
router.patch("/:id", async (req, res) => {
  const id = req.params.id;

  const { name, number, email } = req.body;

  const contact = {
    name,
    number,
    email,
  };

  try {
    const updatedContact = await Contact.updateOne({ _id: id }, contact);
    if (updatedContact.matchedCount === 0) {
      res.status(422).json({ message: "O Contacto não foi encontrado!" });
      return;
    }

    res.send({ message: "Contacto atualizado com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

module.exports = router;
