const express = require('express');
const app = express();
const handlebars = require('express-handlebars')
  .create({ defaultLayout: 'main'});

const companies = [
  'apple',
  'youtube',
  'google',
  'yandex',
  'paypal'
];

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/about', (req, res) => {
  let company = companies[Math.floor(Math.random() * companies.length)];
  res.render('about', { company });
});

app.use((req,res, next) => {
  res.status(404);
  res.render('404');
});

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), () => {
  console.log(`Server is running on port - ${app.get('port')}`);
});