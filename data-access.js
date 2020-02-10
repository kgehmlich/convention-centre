const redis = require('redis')
const client = redis.createClient()

exports.getRooms = function (callback) {
    let rooms = []
    client.smembers('rooms', (err, roomNums) => {
        let itemsReceived = 0
        roomNums.forEach(roomNum => {
            client.hgetall('room:' + roomNum, (err, room) => {
                room.number = roomNum
                rooms.push(room)
                if (++itemsReceived >= roomNums.length) {
                    callback(rooms)
                }
            })
        })
    })
}

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