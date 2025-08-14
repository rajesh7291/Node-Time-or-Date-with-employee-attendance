const mysql = require('mysql2');

const db=mysql.createConnection({
  host:"localhost",
  user:"root",
  password:"Rajesh@7291",
  database:"attendance_db"

});
db.connect((err)=>{
  if(err) throw err;

console.log("mysql connected");
})

module.exports=db;