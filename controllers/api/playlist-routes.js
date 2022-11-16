const router = require('express').Router();
const { Playlist, User, Anime, AnimePlaylist } = require('../../models');
const withAuth = require('../../utils/auth');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// post a new playlist
router.post('/', async (req, res) => {
  /*  req.body should look like this...
  {
    "animes": [
      {
        "anime_title": "Berserk (2016)",
        "anime_image": "https://cdn.myanimelist.net/images/anime/10/79352l.jpg",
        "watch_link": "https://myanimelist.net/anime/32379/Berserk",
        "more_info": "Berserk is about a dude with a big sword",
        "api_id": 32379
      },
      {
        "anime_title": "Boruto: Naruto the Movie",
        "anime_image": "https://myanimelist.net/anime/28755/Boruto__Naruto_the_Movie",
        "watch_link": "https://myanimelist.net/anime/20507/Noragami",
        "more_info": "Boruto is about Narutos son",
        "api_id": 28755
      },
      {
        "anime_title": "Noragami",
        "anime_image": "https://cdn.myanimelist.net/images/anime/1886/128266l.jpg",
        "watch_link": "https://myanimelist.net/anime/20507/Noragami",
        "more_info": "Noragami has a god who does things for money",
        "api_id": 20507
      },
      {
        "anime_title": "Cowboy Bebop",
        "anime_image": "https://cdn.myanimelist.net/images/anime/4/19644l.jpg",
        "watch_link": "https://myanimelist.net/anime/1/Cowboy_Bebop",
        "more_info": "Cowboy bebop is about space bounty hunters",
        "api_id": 1
      }
    ],
    "title": "Horror Anime",
    "user_id": 1
  }
  */
  try {
    // Compiles anime information to post new animes
    const animesArr = req.body.animes.map((anime) => {
      return {
        anime_title: anime.anime_title,
        anime_image: anime.anime_image,
        watch_link: anime.watch_link,
        more_info: anime.more_info,
        api_id: anime.api_id
      };
    });
    // Posts new animes while checking if they already exist
    const animeData = await Anime.bulkCreate(animesArr, {
      updateOnDuplicate: ["api_id"]
    });
    animeData

    // Create new playlist
    const playlistData = await Playlist.create({
      title: req.body.title,
      user_id: req.session.user_id
    })
    playlistData

    // create array of my anime list ids
    const animesArrById = req.body.animes.map((anime) => {
      return anime.api_id
    });
    // find all anime ids by my anime list ids
    const animeDataById = await Anime.findAll({
      where: {
        api_id: {
          [Op.or]: animesArrById
        }
      },
    });
    // organize data to send to animeplaylist table
    const animePlaylistIdArr = animeDataById.map((anime) => {
      return {
        playlist_id: playlistData.id,
        anime_id: anime.id
      };
    });
    // create association between playlist and animes through animeplaylist table
    const animePlaylistData = await AnimePlaylist.bulkCreate(animePlaylistIdArr);
    res.status(200).json(animePlaylistData)
  } catch (err) {
    res.status(500).json(err)
  }
});

//get single playlist
router.get('/:id', async (req, res) => {
  try {
    const playlistData = await Playlist.findOne({
      where: {
        id: req.params.id
      },
      attributes: [
        'id',
        'title',
        'date-created'
      ],
      include: [
        {
          model: User, attributes: ['username']
        },
        {
          model: Comment, attributes: ['id', 'content', 'date_created', 'user_id', 'playlist_id']
        }
      ]
    });
    res.json(playlistData);
  } catch (err) {
    res.status(500).json(err)
  }
});

//edit playlist
router.put('/edit/:id', withAuth, async (req, res) => {
  try {
    const updatePlaylistData = await Playlist.update({
      title: req.body.newTitle
    },
      {
        where: {
          id: req.params.id,
        }
      });
    if (!updatePlaylistData) {
      res.status(404).json({ message: 'No category found with that ID' })
    }
    res.status(200).json( {updatePlaylistData, message: `Successfully updated playlist with the id ${req.params.id }`} );
  } catch (err) {
    res.status(500).json(err)
  }
});

//delete playlist
router.delete('/:id', async (req, res) => {
  try {
    const data = await Playlist.destroy({
      where: {
        id: req.params.id
      },
    });
    if (!data) {
      res.status(404).json({ message: 'No category found with that ID' })
    }
    res.status(200).json({ data, message: `Successfully deleted playlist with id ${req.params.id}` })
  } catch (err) {
    res.status(500).json(err)
  }
});



module.exports = router;