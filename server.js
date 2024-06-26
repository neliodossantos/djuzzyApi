// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { Booknow } = require('./models/BookNow');
const { Contact } = require('./models/Contact');


const app = express();
app.use(bodyParser.json());
mongoose.connect('mongodb+srv://neliodossantos15:gBEf9L8Mu8gRprvn@cluster0.c0v1j0z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erro na conexão ao MongoDB:'));
db.once('open', () => {
  console.log('Conectado ao MongoDB');
});



// Rota básica
app.get('/booknow', async (req, res) => {
  try {
    const bookings = await Booknow.find();
    res.json(bookings);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});

// Rota básica
app.post('/booknow', async (req, res) => {
    const newBooking = new Booknow(req.body);
    try {
        const savedBooking = await newBooking.save();
        res.status(201).json(savedBooking);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Rota básica
app.get('/contact', async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});

// Rota básica
app.post('/contact', async (req, res) => {
    const newContact = new Booknow(req.body);
    try {
        const savedBooking = await newContact.save();
        res.status(201).json(savedBooking);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});



// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
