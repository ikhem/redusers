const express        = require('express');
const exphbs         = require('express-handlebars');
const path           = require('path');
const bodyParser     = require('body-parser');
const methodOverride = require('method-override');
const redis          = require('redis');
const port           = process.env.PORT || 3000;

// Create Redis Client
let client = redis.createClient();

client.on('connect', () => {
    console.log('Connected to Redis');
});

const app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(methodOverride('_method'));

app.get('/', (req, res, next) => {
    res.render('searchusers')
});

app.post('/user/search', (req, res, next) => {
    let id = req.body.id;

    client.hgetall(id, (err, obj) => {
        if(!obj){
            res.render('searchusers', {
                error: 'User does not exist'
            });
        } else {
            obj.id = id;
            res.render('details', {
                user: obj
            });
        }
    });
});

app.listen(port, () => {
    console.log(`Server listening on ${port}.`)
});