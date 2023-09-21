const { DataTypes } = require('sequelize');
const { sequelize } = require('../config');

class AdminModel {
    #admin_game = sequelize.define('admin_game', {
        id: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'admin_game',
        updatedAt: false,
        underscored: true
    })

    async getDataAdminGame(username) {
        const data = await this.#admin_game.findOne({ 
            where: { 
                username
            }, 
            attributes: ['id', 'username', 'password'],
            raw: true
        });

        return data;
    }
}

const adminModel = new AdminModel();
module.exports = { adminModel };