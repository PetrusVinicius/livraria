const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoClient = require('mongodb').MongoClient;

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
    app.listen(3000, function(){
        console.log('Listening on 3000')
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

    app.post('/logar', (req, res) => {
        var data = {
            email: req.body.email,
            senha: req.body.senha
        };
        usersCollection.findOne(data, function(err, result){
            if(err) {
                res.json({
                    status:0,
                    message: err
                });
            } if (!result) {
                res.json({
                    status: 0,
                    msg: "Não encontrado"
                });
            }
            res.redirect('/index')
        })
    });

}).catch(console.error);
