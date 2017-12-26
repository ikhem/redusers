let client = require('../models/redis');

module.exports = {
    searchUsers: (req, res, next) => {
        res.render('searchusers');
    },
    findUsers: (req, res, next) => {
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
    },
    addUser: (req, res, next) => {
        res.render('adduser');
    },
    processUser: (req, res, next) => {
        const { id, first_name, last_name, email, phone } = req.body;

        client.hmset(id, [
            'first_name', first_name,
            'last_name', last_name,
            'email', email,
            'phone', phone
        ], (err, reply) => {
            if(err){
                console.log(err);
            }
            console.log(reply);
            res.redirect('/');
        })
    },
    deleteUser: (req, res, next) => {
        client.del(req.params.id);
        res.redirect('/');
    }
}