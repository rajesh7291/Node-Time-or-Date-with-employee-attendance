const express = require("express");
const bodyparser = require('body-parser');
const db = require('./db');

const app=express();
app.use(bodyparser.json());

//register
app.post('/register', (req,res)=>{
    const {name}=req.body;
    const sql=('insert into employees (name) values (?)');
    db.query(sql, [name], (err,result)=>{
        if(err){
            return res.send({message:'db error'});
        }
        res.send({message:'employee registered',id:result.insertId})
    });
});

//attendance
app.post('/mark', (req,res)=>{
    const {employee_id}=req.body;
    const sql=('insert into attendance (employee_id,date_time) values (?,now())');
    db.query(sql, [employee_id], (err,result)=>{
        if(err){
            return res.send('db error');
        }
        res.send({message:'attendance marked'});
    });
});

//view all attendance
app.get('/view', (req,res)=>{
    const sql=`select e.name , a.date_time
        from attendance a
        join employees e on a.employee_id= e.id
        order by a.date_time desc`;

        db.query(sql, (err,result)=>{
           if(err){
            return res.send('db error')
           
           }
           res.send(result)
        })
})

// View attendance for a specific employee
app.get('/view/:id', (req, res) => {
  const employeeId = req.params.id;
  const sql = `
    SELECT e.name, a.date_time
    FROM attendance a
    JOIN employees e ON a.employee_id = e.id
    WHERE e.id = ?
    ORDER BY a.date_time DESC
  `;
  
  db.query(sql, [employeeId], (err, result) => {
    if (err) {
      return res.send({ message: 'DB error' });
    }
    res.send(result);
  });
});


    

app.listen(600,()=>{
    console.log("server run on port 600")
});