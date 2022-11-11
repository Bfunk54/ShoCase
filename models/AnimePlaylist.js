const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/config');

class AnimePlaylist extends Model { }

AnimePlaylist.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        playlist_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'playlist',
                key: 'id'
            }
        },
        anime_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'anime',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'animeplaylist',
    }
);

module.exports = AnimePlaylist;