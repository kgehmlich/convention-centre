const redis = require('redis')
const client = redis.createClient()

const conventions = [
    {
        id: "1",
        name: "Convention 1",
        startDate: new Date("2020-03-02"),
        endDate: new Date("2020-03-06")
    },
    {
        id: "2",
        name: "Convention 2",
        startDate: new Date("2020-03-07"),
        endDate: new Date("2020-03-07")
    },
    {
        id: "3",
        name: "Convention 3",
        startDate: new Date("2020-03-12"),
        endDate: new Date("2020-03-14")
    }
]

exports.seedDb = function () {
    conventions.forEach(addConvention)
}

function addConvention(c) {
    const key = 'convention:' + c.id
    client.hmset(
        key,
        'name', c.name,
        'startDate', c.startDate.toISOString(),
        'endDate', c.endDate.toISOString()
    )
    client.sadd('conventions', c.id)
}