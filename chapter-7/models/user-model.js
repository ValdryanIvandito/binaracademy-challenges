const { DataTypes } = require('sequelize');
const { sequelize } = require('../config');

class UserModel {
    #user_game = sequelize.define('user_game', {
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
        },
        sex: {
            type: DataTypes.STRING,
            allowNull: false
        },
        hobby: {
            type: DataTypes.STRING,
            allowNull: false
        },
        scores: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        tableName: 'user_game',
        updatedAt: false,
        underscored: true
    })

    async insertDataUserGame(username, password, sex, hobby, scores) {
        const insertedData = await this.#user_game.create({ username, password, sex, hobby, scores });
        return insertedData;
    }

    async getDataUserGame(username) {
        const data = await this.#user_game.findOne({ 
            where: { 
                username
            }, 
            attributes: ['id', 'username', 'password', 'sex', 'hobby', 'scores'],
            raw: true
        });

        return data;
    }

    async getAllDataUserGame() {
        const data = await this.#user_game.findAll({ 
            attributes: ['id', 'username', 'sex', 'hobby', 'scores'],
            raw: true,
            order: [['id', 'ASC']]
        });

        return data;
    }

    async getRankUserGame() {
        const data = await this.#user_game.findAll({ 
            attributes: ['id', 'username', 'sex', 'hobby', 'scores'],
            raw: true,
            order: [['scores', 'DESC']]
        });

        return data;
    }

    async deleteDataUserGame(username) {
        await this.#user_game.destroy({
            where: {
                username
            }
        });
    }

    async updatePasswordUserGame(username, newPassword) {
        const user = await this.#user_game.findOne({
            where: {
                username
            }
        });

        if (user) {
            user.password = newPassword;
            await user.save();
            return user;
        } else {
            throw new Error('User not found.');
        }
    }

    async updateScoresUserGame(username, newScores) {
        const user = await this.#user_game.findOne({
            where: {
                username
            }
        });

        if (user) {
            user.scores = newScores;
            await user.save();
            return user;
        } else {
            throw new Error('User not found.');
        }
    }
}

const userModel = new UserModel();
module.exports = { userModel };