const redis = require('redis')
const client = redis.createClient()


exports.getConventions = function (callback) {
    let conventions = []
    client.smembers('conventions', (err, ids) => {
        let itemsReceived = 0
        ids.forEach(id => {
            client.hgetall('convention:' + id, (err, convention) => {
                convention.id = id
                conventions.push(convention)
                if (++itemsReceived >= ids.length) {
                    callback(conventions)
                }
            })
        })
    })
}

exports.getConventionById = function (id, callback) {
    if (client.sismember('conventions', id)) {
        client.hgetall('convention:' + id, (err, convention) => {
            convention.id = id
            callback(convention)
        })
    }
}