const User = require('./User');
const Playlist = require('./Playlist');
const Comment = require('./Comment');
const Anime = require('./Anime');
const Favorites = require('./Favorites');
const AnimePlaylist = require('./AnimePlaylist');

User.hasMany(Playlist, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Playlist.belongsTo(User, {
    foreignKey: 'user_id'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

Playlist.hasMany(Comment, {
    foreignKey: 'playlist_id',
    onDelete: 'CASCADE'
});

Comment.belongsTo(Playlist, {
    foreignKey: 'playlist_id'
});

Anime.belongsToMany(Playlist, {
    through: AnimePlaylist
});

Playlist.belongsToMany(Anime, {
    through: AnimePlaylist
});

// User.belongsToMany(Playlist, {
//     through: Favorites
// });

// Playlist.belongsToMany(User, {
//     through: Favorites
// });

Playlist.hasMany(Favorites, {
    foreignKey: 'playlist_id',
    onDelete: 'CASCADE'
});

User.hasMany(Favorites, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Favorites.belongsTo(User, {
    foreignKey: 'user_id'
});

Favorites.belongsTo(Playlist, {
    foreignKey: 'playlist_id'
});

module.exports = { User, Playlist, Comment, Anime, Favorites, AnimePlaylist };
