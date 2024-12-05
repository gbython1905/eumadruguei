const express = require('express')
const exhbs = require('express-handlebars')

const app = express()
const conn = require('./db/conn')
const Veiculo = require('./models/Veiculos')
const Situacao = require('./models/Situacao')


app.engine('handlebars', exhbs.engine)
app.set('view engine', 'handlebars')
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))
app.use(express.json())


app.post('/veiculosADD', async (req, res)=>{
    const {modelo, marca, placa, situacaoID} = req.body

    await Veiculo.create({
        modelo,
        marca,
        placa,
        situacaoID
    })
    res.redirect('/')
})

app.get('/', async (req, res)=>{
    try {
        const veiculos = await Veiculo.findAll({
            include: [{
                model: Situacao,
                required: false,
            }],
            raw: false,
            nest: true,
        })
        res.render('home', {veiculos})
        
    } catch (error) {
        console.error('Erro ao encontrar veiculos: ', error)
        res.status(500).send('Erro interno do Servidor')
    }
})

app.get('/veiculosforms', async (req,res)=>{
    const situacoes = await Situacao.findAll({raw:false})
    res.render('veiculosforms',{ situacoes })
})



conn.sync({force:false}).then(async()=>{
    await Situacao.destroy [{where:{}}]
    await Situacao.destroy [{where:{}}]

    await Situacao.bulkCreate([
        { Situacao: 'Disponivel' },
        {Situacao: 'Alugado'},
        {Situacao: 'Manutenção'},
    ])
    app.listen(3000, ()=>{
        console.log(`Servidor Rodando na Porta: http://localhost:3000`)
    })
})