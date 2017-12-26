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
    }
}