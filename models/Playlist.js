const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/config');

class Playlist extends Model { }

Playlist.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        date_created: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        anime_1: {
            type: DataTypes.INTEGER,
            references: {
                model: 'anime',
                key: 'id'
            }
        },
        anime_2: {
            type: DataTypes.INTEGER,
            references: {
                model: 'anime',
                key: 'id'
            }
        },
        anime_3: {
            type: DataTypes.INTEGER,
            references: {
                model: 'anime',
                key: 'id'
            }
        },
        anime_4: {
            type: DataTypes.INTEGER,
            references: {
                model: 'anime',
                key: 'id'
            }
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            },
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'playlist',
    }
);

module.exports = Playlist;