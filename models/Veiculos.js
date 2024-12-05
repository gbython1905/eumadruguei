const { DataTypes } = require('sequelize')
const db = require('../db/conn')
const Situacao = require('./Situacao')

const Veiculo = db.define('Veiculo',{
    modelo: {
        type: DataTypes.STRING,
        allowNull: false
    },

    marca: {
        type: DataTypes.STRING,
        allowNull: false
    },

    placa: {
        type: DataTypes.STRING,
        allowNull: false
    },

    situacaoID: {
        type: DataTypes.INTEGER,
        references: {
            model: Situacao,
            key: 'id',
        }
    }
})

Veiculo.belongsTo(Situacao,{foreignKey: 'situacaoID'})
module.exports = Veiculo