const { Anime } = require('../models');

const animeData = [
    {
        anime_title: 'Naruto',
        anime_image: 'https://cdn.myanimelist.net/images/anime/13/17405l.jpg',
        watch_link: 'https://myanimelist.net/anime/20/Naruto',
        api_id: 20,
    },
    {
        anime_title: 'Gintama',
        anime_image: 'https://cdn.myanimelist.net/images/anime/10/73274l.jpg',
        watch_link: 'https://myanimelist.net/anime/918/Gintama',
        api_id: 918,
    },
    {
        anime_title: 'Noragami',
        anime_image: 'https://cdn.myanimelist.net/images/anime/10/73274l.jpg',
        watch_link: 'https://myanimelist.net/anime/20507/Noragami',
        api_id: 20507,
    },
    {
        anime_title: 'Cowboy Bebop',
        anime_image: 'https://cdn.myanimelist.net/images/anime/4/19644l.jpg',
        watch_link: 'https://myanimelist.net/anime/1/Cowboy_Bebop',
        api_id: 1,
    },
];

const seedAnimes = () => Anime.bulkCreate(animeData);

module.exports = seedAnimes;