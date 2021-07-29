const express = require('express')
const cors = require('cors')
const app = express()
const mysql = require('mysql')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const saltRounds = 10


const port = 8000;


const db = mysql.createConnection({ // after lunch create database
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'users_schema'
});

app.use(express.json()) // lets us parse info from client in req.body
app.use(cors({
    origin: "http://localhost:3000",
    method: ['GET', 'POST'],
    credentials : true
}))
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: true}))

app.use(
    session({
        key:'userId',
        secret:"keep it secret keep it safe",
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 60 * 60 * 24 * 1000,
        }
    }))

app.get('/api/get', (req,res) => {
    const sqlSelect = "SELECT * FROM movie_reviews;"

    db.query(sqlSelect,
        (error, response) =>{
            if (error) {
                res.send ({ error: error})
            }
            if (response.length > 0){
                bcrypt.compare(password, response[0].password, (err, res) => {
                    if (response){
                        req.session.user = result
                        res.send(result);
                    } else {
                        res.send({ message: "Wrong username/password combination!"})
                    }
                });
            }else {
                res.send({ message: "User deosn't exist!" })
            }
    })
});

app.post('/api/users', (req,res) => {
    console.log(req.body)
    const {firstName,lastName,email,password} = req.body
    const administrator_level = 10


    const sqlInsert = "INSERT INTO users(firstName,lastName,email,password,administrator_level) VALUES(?,?,?,?,?);"
    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err){
            console.log(err)
        }
        db.query(
            sqlInsert,
            [firstName,lastName,email,hash,administrator_level],
            (err, result) => {
            console.log(result)
            console.log(err)
        })
    })
})


// how to prevent sql injections
// validations which help prevent sql injections
// modularizing
// using req.body



app.listen(port, () => {
    console.log(`app is running on port ${port}`)
});