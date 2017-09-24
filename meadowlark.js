const express = require('express');
const app = express();
const handlebars = require('express-handlebars')
  .create({ 
    defaultLayout: 'main',
    helpers: {
      section: function(name, options){
        if(!this._sections) this._sections = {};
        this._sections[name] = options.fn(this);
        return null;
      }
    }
  });

const company = require('./lib/companies.js');

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
  res.locals.showTests = app.get('env') !== 'production' &&
    req.query.test === '1';
    next();
});

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/about', (req, res) => {
  res.render('about', { 
    company: company.getCompany(),
    pageTestScript: '/qa/tests-about.js'
  });
});

app.get('/tours/hood-river', (req, res) => {
  res.render('tours/hood-river');
});

app.get('/tours/oregon-coast', (req, res) => {
	res.render('tours/oregon-coast');
});

app.get('/tours/request-group-rate', (req, res) => {
  res.render('tours/request-group-rate');
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