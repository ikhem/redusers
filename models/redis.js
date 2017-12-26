const redis = require('redis');

// Create Redis Client
let client = redis.createClient();

client.on('connect', () => {
    console.log('Connected to Redis');
});

module.exports = client;