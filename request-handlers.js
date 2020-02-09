const dataAccess = require('./data-access')

exports.getConventions = function (req, res) {
    dataAccess.getConventions(conventions => {
        const items = conventions.map(mapConventionToResponse)
        const body = { items }
        res.statusCode = 200
        res.send(body)
    })
}

function mapConventionToResponse(convention) {
    return {
        id: convention.id.toString(),
        name: convention.name,
        startDate: convention.startDate,
        endDate: convention.endDate
    }
}