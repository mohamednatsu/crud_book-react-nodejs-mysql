const mysql = require('mysql2');

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "books"
})

db.connect((err)=> {
    if (err) {
        console.log(err)
    } else {
        console.log("succseful connect to db")
    }
})

module.exports = db;