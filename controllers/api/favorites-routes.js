const router = require('express').Router();
const { Favorites } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
    try {
      
       const found = await Favorites.findOne({
            where: {
                user_id: req.session.user_id,
                playlist_id: req.body.playlist_id
            }
        })

        if (!found) {
            const newFavorite = await Favorites.create({
                user_id: req.session.user_id,
                playlist_id: req.body.playlist_id
            });
            return res.json(newFavorite);
        }
        res.json(found);

    } catch (err) {
        res.status(500).json(err);
    }
});

//delete favorite
router.delete('/:id', withAuth, async (req, res) => {
    try {
      const data = await Favorites.destroy({
        where: {
          user_id: req.session.user_id,
          playlist_id: req.params.id
        },
      });
      if (!data) {
        res.status(404).json({ message: 'No favorite found with that ID' })
      }
      res.status(200).json({ data, message: `Successfully deleted favorite with id ${req.params.id}` })
    } catch (err) {
      res.status(500).json(err)
    }
  });





module.exports = router;