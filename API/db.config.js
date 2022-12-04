const mysql = require('mysql')

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'products',
});

connection.connect((err) => {
    if (!err) {
      console.log("Database is connected ... \n\n");  
    } else {
      console.log("Error connecting database ... \n\n");  
    }
})

module.exports = connection