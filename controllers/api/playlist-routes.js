const router = require('express').Router();
const { Playlist } = require('../../models');
const User = require('../../models/User');
const withAuth = require('../../utils/auth');


//new playlist
router.post('/', async (req, res) => {
    try {
        const newPlaylist = await Playlist.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        res.json(newPlaylist);
    } catch (err) {
        res.status(500).json(err);
    }
});


//get single playlist
router.get('/:id', async (req, res) => {
    try {
        const postData = await Playlist.findOne({
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
        res.json(postData);
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
router.delete('/:id', withAuth, async (req, res) => {
    try {
      const data = await Product.destroy({
        where: {
          id: req.params.id
        },
      });
      if (!data) {
        res.status(404).json({ message: 'No category found with that ID' })
      }
      res.status(200).json({data, message: `Successfully deleted product with id ${req.params.id}`})
    } catch (err) {
      res.status(500).json(err)
    }
  });



module.exports = router;