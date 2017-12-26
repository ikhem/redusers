const express        = require('express');
const exphbs         = require('express-handlebars');
const path           = require('path');
const bodyParser     = require('body-parser');
const methodOverride = require('method-override');
const port           = process.env.PORT || 3000;

// Bring in routes
const routes = require('./routes/index');

const app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(methodOverride('_method'));

// Use routes
app.use('/', routes);

app.listen(port, () => {
    console.log(`Server listening on ${port}.`)
});