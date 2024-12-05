const { DataTypes } = require('sequelize')
const db = require('../db/conn')

const Situacao = db.define('Situacao',{
    situcao: {
        type: DataTypes.ENUM('Alugado', 'Disponível','Manutenção'),
        allowNull: false
    }
})

module.exports = Situacao