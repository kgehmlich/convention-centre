const redis = require('redis')
const client = redis.createClient()

const rooms = [
    {
        number: "1.101",
        floor: 1,
        capacity: 25,
        projector: false
    },
    {
        number: "1.200",
        floor: 1,
        capacity: 300,
        projector: true
    },
    {
        number: "1.220A",
        floor: 1,
        capacity: 50,
        projector: false
    },
    {
        number: "2.111",
        floor: 2,
        capacity: 30,
        projector: true
    },
    {
        number: "2.123",
        floor: 2,
        capacity: 15,
        projector: false
    },
]

const conventions = [
    {
        id: "1",
        name: "Convention 1",
        startDate: new Date("2020-03-02"),
        endDate: new Date("2020-03-06"),
        rooms: ["1.101", "1.200", "1.220A"]
    },
    {
        id: "2",
        name: "Convention 2",
        startDate: new Date("2020-03-07"),
        endDate: new Date("2020-03-07"),
        rooms: ["1.200", "2.111"]
    },
    {
        id: "3",
        name: "Convention 3",
        startDate: new Date("2020-03-12"),
        endDate: new Date("2020-03-14"),
        rooms: ["1.101", "2.123"]
    }
]

exports.seedDb = function () {
    rooms.forEach(addRoom)
    conventions.forEach(addConvention)
}

function addRoom(r) {
    const key = 'room:' + r.number
    client.hmset(
        key,
        'floor', r.floor,
        'capacity', r.capacity,
        'projector', r.projector
    )
    client.sadd('rooms', r.number)

    if (r.projector) {
        client.sadd('projector:rooms', r.number)
    }
}

function addConvention(c) {
    const key = 'convention:' + c.id
    client.hmset(
        key,
        'name', c.name,
        'startDate', c.startDate.toISOString(),
        'endDate', c.endDate.toISOString()
    )

    c.rooms.forEach(roomNum => addConventionRoom(c.id, roomNum))

    client.sadd('conventions', c.id)
}

function addConventionRoom(id, roomNum) {
    const key = 'convention:' + id + ':rooms'
    client.sadd(key, roomNum)
}