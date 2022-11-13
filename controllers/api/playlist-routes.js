const router = require('express').Router();
const { Playlist, User, Anime, AnimePlaylist } = require('../../models');
const withAuth = require('../../utils/auth');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


//new playlist
// router.post('/', async (req, res) => {
//     try {
//         const newPlaylist = await Playlist.create({
//             ...req.body,
//             user_id: req.session.user_id,
//         });
//         res.json(newPlaylist);
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

router.post('/', (req, res) => {
  /* req.body should look like this...
    {
      "title": "Horror Anime",
      "user_id": 1,
      "anime_ids": [1, 2, 3, 4]
    }
  */
  Playlist.create(req.body)
    .then((playlist) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.anime_ids.length) {
        const animePlaylistIdArr = req.body.anime_ids.map((anime_id) => {
          return {
            playlist_id: playlist.id,
            anime_id,
          };
        });
        return AnimePlaylist.bulkCreate(animePlaylistIdArr);
      }
      // if no product tags, just respond
      res.status(200).json(product);
    })
    .then((animePlaylistIds) => res.status(200).json(animePlaylistIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
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
router.put('/edit/:id', withAuth, (req, res) => {
  Playlist.update(req.body, {
    where: {
      id: req.params.id,
    },
  });

})

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
    res.status(200).json({ data, message: `Successfully deleted product with id ${req.params.id}` })
  } catch (err) {
    res.status(500).json(err)
  }
});



module.exports = router;