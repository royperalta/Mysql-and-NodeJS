const mysql = require('mysql');
const express = require('express');

const app = express();

//Creacte connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodemysql'
});

//Connet
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Mysql Connected...')
});

//CREAT DB
app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE nodemysql2';
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Database created...');
    })
})
//Create Table with
app.get('/createpoststable', (req, res) => {
    let sql = 'CREATE TABLE posts (id int AUTO_INCREMENT,title VARCHAR(255), body VARCHAR(255), PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Table created successfully');
    })
})

// INSERT POST 1
app.get('/addpost1', (req, res) => {
    let post = { title: 'Post One', body: 'This is post number one' };
    let sql = 'INSERT INTO posts SET ?';
    db.query(sql, post, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Post 1 added...');
    });

})

// INSERT POST 1
app.get('/addpost2', (req, res) => {
    let post = { title: 'Post One', body: 'This is post number Two' };
    let sql = 'INSERT INTO posts SET ?';
    let query = db.query(sql, post, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Post 2 added...');
    });

})


// Select posts
app.get('/getposts', (req, res) => {
    let sql = 'SELECT * FROM posts';
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('succesfuly');
    });

})


// Select posts single
app.get('/getposts/:id', (req, res) => {
    let sql = `SELECT * FROM posts WHERE id =${req.params.id}`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Encontrado..')
    })
})

//UPDATE POSTA ONE
app.get('/update/:id', (req, res) => {
    let newTitle = 'Post One';
    let sql = `UPDATE posts SET title='${newTitle}' WHERE id=${req.params.id}`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Updated..')
    })
})

//DELETE POST request
app.get('/delete/:id',(req, res) => {
    let sql = `DELETE FROM posts WHERE id =${req.params.id}`;
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Eliminado..')
    })
})

app.listen('3000', () => {
    console.log('server started on port 3000');
})
