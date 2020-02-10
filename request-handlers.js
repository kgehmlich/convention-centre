const dataAccess = require('./data-access')

exports.getConventions = function (req, res) {
    dataAccess.getConventions(results => {
        const items = results.map(mapConventionToResponse)
        const body = { items }
        res.statusCode = 200
        res.send(body)
    })
}

exports.getConventionById = function (req, res) {
    const id = req.params.id
    dataAccess.getConventionById(id, result => {
        if (result === null) {
            res.statusCode = 404
            res.send()
        } else {
            res.statusCode = 200
            const body = mapConventionToResponse(result)
            res.send(body)
        }
    })
}

exports.getRooms = function (req, res) {
    if (req.query.projector) {
        const hasProjector = req.query.projector === 'true'
        dataAccess.getFilteredRooms(hasProjector, results => sendRoomsResponse(results, res))
    } else {
        dataAccess.getRooms(results => sendRoomsResponse(results, res))
    }
}

function sendRoomsResponse(rooms, res) {
    const items = rooms.map(mapRoomToResponse)
    const body = { items }
    res.statusCode = 200
    res.send(body)
}

function mapRoomToResponse(room) {
    return {
        number: room.number,
        floor: parseInt(room.floor),
        capacity: parseInt(room.capacity),
        projector: room.projector === 'true'
    }
}

function mapConventionToResponse(convention) {
    return {
        id: convention.id.toString(),
        name: convention.name,
        startDate: convention.startDate,
        endDate: convention.endDate
    }
}