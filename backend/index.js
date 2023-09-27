const express = require('express');
const bodyParser = require('body-parser');
const connect = require("./model/connection")
const cors = require('cors');
// import cors from 'cors'
const app = express()
const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
app.get('/books', (req,res) => {
    const q = 'select * from book';
    connect.query(q, (err,data) => {
        if (err) {
            console.log(res.json(err))
            res.send(err)
        } else {
            
            res.send(data)
        }
    })
})

app.use(express.json())
//to add new book

app.post('/books/add', (req,res) => {
    const q  = 'insert into book (title, description, cover, price) values(?)';
    const values = [
        req.body.title,
        req.body.description,
        req.body.cover,
        req.body.price,
    ]

    connect.query(q,[values] ,(err, data) => {
        err ?  console.log(err) : console.log("Book has been created succsessfuly!"); res.send("ok!!")
    })
})

//to delete specific book
app.delete('/books/delete/:id', (req,res) => {
    const bookid = req.params.id
    const q = 'delete from book where id = ?';
    connect.query(q, bookid, (err, data) => {
        err? console.log(err) : console.log("delete Sucsseful!"); res.send(data)
    })
})

//to edit info of book
app.put('/books/edit/:id', (req,res) => {
    const bookid = req.params.id;
    const q = 'update book set title = ? , description = ? , price = ? , cover = ? where id = ?';
    const values = [
        req.body.title,
        req.body.description,
        req.body.price,
        req.body.cover,
    ]

    connect.query(q, [...values, bookid] , (err, data ) => {
        err ?  console.log(err) : console.log("Book has been Updated succsessfuly!"); res.send("ok!!")
    })
})

app.listen(8800, () => {
    console.log("server open in port 8800");
})