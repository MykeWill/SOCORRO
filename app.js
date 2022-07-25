//importar modulos
let http = require('http')
let express = require('express')
let {engine} = require('express-handlebars')
let bodyParser = require('body-parser')
let fetch = require('node-fetch')// utilizar o fetch na rota 

let app = express()
//body-parser
app.use (bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//especificar arquivos estaticos
app.use(express.static(__dirname + '/publico'))

//template
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set("views", "./views");

//rotas base
app.get('/', function(req,res){
    fetch('http://localhost:3000/clientes', {method: 'GET'})
    .then(resposta =>resposta.json())
    .then(resposta => res.render('inicio', {dados:resposta}))
})

//rota de cadastro aqui o method vai ser post pq fou definido la no action de inicio.handlebars
app.post('/cadastrar', function(req, res){
    let nome = req.body.nome
    let idade = req.body.idade
    let dados = {'nome': nome, 'idade': idade};

    fetch('http://localhost:3000/clientes', {
        method:'POST',
        body: JSON.stringify(dados ),
        headers:{'contenty-Type': 'application/json'}
    
    
    })
     .then(res.redirect('/'))
   
})

//servidor
app.listen(8080)
