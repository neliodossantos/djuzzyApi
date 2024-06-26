// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { Booknow } = require('./models/BookNow');
const { Contact } = require('./models/Contact');
const { User } = require('./models/User');

const cors = require('cors');


const app = express();
app.use(bodyParser.json());
mongoose.connect('mongodb+srv://neliodossantos15:gBEf9L8Mu8gRprvn@cluster0.c0v1j0z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});


// Configurar opções do CORS para permitir qualquer origem
const corsOptions = {
  origin: '*', // Permitir qualquer origem
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Se você está usando cookies ou autenticação
};

// Aplicar o middleware CORS com as opções configuradas
app.use(cors(corsOptions));


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erro na conexão ao MongoDB:'));
db.once('open', () => {
  console.log('Conectado ao MongoDB');
});


// Endpoint de registro
app.post('/register', async (req, res) => {
    const { username, password , email } = req.body;

    // Verifique se o usuário já existe
    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({ message: 'Usuário já existe' });
    }

    // Crie um novo usuário
    const newUser = new User({
        username,
        email,
        password,
        
    });

    await newUser.save();
    res.status(201).json({ message: 'Usuário registrado com sucesso' });
});

// Endpoint de login
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Verifique se o usuário existe
    const user = await User.findOne({ username });
    if (!user) {
        return res.status(400).json({ message: 'Usuário não encontrado' });
    }

    // Verifique a senha
    if (user.password !== password) {
        return res.status(400).json({ message: 'Senha incorreta' });
    }

    res.status(200).json({ message: 'Login bem-sucedido' });
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
    const newContact = new Contact(req.body);
    try {
        const savedContact = await newContact.save();
        res.status(201).json(savedContact);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});



// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
