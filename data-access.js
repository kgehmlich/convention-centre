const conventions = [
    {
        id: 1,
        name: "Convnetion 1",
        startDate: new Date("2020-03-02"),
        endDate: new Date("2020-03-06")
    },
    {
        id: 2,
        name: "Convnetion 2",
        startDate: new Date("2020-03-07"),
        endDate: new Date("2020-03-07")
    },
    {
        id: 3,
        name: "Convnetion 3",
        startDate: new Date("2020-03-12"),
        endDate: new Date("2020-03-14")
    }
]


exports.getConventions = function (callback) {
    callback(conventions)
}