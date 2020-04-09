const mysql = require('mysql');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "thenetblogz"
});

con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM thenetblogz", function(err, result) {
        if (err) throw err;
        console.log("Connected to MySQL DB", result);
    })
})
