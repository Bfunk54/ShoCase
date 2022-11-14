const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/config');

class Anime extends Model { }

Anime.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        anime_title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        anime_image: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        watch_link: {
            type: DataTypes.STRING,
        },
        more_info: {
            type: DataTypes.TEXT,
        },
        api_id: {
            type: DataTypes.BIGINT,
            unique: true
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'anime',
    }
);

module.exports = Anime;