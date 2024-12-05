const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Obsługa CORS
app.options('*', cors()); // Obsługa zapytań preflight

// Połączenie z MongoDB
mongoose.connect('mongodb://localhost:27017/pwa-app')
  .then(() => console.log('Połączono z MongoDB'))
  .catch(err => console.log('Błąd połączenia z MongoDB:', err));

// Schemat użytkownika
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

// Endpoint do logowania
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });

  if (user) {
    res.json({ success: true, message: 'Zalogowano pomyślnie' });
  } else {
    res.status(401).json({ success: false, message: 'Nieprawidłowe dane logowania' });
  }
});

// Uruchomienie serwera
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Serwer działa na porcie ${PORT}`);
});
