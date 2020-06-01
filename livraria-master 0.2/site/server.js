const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const uri = 'mongodb+srv://gabrielfas:011235813@cluster0-vmxrj.gcp.mongodb.net/test?retryWrites=true&w=majority';

mongoClient.connect(uri, {
    useUnifiedTopology: true, useNewUrlParser: true
    })
    .then(client => {
    console.log('Conectado ao banco de dados');
    //Constante do banco de dados e coleções
    const db = client.db('e-stantedb');
    const usersCollection = db.collection('usuarios');
    const booksCollection = db.collection('livros');
    const salesCollection = db.collection('vendas');
    
    app.set('view engine', 'ejs');
    app.use(bodyParser.urlencoded({ extended: true}));
    app.use('/static', express.static('public'));
    app.listen(8000, function(){
        console.log('Listening on 3000')
        /*usersCollection.find({email:"gabrielferreira1d2015@gmail.com"}).project({email:1, _id: 0}).toArray(function(err, result){
            if (err) throw err;
            var x = result;
            console.log(x);
        })*/
    });

    app.get('/', (req, res) => {
        res.sendFile(__dirname +'/index.html')
    });
    app.get('/registration', (req, res) => {
        res.sendFile(__dirname +'/registration.html')
    });
    app.get('/login', (req, res) => {
        res.sendFile(__dirname +'/login.html')
    });
    app.get('/index', (req, res) => {
        res.sendFile(__dirname +'/index.html')  
    });

    //Insere novo usuário
    app.post('/novoUsuario', (req, res) => {
        usersCollection.insertOne(req.body)
        .then(result => {
            res.redirect('/login');
        })
        .catch(error => console.error(error))
    });
}).catch(console.error);
