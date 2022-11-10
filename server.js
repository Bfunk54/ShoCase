// Global Modules
const path = require('path');

// Third Party Modules
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Local Modules
const routes = require('./controllers');
const helpers = require('./utils/helpers');
const sequelize = require('./config/config');

const app = express();
const PORT = process.env.PORT || 3001;
const hbs = exphbs.create({ helpers });

const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 60 * 60 * 1000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

// Sets handlebars as html to be served
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Defines all folders to be served
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening at Heroku or on port ${PORT} at http://localhost:${PORT}`));
});