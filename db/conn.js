const { Sequelize } = require('sequelize')
const sequelize = new Sequelize('Concessionaria', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

try {
    sequelize.authenticate()
    console.log('Conectado com sucesso :) ')
    
} catch (error) {
    console.log(`Deu erro: ${error}`)
}

module.exports = sequelize